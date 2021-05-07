'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const sns = new AWS.SNS();

module.exports.handler = function (event, context, callback) {
    console.log(event.body); // Contains incoming request data (e.g., query params, headers and more)
    const body = JSON.parse(event.body);


    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({}),
    };

    var params = {
        Item: {
            "email": {
                S: body.email
            }, 
            "name": {
                S: body.name
            }, 
            "message": {
                S: body.message
            }
        },
        TableName: process.env.TABLE_NAME
    };

    dynamodb.putItem(params, function(err, data) {
        if (err){
            response.body = JSON.stringify(err);
            callback(null, response);
        }else{
            
            if(process.env.TOPIC_NAME){
                var params = {
                    Message: body.message, 
                    Subject: `New Contact Message From ${body.name} / ${body.email}`,
                    TopicArn: process.env.TOPIC_NAME
                };
                sns.publish(params, context.done);
            }

            callback(null, response);
        }
    });
};