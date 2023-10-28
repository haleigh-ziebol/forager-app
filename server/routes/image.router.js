const express = require('express');
const pool = require('../modules/pool');
const { update } = require('lodash');
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
      const {imageData} = req.files.image.data;

      const uploadedFile = await s3Client.upload({
        Bucket: 'forager-app' ,
        Key: `user-observations/${imageName}`,
        Body: imageData,
      })
      //url for file access
      console.log("file location:", uploadedFile.location);
      res.sendStatus(uploadedFile.loaction);
    }
    catch (error) {
      console.log(`Error adding new observation`, error);
      res.sendStatus(500);
    }
  }
    else {
      res.sendStatus(401);
    }
});//end POST


// PUT to update observation by ID
router.put('/edit/:id', (req, res) => {
  let id = req.params.id;
  let updatedObservation = req.body;
  console.log('updating observation for id', id);
  if (req.isAuthenticated()) {
    let queryText = `UPDATE "observations" 
                  SET "species_id" = $1, "location" = $2, "photo" = $3,
                  "notes" = $4, "date_observed" = $5, "time_stamp" = $6
                  WHERE "id" = $7;`;
    pool.query(queryText, [updatedObservation.species_id, updatedObservation.location, updatedObservation.photo, 
                          updatedObservation.notes, updatedObservation.date_observed, updatedObservation.time_stamp, id])
    .then((result) =>{
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500)
    })
  } else {
    res.sendStatus(401);
  }
})// end PUT


// DELETE feedback by ID for user
router.delete('/userDelete/:id', (req, res) => {
  let id = req.params.id; // add a check to make sure user generated observation
  console.log('deleting observation id:', id);
    if (req.isAuthenticated()) {
    let queryText = 'DELETE FROM "observations" WHERE "id" = $1;';
    pool.query(queryText,[id] )
    .then((result) =>{
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(401);
  }
}); //end DELETE

module.exports = router;
