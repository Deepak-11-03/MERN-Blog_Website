const aws = require('aws-sdk')
const dotenv =require('dotenv')
dotenv.config({path:"../config.env"})

// console.log(path)

aws.config.update({
    accessKeyId: process.env.AWS_accessKeyId,
    secretAccessKey: process.env.AWS_secretKey,
    region: process.env.AWS_region
})



module.exports.uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3();          // we will be using the s3 service of aws
        var uploadParams = {
            Bucket: process.env.Bucket,  //HERE
            Key: process.env.Key + file.originalname, //HERE 
            Body: file.buffer
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        })
    })
}
