import AWS from 'aws-sdk';

const DynamoUtil = {
    config: {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    },
    createItem: async(params) => {
        let dynamoClient = new AWS.DynamoDB(DynamoUtil.config);
        dynamoClient.putItem(params, function(err, data) {
            if(err)
                console.error("Failed to update dynamo db ", err);
            else
                console.log("Updated dynamo db successfully! ", data);
        });
    }
}

export default DynamoUtil;