import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchMap from '../SearchMap/SearchMap';

//option to set longitude with address or map

//function to fetch current date
function getDate() {
    const today = new Date().toISOString()
    return today.substr(0,10)
  }


const AddObsForm = () => {
    const dispatch = useDispatch();
    
    let [newObservation, setNewObservation] = useState({ user_id: '', species: '', location:[] , photo: '', notes: '', date_observed: getDate(), time_stamp: getDate()});


    const user = useSelector(store => store.user);
    const speciesList = useSelector(store => store.plants.plantList);
    const coordinates = useSelector(store => store.observation.newObservationCoords[0])

    //fetches species for form selector
    useEffect(() => {
        console.log('fetching species list');
        // dispatch an action to load plants from DB
        dispatch({type:'FETCH_PLANTS'})
    }, []);

    //sets user_id in newObservation
    useEffect(() => {
        if(user.id !== ''){
            console.log('setting user');
            setNewObservation({...newObservation, user_id: user.id});
        }
    }, [user.id]);

    //sets coordinates in newObservation
    useEffect(() => {
        if (coordinates == null ) {
            return console.log("no coords")
        } else{
            console.log('setting coordinates');
            setNewObservation({...newObservation, location: [coordinates.lat, coordinates.lng]});
        }
    }, [coordinates]);

    //adds user's new observation
    const addNewObservation = event => {
        event.preventDefault();
        console.log("observation is:", newObservation)
        dispatch({ type: 'ADD_NEW_OBSERVATION', payload: newObservation });
        setNewObservation({user_id: '', species: '', location: [] , photo:'' , notes:'', date_observed: getDate(), time_stamp: getDate()});
    }

    return (
        <div>
            <h3>Observation Form</h3>
            <form onSubmit={addNewObservation}>
                <label htmlFor="species">Species:</label>
                <select
                id="species"
                value={newObservation.species}
                onChange={(event) => setNewObservation({...newObservation, species: event.target.value})}
                required
                >
                    {speciesList.map((plant) => {
                            return <option key={plant.id} value={plant.id}>{plant.scientific_name}</option>;
                    })}
                </select>
                <br/>
                <label htmlFor="loc">Location:</label>
                <SearchMap  id="loc" />
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


export default AddObsForm;