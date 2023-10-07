import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewObservationForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newObservation, setNewObservation] = useState({species: '', location: [] , photo:'' , date_added = ''});


    const addNewObservation = event => {
        event.preventDefault();
        //dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        //setPlant({name: '', kingdom:'', clade:'', order:'', family:'', subfamily:'', genus:'' });
    }
    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewObservation}>
                <input type='text' value={newPlant.name} onChange={() => setNewObservation({...newObservation, species: event.target.value})} placeholder="species" />
                <br/>
                <input type='text' value={newPlant.kingdom} onChange={() => setNewObservation({...newObservation, species: event.target.value})} placeholder="location" />
                <br/>
                <input type='text' value={newPlant.clade} onChange={() => setNewObservation({...newObservation, species: event.target.value})} placeholder="photo" />
                <br/>
                <br/>
                <button type='submit'> add new observation </button>
            </form>
        </div>
    );
}


export default NewObservationForm;