const express = require('express')

const router = express.Router();
const {createJob,getOneJobs,getAllJobs,updateJob,deleteJob} = require('../controllers/job_controller')
const {uploadProductImage} = require('../controllers/upload_controller')
const {getbill} = require("../controllers/send_email_controller")

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getOneJobs).patch(updateJob).delete(deleteJob)
router.route('/upload').post(uploadProductImage)
router.route('/product/getbill').post(getbill) 

module.exports = router;
