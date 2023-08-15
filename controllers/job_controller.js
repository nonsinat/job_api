const { StatusCodes } = require("http-status-codes");
const {userModel} = require('../model/auth_model')
const jobModel = require('../model/job_model')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find({ createdBy: req.user.userId }).sort('createdAt')
        if(jobs.length === 0){
            res.status(StatusCodes.OK).json({message:"Job is Empty"})
        }else{
            res.status(StatusCodes.OK).json({ jobs, count: jobs.length})
        }
    } catch (error) {
        console.log(error);
    }
}

const getOneJobs = async (req,res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    } = req
    const job = await jobModel.findOne({_id:jobId,createdBy:userId})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }else{
        res.status(StatusCodes.OK).json({job})
    }
}

const createJob = async (req,res)=>{
    try {
        req.body.createdBy = req.user.userId
        const jobCreate = await jobModel.create(req.body)
        res.status(StatusCodes.CREATED).json({jobCreate})

        // req.body.createdBy = req.user.userId
        // const job = await Job.create(req.body)
        // res.status(StatusCodes.CREATED).json({ job })
    } catch (error) {
        console.log(error);
    }
}

const updateJob = async (req,res)=>{j
    const {
        body:{company,position},
        user: {userId},
        params: {id,jobId},
    } = req

    if(company === '' || position === ''){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }

    const job = await jobModel.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})

    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})

}

const deleteJob = async(req,res)=>{
    const {
        user: {userId},
        params: {id: jobId}
    } = req
    
}

module.exports = {getAllJobs,getOneJobs,createJob,updateJob,deleteJob}
