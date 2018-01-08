const knox = require('knox');
const fs = require('fs');
let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets.json');
}
const client = knox.createClient({
    key: process.env.KEY1 || secrets.AWS_KEY,
    secret: process.env.SECRET || secrets.AWS_SECRET,
    bucket: 'johnnybar'
});


exports.upload = function(file){
    return new Promise(function(resolve, reject){
        const s3Request = client.put(file.filename, {
            'Content-Type': file.mimetype,
            'Content-Length': file.size,
            'x-amz-acl': 'public-read'
        });

        const readStream = fs.createReadStream(file.path);
        readStream.pipe(s3Request);
        s3Request.on('response', s3Response => {
            const wasSuccessful = s3Response.statusCode == 200;
            if(wasSuccessful){
                // console.log('what a success');
                resolve();
            }
            else{
                reject();
            }
        });
    });
};
