const User = require('../model/auth_model')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const {StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {

  // check header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // throw new UnauthenticatedError('Authentication invalid')
    res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({message:"Authentication invalid"})
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY) 
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name}
    console.log(`Userinfo: ${payload.userId}, ${payload.name}`);
    next()
  } catch (error) {
    // throw new UnauthenticatedError('Authentication invalid')
    res.status(StatusCodes.EXPECTATION_FAILED).json({message:`Exception Failed ${error}`})
  }
}

module.exports = auth
