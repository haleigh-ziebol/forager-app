const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// GET route for text from Wikipedia API
router.get('/text/:species', (req, res) => {
  const species = req.params.species;
  axios.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${species}&prop=wikitext&section=0&disabletoc=1`)
  .then((response) => {
      res.send(response.data.parse.wikitext)
  }).catch((error) => {
      console.log('GET wikipedia species text failed:' , error);
      res.sendStatus(500);
  })
}); //end GET route

// GET route for image from Wikipedia API
router.get('/image/:species', (req, res) => {
  const species = req.params.species;
  axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${species}&prop=pageimages&format=json&pithumbsize=100`)
  .then((response) => {
    res.send(response.data.query.pages)
  }).catch((error) => {
    console.log('GET wikipedia species image failed:' , error);
    res.sendStatus(500);
  })
}); //end GET route


module.exports = router;
