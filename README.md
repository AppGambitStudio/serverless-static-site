![alt text](./assets/diagram.png)

# Host Static Site with AWS and Serverless Framework
This application creates various AWS resources to host a Single Page Application. The application also has a Contact Form to save the contact data into database and also send out email to the author of the application.

AWS Services used in this application.

* S3 - For Hosting
* CloudFront - For CDN
* Route53 - For DNS
* Certificate Manager - For HTTPS certificate
* API Gateway - For API
* Lambda - For Saving Contact Form Data
* DynamoDB - For Database
* SNS - For Sending Email to Author when someone submits contact message

### Route53 Domain Name Configuration
For this demo I am using my Namecheap domain name routed to Amazon Route53 so that I can use the HTTPS certification without extra fuss. You can follow this link to configure the Namecheap to Route53 redirection and ACM for the SSL certifice. 

https://benjamincongdon.me/blog/2017/06/13/How-to-Deploy-a-Secure-Static-Site-to-AWS-with-S3-and-CloudFront/

### Deployment
Before you deploy, create the `config.dev.json` from the `sample.config.json` file and set the values. 

```
{
    "BUCKET_NAME": "S3 bucket name. For example, mysite.com",
    "TABLE_NAME": "DynamoDB table name",
    "CONTACT_RECEIVED_TOPIC": "contact-received-email",
    "ACM_CERT_ARN": "arn:aws:acm:us-east-1:<AWS ACCOUNT>:certificate/<CERTIFICATION ID>",
    "HOSTED_ZONE_ID": "Route53 Hosted Zone ID" 
}
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