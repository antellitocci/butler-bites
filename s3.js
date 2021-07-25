const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// uploads file to s3
function uploadImage(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
};


// downloads file from s3 || NOT CURRENTLY USED GIVEN WE ARE USING A URL METHOD TO SHOW THE IMAGES TO THE CLIENT
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream();
};


module.exports = { uploadImage, getFileStream };