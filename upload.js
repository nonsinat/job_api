require('dotenv').config()
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUND_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_API_SECRET
})

const image = 'tutorials/courses/job_api/starter/images/2023-01-23 23.49.29.jpg';

cloudinary.uploader.upload(image).then(result=>{
    console.log(result);
})