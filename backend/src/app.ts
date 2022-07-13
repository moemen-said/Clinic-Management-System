import express, { Request, Response } from 'express';


const app = express();

app.use(express.json());


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