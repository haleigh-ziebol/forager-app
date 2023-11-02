import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function Badges() {

  const user = useSelector((store) => store.user);
  const userRegion = useSelector(store => store.userdata.userRegion[0])
  const regionBadgeSpecies = useSelector(store => store.search.userRegionBadgeResults)
  const berryBadgeSpecies = useSelector(store => store.search.berriesBadgeResults)
  const treeBadgeSpecies = useSelector(store => store.search.treeBadgeResults)

  const dispatch = useDispatch();

  //fetches list of unique species observed in user's region
  useEffect(() => {
    console.log('fetching list of unique species from regional observations');
    // dispatch an action to get list
    dispatch({type: 'BADGE_USER_REGION', payload: { region: userRegion.id, user_id: user.id}})
    //berries
    dispatch({type: 'BADGE_TREES', payload: { user_id: user.id}})
    //trees
    dispatch({type: 'BADGE_BERRIES', payload: { user_id: user.id}})

  }, []);


  return (
    <div className="badge-container">
      <p>Badges:</p>
        <img 
          id="1-thing"
          className={regionBadgeSpecies[0].count <1 ? "unearned" : ""}
          alt={user.icon}
          width={"75px"}
          height={"75px"}
          src={`Site_SVG/badges/purple.svg`}
          title={regionBadgeSpecies[0].count <1 ? "Earn the badge by logging a find!" : "Way to go! You logged a find!"}
        /> 
        <label htmlFor='1-thing'>Official Forager</label>

        <div>
          <img 
            className={regionBadgeSpecies[0].count <10 ? "unearned" : ""}
            alt={user.icon}
            width={"75px"}
            height={"75px"}
            src={`Site_SVG/badges/red.svg`}
            title={regionBadgeSpecies[0].count <20 ? "Next goal: find 10 species!" : "WOWZA! 10 species observed in your region"}
          />
          <label htmlFor='20-things'>10 Species</label>
        </div>
        <div>
          <img 
            id="berries"
            className={berryBadgeSpecies[0].count <5 ? "unearned" : ""}
            alt={user.icon}
            width={"75px"}
            height={"75px"}
            src={`Site_SVG/badges/berry.svg`}
            title={berryBadgeSpecies[0].count <5 ? `Log 5 berries! You've found ${berryBadgeSpecies[0].count} berry species.` : "Berry Berry Berry"}
          />
          <label htmlFor='berries'>Berry Finder</label>
        </div>
        <div>
          <img 
            id="trees"
            className={treeBadgeSpecies[0].count <10 ? "unearned" : ""}
            alt={user.icon}
            width={"75px"}
            height={"75px"}
            src={`Site_SVG/badges/tree.svg`}
            title={treeBadgeSpecies[0].count <10 ? `Find 10 trees! You've found ${treeBadgeSpecies[0].count} tree species.` : "Tree Forager Status, hell yeah!"}
          />
          <label htmlFor='trees'>Tree Finder</label>
        </div>
   </div>
  );
}

// this allows us to use <App /> in index.js
export default Badges;
