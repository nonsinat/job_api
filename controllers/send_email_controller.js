const nodemailer = require('nodemailer')
const mailGen = require('mailgen')
const { StatusCodes } = require('http-status-codes')
 
const getbill =  async (req,res) =>{
    const {userEmail} = req.body

    let config = {
        service: 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)
    
    let MailGenerator = new mailGen({
        theme:"default",
        product:{
            name:"MailGen",
            link:"https://mailgen.js"
        }
    })

    let response = {
        body:{
            name:"Sinat hasha",
            intro:"Your bill has arrived",
            table:{
                data: [
                    {
                        item: "NodeMailer Stack Book",
                        description:"A Backend application",
                        price: "$9.99"
                    }
                ]
            },
            outro: "Looking forward to do more business"

        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Place order",
        html:mail
    }

    transporter.sendMail(message).then(()=>{
        return res.status(StatusCodes.OK).json({message: "You should recieved email..."})
    }).catch((error)=>{
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error)
    })


}

module.exports = {getbill}