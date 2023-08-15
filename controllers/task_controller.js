const asyncWrapper = require('../middleware/async')
const Task  = require('../model/task_model')
const {createCustomError} = require('../middleware/custome_error')


const getAllTasks = asyncWrapper ( async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200)
    .json({
        version: "Version 01",
        success: true,
        data: {tasks, nbHits: tasks.length},
    })
})
const getOneTasks =asyncWrapper(async(req,res)=>{
    const {id: taskID} = req.params
    const task = await Task.findById({_id:taskID});
    if(!task){
        // const error = new Error('Not Found')
        // error.status = 404
        // return next(error)
        return next(createCustomError(`No task with id: ${taskID}`,404))
        
        // return res.status(404).json({message: `No Task with id: ${taskID}`})
    }
    res.status(200).json({ task })
})

const createTask = asyncWrapper (async(req,res) =>{
    const task = await Task.create(req.body);
    res.status(201).json({
        message: "Successfully",
        data: task
    })
})

const updateTask =asyncWrapper (async(req,res)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new: true,
        runValidators: true
    })
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`,404))

        // return res.status(404).json({msg: `No task with id : ${taskID}`})
    }
    res.status(200).json({ id: taskID,data:req.body})
})

// const editTask = async(req,res)=>{
//     try {
//         const {id:taskID} = req.params
//         const task  = await Task.findByIdAndUpdate({_id:taskID})
//         if(!task){
//             return res.status()
//         }
//     } catch (error) {        
//     }
// }

const deleteTask = asyncWrapper (async(req,res)=>{
    const {id:taskID} = req.params
    const task = await Task.findByIdAndDelete({_id:taskID})
    if(!task){
        return res.status(404).json({message : `No Found task with id : ${taskID}`})
    }
    res.status(200).json({
        task:task.name,
        message: `Deleted Successfully ${taskID}`})

})





module.exports  = {getAllTasks,getOneTasks,createTask,updateTask,deleteTask}
