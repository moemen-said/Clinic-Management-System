import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';

import User from '../models/user';

dotenv.config({ path: __dirname + '/../../' + '.env' });
sgMail.setApiKey(process.env.SEND_GRID_KEY || '');

export default class AuthController {
	constructor() {}

	public login: RequestHandler = (req, res, next) => {
		const { email, password } = req.body;
		User.findOne({ email: email })
			.then((user) => {
				if (!user) {
					res.status(401).json({
						success: false,
						message: 'invalid email or password',
					});
				} else {
					bcrypt.compare(password, user.password).then((isEqual) => {
						if (!isEqual) {
							// password is incorrect
							return res.status(401).json({
								success: false,
								message: 'invalid email or password',
							});
						} else {
							// successful login
							const token = jwt.sign(
								{
									id: user._id,
									email: user.email,
									role: user.role,
								},
								process.env.JWT_SECRET_KEY || '',
								{ expiresIn: '1h' }
							);
							res.status(200).json({
								success: true,
								message: 'successful login',
								token: token,
							});
						}
					});
				}
			})
			.catch((err) => {
				err.status = 500;
				next(err);
			});
	}; // end login

	public signup: RequestHandler = (req, res, next) => {
		const { email, role, phone } = req.body;
		User.findOne({ email: email })
			.then((user) => {
				if (user) {
					// email already exist in database
					return res.status(401).json({
						success: false,
						message: 'this email exist on our data',
					});
				} else {
					// hashing random password and save data in USER collection
					const randomPassword = this.generateRandomPassword();
					bcrypt.hash(randomPassword, 10).then((hashedPassword) => {
						return new User({
							email: email,
							password: hashedPassword,
							role: role,
							phone: phone,
						})
							.save()
							.then((user) => {
								// send creating password to user
								crypto.randomBytes(32, (err, buffer) => {
									const resetToken = buffer.toString('hex');
									let date = new Date();
									date.setDate(date.getDate() + 1); // add 24 hours to current time
									user.resetToken = resetToken;
									user.resetTokenExpiration = date;
									user.save().then((doc) => {
										sgMail
											.send({
												to: email,
												from: 'moemen.said@gmail.com',
												subject: 'Account created succesfuly in CMS',
                                                // link URL to be editted
												html: `<p>You can change your password from link bellow</p>
                                            <p>Click this <a href="https://websiteLink/Account/newPassword/${resetToken}?id=${doc._id}">link</a> to set a new password`,
											})
											.then((data) => {
												if (data[0].statusCode === 202) {
													return res.status(200).json({
														success: true,
														message: 'User have been created successfuly',
													});
												} else {
													return res.status(500).json({
														success: false,
														message: 'please try again later',
													});
												}
											});
									});
								});
							});
					});
				}
			})
			.catch((err) => {
				err.status = 500;
				next(err);
			});
	};

    public resetPassword:RequestHandler = (req, res, next) => {
        const email = req.body.email;
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "this email doesn't exist in our database",
                });
            } else {
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: 'an error has occured in our server, please try again',
                        });
                    }
                    const resetToken = buffer.toString('hex');
                    user.resetToken = resetToken;
                    user.resetTokenExpiration = new Date(Date.now() + 3600000);
                    user.save().then((doc) => {
                        sgMail
                            .send({
                                to: email,
                                from: 'moemen.said@gmail.com',
                                subject: 'Reset password',
                                // link url to be edited
                                html: `<p>You requested a new password</p>
                                <p>Click this <a href="https://websiteLink/Account/newPassword/${resetToken}?id=${doc._id}">link</a> to set a new password`,
                            })
                            .then((data) => {
                                if (data[0].statusCode === 202) {
                                    return res.status(200).json({
                                        success: true,
                                        message: 'An email has been sent to you',
                                    });
                                } else {
                                    return res.status(500).json({
                                        success: false,
                                        message: 'please try again later',
                                    });
                                }
                            })
                            .catch((error) => {
                                next(error);
                            });
                    });
                });
            }
        });
    };
    
    public setNewPassword:RequestHandler = (req, res, next) => {
        const { newPassword, userId, resetToken } = req.body;
        User.findOne({
            resetToken: resetToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId,
        })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'password cannot be reset, please request a new password again',
                    });
                }
                bcrypt.hash(newPassword, 10).then((hashedPassword) => {
                    user.password = hashedPassword;
                    user.resetToken = undefined;
                    user.resetTokenExpiration = undefined;
                    user.save()
                        .then(() => {
                            return sgMail.send({
                                to: user.email,
                                from: 'moemen.said@gmail.com',
                                subject: 'New Password Set',
                                html: `<p>You have created a new password successfully</p>`,
                            });
                        })
                        .then((data) => {
                            if (data[0].statusCode === 202) {
                                return res.status(200).json({
                                    success: true,
                                    message: 'An email has been sent to you',
                                });
                            } else {
                                return res.status(500).json({
                                    success: false,
                                    message: 'please try again later',
                                });
                            }
                        });
                });
            })
            .catch((err) => {
                err.status = 500;
				err.message = 'password cannot be reset, please request a new password again'
                next(err);
            });
    };

	private generateRandomPassword(): string {
		return Math.random().toString(36).slice(-8);
	}
}
