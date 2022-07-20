import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../' + '.env' });
import User from '../models/user';

const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
	let decodedToken = null;
	try {
		let token = req.get('Authorization')?.split(' ')[1];
		if (!token) throw new Error('Unauthorized Operation!');
		decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as any;
		req.role = decodedToken['role'];
		req.id = decodedToken.id;
		const user = await User.findById(req.id);
		req.user = user;
		return next();
	} catch (error: any) {
		res.status(403).json({
			success: false,
			message: 'unauthorized User',
		});
		error.status = 403;
		return next(error);
	}
};

export default isAuthenticated;
