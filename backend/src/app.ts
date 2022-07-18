import express, { Request, Response } from 'express';

import router from './routes/doctorRoute'
const app = express();

app.use(express.json());
app.use(router);
// notfound middleware
app.use((req, res, next) => {
	res.status(404).json({ success: false, message: 'your request url is NOT FOUND' });
});

// error middleware
app.use((err: Error, req: Request, res: Response) => {
	let status = err.status || 500;
	res.status(status).json({ success: false, message: err.message });
});

export default app;