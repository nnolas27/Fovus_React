import AWS from 'aws-sdk';

export const S3Util = {
    config: {
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    },
    uploadFile : (params) => {
        const s3Client = new AWS.S3(S3Util.config);
        return s3Client.upload(params).promise();
    }
};