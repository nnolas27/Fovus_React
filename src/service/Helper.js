import AWS from 'aws-sdk';
import axios from "axios";

export const s3Config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION
}

export const dynamoConfig = {
    table: process.env.REACT_APP_TABLE_NAME
}

export const awsConfig = {
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET
}

export const httpConfig = {
    API_BASE_URL : process.env.REACT_APP_BASE_URL,
    DYNAMO_UPDATE : 'update'
}

export const uploadFile = (params) => {
    const s3Client = new AWS.S3({...awsConfig, ...s3Config});
    return s3Client.upload(params).promise();
}

export const updateFile = async (
    payload,
) => {
    let response = null;
    try {
        var cognitoSession = JSON.parse(window.sessionStorage.getItem('cognitoSession'));
        console.log(cognitoSession)
        console.log(`${httpConfig.API_BASE_URL}/${httpConfig.DYNAMO_UPDATE}`);
        response = await axios.post(`${httpConfig.API_BASE_URL}/${httpConfig.DYNAMO_UPDATE}`, payload,
            {
                headers: {
                    Authorization: `Bearer ${cognitoSession.idToken.jwtToken}`,
                }
            });
    } catch (e) {
        console.error('Dynamo Update Failed: ', JSON.stringify(e));
    } finally {
        return response;
    }
};