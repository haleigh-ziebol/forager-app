const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// GET route
router.get('/search/:species', (req, res) => {
  const species = req.params.species;
  axios.get(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=revisions&rvprop=content&rvslots=%2A&titles=${species}&format=json`)
  .then((response) => {
      res.send(response.data.query.pages[0].revisions[0].slots.main.content)
  }).catch((error) => {
      console.log('GET wikipedia species data failed:' , error);
      res.sendStatus(500);
  })
}); //end GET route


module.exports = router;
