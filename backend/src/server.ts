import mongoose from "mongoose";
import dotenv from 'dotenv';

import app from "./app";
dotenv.config({ path: __dirname + '/../' + '.env' });


export default mongoose
.connect(process.env.MONGO_CONNECTION || '')
.then(() => {
    console.log('Connected to database successfuly');
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`API server is listining on port ${port}`);
    });
})
.catch((err) => {
    console.log(`an error has occured, ${err}`);
});