const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv');
dotenv.config();
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()

const authRouter = require('./routes/auth/authRouter');
const userRoute = require('./routes/userRoute');

app.use(express.json());

// Route
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute); 

//start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`);
    connectDB();
})