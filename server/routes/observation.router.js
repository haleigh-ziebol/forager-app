const express = require('express');
const pool = require('../modules/pool');
const { update } = require('lodash');
const router = express.Router();


//GET observations submitted by user
router.get('/region/:regionID', (req, res) => {
  const regionID = req.params.userID;
  console.log('Fetching all users observations')
    if(req.isAuthenticated()) {
    let queryText = `SELECT * FROM "region" WHERE "id" =$1;`;
    pool.query(queryText, [regionID])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error fetching users observations`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET

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
  const userID = req.params.userID;
  console.log('Fetching all user observations')
    if(req.isAuthenticated()) {
    let queryText = `SELECT observations.*, s.scientific_name, s.common_name, s.growth_type
                     FROM "observations"
                      JOIN species s
                      ON s.id = species_id
                      WHERE "user_id" =$1`;
    pool.query(queryText, [userID])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error fetching users observations`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET


//POST new observation as user
router.post('/',  (req, res) => {
  let newObservation = req.body;
  console.log(`Adding observation`, newObservation);
  if(req.isAuthenticated()) {
    let queryText = `INSERT INTO "observations" ("user_id", "species_id", "location", "photo", "notes", "date_observed", "time_stamp")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [newObservation.user_id, newObservation.species, newObservation.location, newObservation.photo, newObservation.notes, newObservation.date_observed, newObservation.time_stamp])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new observation`, error);
      res.sendStatus(500);
    });
  } else {
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
                  SET "species_id" = $1
                  WHERE "id" = $2;`;
    pool.query(queryText, [updatedObservation.species_id, id])
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
