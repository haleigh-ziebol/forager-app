const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all species scientific names
router.get('/scientific', (req, res) => {
  let queryText = 'SELECT "scientific_name", "id" from "species";';
  console.log('Fetching all species scientific names')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching scientific names`, error);
    res.sendStatus(500);
  });
}); //end GET

//GET species common names
router.get('/common', (req, res) => {
  let queryText = `SELECT CONCAT(TRIM(UNNEST(STRING_TO_ARRAY("common_name", ','))))
  as "common_name", "id" 
  FROM species;`;
  console.log('Fetching all species common names')
  pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error fetching common names`, error);
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
    console.log(`Error fetching regions`, error);
    res.sendStatus(500);
  });
}); //end GET


module.exports = router;
