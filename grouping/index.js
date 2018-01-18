import S3 from 'aws-sdk/clients/s3'

const s3 = new S3()

export const group = (event, context, callback) => {
  const record = event.Records[0]
  const bucketName = record.s3.bucket.name
  const objectKey = record.s3.object.key
  if (objectKey.endsWith('.mp3')) {
    s3.copyObject({
      Bucket: bucketName,
      CopySource: `/${bucketName}/${objectKey}`,
      Key: objectKey.replace('upload/', 'audio/')
    }, (error, data) => {
      console.log(error, data)
    })
  }
  if (objectKey.endsWith('.jpeg')) {
    s3.copyObject({
      Bucket: bucketName,
      CopySource: `/${bucketName}/${objectKey}`,
      Key: objectKey.replace('upload/', 'image/')
    }, (error, data) => {
      console.log(error, data)
    })
  }
  callback(null, { statusCode: 200, body: event.body, headers: event.headers })
}

/*
{
  "Records": [
    {
      "eventVersion": "2.0",
      "eventSource": "aws:s3",
      "awsRegion": "us-east-1",
      "eventTime": "2018-01-17T06:20:54.315Z",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "A1CQ8CLYHH9IVW"
      },
      "requestParameters": {
        "sourceIPAddress": "103.215.2.181"
      },
      "responseElements": {
        "x-amz-request-id": "3B54DF2A7DDC762F",
        "x-amz-id-2": "jciTfO7KxFikmPS+6ITl2uktFBJNtKmzrkRalhfrlZhsLrEcj5YOzqrfyp+BZgL1We+Jtk6GCZs="
      },
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "ef2f67d5-26bb-4a6e-ab6d-ac62762d7f10",
        "bucket": {
          "name": "s3-files-grouping-demo-bucket",
          "ownerIdentity": {
            "principalId": "A1CQ8CLYHH9IVW"
          },
          "arn": "arn:aws:s3:::s3-files-grouping-demo-bucket"
        },
        "object": {
          "key": "upload/4933.mp3",
          "size": 7971,
          "eTag": "4a6db3b3900e374a905b1887a71dac09",
          "sequencer": "005A5EEB4643EE1541"
        }
      }
    }
  ]
}
*/
