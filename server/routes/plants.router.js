const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all species
router.get('/', (req, res) => {
  let queryText = 'SELECT * from "species";';
  console.log('Fetching all species')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching feedback`, error);
    res.sendStatus(500);
  });
}); //end GET

//GET all regions
router.get('/regions', (req, res) => {
  let queryText = 'SELECT * from "regions";';
  console.log('Fetching all regions')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching feedback`, error);
    res.sendStatus(500);
  });
}); //end GET


module.exports = router;
