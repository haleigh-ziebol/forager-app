const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all observations for admin
router.get('/', (req, res) => {
  let queryText = 'SELECT * from "observations";';
  console.log('Fetching all observations')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching feedback`, error);
    res.sendStatus(500);
  });
}); //end GET


//GET observations submitted by user
router.get('/user/:userID', (req, res) => {
  const userID = req.params.userEmail;
  console.log('Fetching all users observations')
  let queryText = `SELECT * FROM "observations" WHERE "user_id" =$1;`;
  pool.query(queryText, [userID])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching users observations`, error);
    res.sendStatus(500);
  });
}); //end GET


//POST new observation as user
router.post('/',  (req, res) => {
  let newObservation = req.body;
  console.log(`Adding observation`, newObservation);
  let queryText = `INSERT INTO "observation" ("user_id", "species_id", "location", "photo", "date_added")
    VALUES ($1, $2, $3, $4, $5);`;
  pool.query(queryText, [newObservation.userID, newObservation.speciesID, newObservation.location, newObservation.photo, date])
  .then(result => {
    res.sendStatus(201);
  })
  .catch(error => {
    console.log(`Error adding new observation`, error);
    res.sendStatus(500);
  });
});//end POST


// PUT to update observation by ID
router.put('/update/:id', (req, res) => {
  let id = req.params.id;
  let queryText = `UPDATE "observations" SET ///// "id" = $1;`;
  console.log('updating observations for id', id);
  pool.query(queryText, [id])
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500)
  })
})// end PUT


// DELETE feedback by ID for admin
router.delete('/adminDelete/:id', (req, res) => {
  let id = req.params.id;
  let queryText = 'DELETE FROM "observations" WHERE "id" = $1;';
  console.log('deleting observation id:', id)
  pool.query(queryText,[id] )
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
  })
}); //end DELETE


// DELETE feedback by ID for user
router.delete('/userDelete/:id', (req, res) => {
  let id = req.params.id; // add a check to make sure user generated observation
  let queryText = 'DELETE FROM "observations" WHERE "id" = $1;';
  console.log('deleting observation id:', id)
  pool.query(queryText,[id] )
  .then((result) =>{
      res.sendStatus(200);
  })
  .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
  })
}); //end DELETE

module.exports = router;
