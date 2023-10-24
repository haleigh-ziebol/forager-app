const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET search all terms
router.get('/', (req, res) => {
  const region = req.query.region;
  const species = req.query.species;
  const type = req.query.type;
  console.log('Fetching ALL species info for search')
  if(req.isAuthenticated() && region !== '%') {
    let queryText = `SELECT DISTINCT r.name, s.*, o.user_id FROM species s
                    FULL JOIN observations o
                    ON s.id = o.species_id
                    JOIN species_state x
                    ON s.id = x.species_id
                    JOIN states y
                    ON x.state_id = y.id
                    JOIN regions r
                    ON y.region_id = r.id
                    WHERE r.id = $1 AND
                    ("scientific_name"  ILIKE $2
                    OR "common_name"  ILIKE $2)
                    AND "growth_type"  LIKE $3
                    ORDER BY "scientific_name" ASC;`
    pool.query(queryText, [region, species, type])
    .then(result => {
      res.send(result.rows);
      console.log(result.rows)
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else if(req.isAuthenticated() && region == '%') {
    let queryText = `SELECT s.*, o.user_id 
                    FROM species s
                    FULL JOIN observations o
                    ON s.id = o.species_id
                    WHERE ("scientific_name"  ILIKE $1
                    OR "common_name"  ILIKE $1)
                    AND "growth_type"  LIKE $2
                    ORDER BY "scientific_name" ASC;`
    pool.query(queryText, [species, type])
    .then(result => {
      res.send(result.rows);
      console.log(result.rows)
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET


//GET search by species ID
router.get('/id/:ID', (req, res) => {
  const id = req.params.ID;
  console.log('Fetching species info for search from DB')
    if(req.isAuthenticated()) {
      let queryText = `SELECT * from "species"
                  WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then(result => {
      res.send(result.rows[0]);
      console.log(result.rows[0])
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET



//GET search by species name
router.get('/species/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log('Fetching species info for search')
    if(req.isAuthenticated()) {
      let queryText = `SELECT s.*, o.user_id FROM "species" s
                  LEFT JOIN "observations" o
                  ON o.species_id = s.id
                  WHERE "scientific_name"  ILIKE '%' || $1 || '%'
                  OR "common_name"  ILIKE '%' || $1 || '%'
                  ORDER BY "common_name" ASC;`;
    pool.query(queryText, [searchTerm])
    .then(result => {
      res.send(result.rows);
      console.log(result.rows)
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET


//GET search by growth type
router.get('/type/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log('Fetching species info by growth type')
    if(req.isAuthenticated()) {
    let queryText = `SELECT s.*, o.user_id FROM "species" s
                    LEFT JOIN "observations" o
                    ON o.species_id = s.id 
                    WHERE "growth_type"  LIKE '%' || $1 || '%'
                    ORDER BY "common_name" ASC;`;
    pool.query(queryText, [searchTerm])
    // pool.query(queryText)

    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET


//GET search by region
router.get('/region/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log('Fetching species info by region')
    if(req.isAuthenticated()) {
    let queryText = `SELECT DISTINCT r.name, s.*, o.user_id FROM species s
                  FULL JOIN observations o
                  ON s.id = o.species_id
                  JOIN species_state x
                  ON s.id = x.species_id
                  JOIN states y
                  ON x.state_id = y.id
                  JOIN regions r
                  ON y.region_id = r.id
                  WHERE r.id = $1
                  ORDER BY "common_name" ASC`;
    pool.query(queryText, [searchTerm])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET

module.exports = router;
