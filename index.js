const { Router } = require("express");
const express= require("express");
const connectDB =require('./db/connect');
const app = express();
const jobRouter = require('./routes/job_route');
const authRouter = require('./routes/auth_route')
const url = require('dotenv').config();
const notFound = require('./middleware/not_found');
const errorHandlerMiddleware  = require('./middleware/error_handle');
const authenticateUser = require('./middleware/authentication_middleware')
const fileUpload = require('express-fileupload');
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const cloudinary = require('cloudinary').v2;

// Security packages
app.use(rateLimit(
    {
        windowMs: 15 * 60 * 10000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    }
))
app.use(helmet())
app.use(cors()) 
app.use(xss())

// middleware
app.use(express.json()); // use express as middleware for convert format to Json
app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_CLOUND_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
});

// routes auth 
app.use('/api/v1/auth', authRouter);

// routes job 
app.use('/api/v1/jobs',authenticateUser,jobRouter); // must be have / in started text

app.use(notFound)
app.use(errorHandlerMiddleware)
 
const port = process.port || 0809

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`Server is listening on port ${port}...`))
      
    } catch (error) {
        console.log(error);
    } 
}

start()



