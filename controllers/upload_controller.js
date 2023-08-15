const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const ProductModel = require('../model/product_model')


const uploadProductImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: "file-upload", // Set the folder based on the code
            }
        );
        fs.unlinkSync(req.files.image.tempFilePath);
        if(!result){
            res.status(StatusCodes.BAD_REQUEST).json({message:"No way to upload"})
        }else{
            const uploadImage = await ProductModel({
                name:req.body.name,
                price:req.body.price,
                image:result.secure_url
            });
            await uploadImage.save();
            res.status(StatusCodes.CREATED).json({uploadImage});
               
        }
        
    
        // { image: { src: result.secure_url } }
           
      
        
    } catch (error) {
        console.log(error);
    }

  };
  
  module.exports = {
    uploadProductImage,
  };