import React, {useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';

//option to set longitude with address or map

//function to fetch current date
function getDate() {
    const today = new Date().toISOString()
    return today.substr(0,10)
  }


const NewObservationForm = () => {
    const dispatch = useDispatch();
    
    let [newObservation, setNewObservation] = useState({species: '', location:[] , photo:'' , notes:'', date_observed: getDate(), date_added: getDate()});
    const observationLat = useSelector((store) => store.newObservationLat);
    const observationLng = useSelector((store) => store.newObservationLng);

    console.log("coord is:", observationLat, observationLng)
    const addNewObservation = event => {
        event.preventDefault();
        setNewObservation({...newObservation, location: [observationLat, observationLng]});
        dispatch({ type: 'ADD_OBSERVATION', payload: newObservation });
        setNewObservation({species: '', location: [] , photo:'' , notes:'', date_observed: getDate(), date_added: getDate()});
    }
    return (
        <div>
            <h3>Observation Form</h3>
            <form onSubmit={addNewObservation}>
                <label htmlFor="species">Species:</label>
                <input type='text' id="species" value={newObservation.species} onChange={(event) => setNewObservation({...newObservation, species: event.target.value})} placeholder="species" required />
                <br/>
                <label htmlFor="loc">Location:</label>
                <p id="loc">{JSON.stringify(observationLat)}, {JSON.stringify(observationLng)}</p>
                <br/>
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