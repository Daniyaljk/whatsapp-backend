import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const {DATABASE_URL} = process.env;
const PORT = process.env.PORT ||  8000;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}...`)
})
