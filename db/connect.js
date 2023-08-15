const mongoose= require("mongoose")

const connectDB = (url)=>{
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>console.log("DB Connecting..."))
}

module.exports = connectDB; 

// mongoose.connect(connectionString, 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(()=>console.log('CONNECTED to THE DB....')).catch((err)=>console.log(err))