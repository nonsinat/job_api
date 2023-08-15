const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const UserSchema  = new mongoose.Schema({
    token:{
        type:String,
    },
    name:{
        type: String,
        required:[true,'Please provide yourname'],
        maxlenght:30,
        minlenght:3
    },
    email:{
        type: String,
        required:[true,'Please provide Email'],
        match:[/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,"Please provide valid email"],
        unique:true
    },
    password:{
        type: String,
        required:[true,'Please provide password'],
        maxlenght:30,
        minlenght:3
    },
    decryptPassword:{
        type: String,
        required:[false],
    }
})


// UserSchema.pre('decrypt', async function(next) {
//     this.decryptPassword = this.password
//     console.log(this.decryptPassword);
//     next();
// })

UserSchema.pre('save',async function(){
    this.decryptPassword = this.password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id,name:this.name},process.env.JWT_KEY,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword =  async function(canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword,this.password)
    return isMatch
}

UserSchema.methods.getName = function(){
    return this.name
}

module.exports = mongoose.model('UserJob',UserSchema)

