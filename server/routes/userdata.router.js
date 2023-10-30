const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET user region
router.get('/region/:regionID', (req, res) => {
  const regionID = req.params.regionID;
  console.log('Fetching user region')
    if(req.isAuthenticated()) {
    let queryText = `SELECT * FROM "regions" WHERE "id" =$1;`;
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

module.exports = router;
