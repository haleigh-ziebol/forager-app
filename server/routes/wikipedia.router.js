const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// GET route
router.get('/search/:species', (req, res) => {
  const species = req.params.species;
  axios.get(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=revisions&rvprop=content&rvslots=%2A&titles=${species}&format=json`)
  .then((response) => {
      res.send(response.data.query.pages[0].revisions[0].slots.main)
  }).catch((error) => {
      console.log('GET wikipedia species data failed:' , error);
      res.sendStatus(500);
  })
}); //end GET route

// // GET route
// router.get('/search/:species', (req, res) => {
//   const species = req.params.species;
//   axios.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${species}&prop=sections&disabletoc=1`)
//   .then((response) => {
//       res.send(response.data.parse.sections)
//   }).catch((error) => {
//       console.log('GET wikipedia species data failed:' , error);
//       res.sendStatus(500);
//   })
// }); //end GET route


module.exports = router;
