# Host static site using Serverless Framework and AWS
This application creates various AWS resources to host a Single Page Application. The application also has a Contact Form to save the contact data into database and also send out email to the author of the application.

AWS Services used
* S3 - For Hosting
* CloudFront - For CDN
* API Gateway - For API
* Lambda - For Saving Contact Form Data
* DynamoDB - For Database
* SNS - For Sending Email to Author when someone submits contact message

### Deployment
Before you deploy, go to the `serverless.yml` file and check the configuration values. 

```
custom: # Sevice parameters
  bucket-name: dhaval.appgambit.com # If you want to register with Route53
  hosted-zone-id: 'Z1EQXQS56ZMQRA' # If you want to register with Route53
  table-name: contacts  
  contact-received-topic: 'contact-received-email'
```

Run the `sls deploy` command to deploy the changes to AWS.

### Site Content Publish

To push the Site specific changes (Html, CSS, JS etc)

```
aws s3 sync app/ s3://<bucket name>
```

### Clean up

Clear the Site bucket content first.

```
aws s3 rm s3://<bucket name> --recursive
```

Remove the application stack

```
sls remove --profile <your profile> --aws-region <region>
```