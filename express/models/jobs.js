const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema(
    {
        packageName:String,
        version:String,
        publishedVersion:String,
        distro:String,
        status:String,
        jobDetails:{
            jobId:{
                id:String,
                queueID:Number,
            },
            duration:Number,
            jobUrl:String,
        },
        failureDetails: {
            stage: {
              stageName:String,
              stageDetails:String,
            },
            reason: {
              failureReason: String,
              additionalInfo: String,
            }
          }
    }
)

module.exports = mongoose.models.Jobs || mongoose.model('Jobs', jobsSchema);