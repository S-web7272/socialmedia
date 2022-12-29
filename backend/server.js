import express from 'express'
import dotenv from  'dotenv'
import mongoose from 'mongoose';
import UserRouter from './routes/userRoute.js';


const app = express();

//conver data into objects
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// router
app.use('/api/users', UserRouter)


// connect with db
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOD_URL).then(() => {
    try {
        console.log("Connected to db!");
    } catch (error) {
        console.log(error.message)
    }
   
})
// create port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);

})