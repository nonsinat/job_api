const {StatusCodes} = require('http-status-codes')
const Usermodel = require('../model/auth_model')
const {BadRequestError,UnauthenticatedError } = require('../errors/index')

const register = async(req,res)=>{
    try {
         const {name,email,password} = req.body;
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password,salt)
        // const tempUser = (name,email,password = hashedPassword)
        // const user = await Usermodel.create({ ...req.body })
        // const token =  user.createJWT() 

        // const token = jsonToken.sign({userId:user._id,name: user.name},process.env.JWT_KEY,{expiresIn:'30d'})
        // console.log(token);

        // if(!name || !email || !password) {
        //     throw new BadRequestError("Please provide name, email and password ")
        // }
        const existUser = await Usermodel.findOne({name:name})
        if(existUser){
            res.status(StatusCodes.BAD_REQUEST).json({message:"User already exist"})
        }else{
            let user = await Usermodel(req.body)
            const token =  user.createJWT() 
            user.token = token
            user = await user.save()
            res.status(StatusCodes.CREATED).json({token,userinfo:{name:user.name,email:user.email}})
        }

        // res.status(StatusCodes.CREATED).json({user:{name: user.name},token:token})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await Usermodel.findOne({ email: email })
        if(!user){
            throw new BadRequestError('Please provide email and password')
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')  
        }
        res.status(StatusCodes.OK).json({token:user.token,userinfo:{ name: user.name, email: user.email }})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json("Please try again")
        console.log(error);
    }
}

module.exports = {register,login,}