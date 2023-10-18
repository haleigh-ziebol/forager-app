import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchMap from '../SearchMap/SearchMap';

//option to set longitude with address or map

//function to fetch current date
function getDate() {
    const today = new Date().toISOString()
    return today.substr(0,10)
  }


const NewObservationForm = () => {
    const dispatch = useDispatch();
    
    let [newObservation, setNewObservation] = useState({ user_id: '', species: '', location:[] , photo:'' , notes:'', date_observed: getDate(), time_stamp: getDate()});
    let [marker, setMarker] = useState([]);

    const user = useSelector((store) => store.user.userReducer);
    const plantList = useSelector(store => store.plants.plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to load plants from DB
        dispatch({type:'FETCH_PLANTS'})
    }, []);

    //adds user's new observation
    const addNewObservation = event => {
        event.preventDefault();
        console.log("coord is:", marker[0].lat, marker[0].lng);
        setNewObservation({...newObservation, user_id: user.id});
        setNewObservation({...newObservation, location: [marker[0].lat, marker[0].lng]});
        dispatch({ type: 'ADD_NEW_OBSERVATION', payload: newObservation });
        setNewObservation({user_id: '', species: '', location: [] , photo:'' , notes:'', date_observed: getDate(), time_stamp: getDate()});
    }

    return (
        <div>
            <h3>Observation Form</h3>
            {JSON.stringify(plantList)}
            <form onSubmit={addNewObservation}>
                <label htmlFor="species">Species:</label>
                <select
                id="species"
                value={newObservation.species}
                onChange={(event) => setNewObservation({...newObservation, species: event.target.value})}
                required
                >
                    {plantList.map((plant) => {
                            return <option key={plant.id} value={plant.id}>{plant.scientific_name}</option>;
                    })}
                </select>
                {/* <input type='text' id="species" value={newObservation.species} onChange={(event) => setNewObservation({...newObservation, species: event.target.value})} placeholder="species" required /> */}
                <br/>
                <label htmlFor="loc">Location:</label>
                <SearchMap  id="loc" marker={marker} setMarker={setMarker}/>
                <label htmlFor="date">Date Observed:</label>
                <input type='date' id="date" value={newObservation.date_observed} onChange={(event) => setNewObservation({...newObservation, date_observed: event.target.value})} placeholder="observation date" />
                <br/>
                <label>Notes: </label>
                <br/>
                <textarea rows="5" cols="35" name="text" value={newObservation.notes} onChange={(event) => setNewObservation({...newObservation, notes: event.target.value})} placeholder="notes"></textarea>
                <br />
                <label htmlFor="photos">Photos:</label>
                <input type='text' id="photos" value={newObservation.photo} onChange={(event) => setNewObservation({...newObservation, photo: event.target.value})} placeholder="photo url" />
                <br/>
                <br/>
                <button type='submit'> add new observation </button>
            </form>
        </div>
    );
}


export default NewObservationForm;