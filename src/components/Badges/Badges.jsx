import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function Badges() {

  const user = useSelector((store) => store.user);
  const userRegion = useSelector(store => store.userdata.userRegion[0])
  const regionBadgeSpecies = useSelector(store => store.search.userRegionBadgeResults)


  const dispatch = useDispatch();

  //fetches list of unique species observed in user's region
  useEffect(() => {
    console.log('fetching list of unique species from regional observations');
    // dispatch an action to get list
    console.log( { region: userRegion.id, user_id: user.id})
    console.log(userRegion)
    dispatch({type: 'BADGE_USER_REGION', payload: { region: userRegion.id, user_id: user.id}})
  }, []);


  //full join observations to regional plants, new column to count number of unique species observed
  //reducer for number
  //saga for badges

  return (
    <div className="badge-container">
      <p>Badges:</p>
        <img 
          className={regionBadgeSpecies[0].count <1 ? "unearned" : ""}
          alt={user.icon}
          width={"100px"}
          height={"100px"}
          src={`Site_SVG/badges/purple.svg`}
          title={regionBadgeSpecies[0].count <1 ? "Earn the badge by logging a find!" : "Way to go! You found something!"}
        /> 
        <img 
          className={regionBadgeSpecies[0].count <20 ? "unearned" : ""}
          alt={user.icon}
          width={"100px"}
          height={"100px"}
          src={`Site_SVG/badges/red.svg`}
          title={regionBadgeSpecies[0].count <20 ? "Next goal: find 20 species!" : "WOWZA! 20 species observed in your region"}
        />

        <img 
          className={regionBadgeSpecies[0].count <20 ? "unearned" : ""}
          alt={user.icon}
          width={"100px"}
          height={"100px"}
          src={`Site_SVG/badges/berry.svg`}
          title={regionBadgeSpecies[0].count <20 ? "Log 10 berries!" : "Berry Berry Berry"}
        />
        <img 
          className={regionBadgeSpecies[0].count <20 ? "unearned" : ""}
          alt={user.icon}
          width={"100px"}
          height={"100px"}
          src={`Site_SVG/badges/tree.svg`}
          title={regionBadgeSpecies[0].count <20 ? "Find 20 trees!" : "Tree Forager Status, hell yeah!"}
        />
   </div>
  );
}

// this allows us to use <App /> in index.js
export default Badges;
