const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const aws = require('aws-sdk');

const s3Client = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

//POST new observation as user
router.post('/', async  (req, res) => {
  if(req.isAuthenticated()) {
    try {
      const {imageName} = req.query;
      const imageData = req.files.image.data;
      console.log("name:", imageName);
      console.log("data:", imageData)
      const uploadedFile = await s3Client.upload({
        Bucket: 'forager-app/user-observations',
        Key: `${req.user.id}_${imageName}`, //look up time stamp in unix code
        Body: imageData,
      }).promise() //from old node module
      //url for file access
      res.send(uploadedFile.Location);
    }
    catch (err) {
      if (err.status >= 100 && err.status < 600){
      res.status(err.status);
      }
      else{
      res.status(500);
      }
    }
  }
    else {
      res.sendStatus(401);
    }
});//end POST


// //DELETE uploaded photo
// router.delete('/delete', async  (req, res) => {
//   if(req.isAuthenticated()) {
//     try {
//       const {imageLocation} = req.query;
//       console.log("name:", imageLocation);
//       await s3Client.deleteObject({
//         Bucket: 'forager-app/user-observations',
//         Key: imageLocation,
//       }).promise() //from old node module
//       //url for file access
//       res.sendStatus();
//     }
//     catch (err) {
//       if (err.status >= 100 && err.status < 600){
//       res.status(err.status);
//       }
//       else{
//       res.status(500);
//       }
//     }
//   }
//     else {
//       res.sendStatus(401);
//     }
// });//end DELETE

module.exports = router;
