import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//species won't update

//child components
import SearchMap from '../SearchMap/SearchMap';


//function to fetch current date
function getDate() {
    const today = new Date().toISOString()
    return today.substr(0,10)
}

//format date for selector
function alterDate (string) {
    return string.substr(0,10)
}


const EditObsForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const observationToEdit = useSelector(store => store.observation.observationToEdit);
    const coordinates = useSelector(store => store.observation.newObservationCoords[0]);
    const commonNamesList = useSelector(store => store.plants.commonNamesList);
    const scientificNamesList = useSelector(store => store.plants.scientificNamesList);

    const [nameSearchType, setNameSearchType] = useState('scientific');
    let [updatedObservation, setUpdatedObservation] = useState(observationToEdit);

    //fetches species for form selector
    useEffect(() => {
        console.log('fetching plant names lists');
        dispatch({type:'FETCH_COMMON'})
        dispatch({type:'FETCH_SCIENTIFIC'})
        dispatch({ type: 'NEW_COORDINATES', payload: {lat: parseFloat(observationToEdit.location[0]), lng: parseFloat(observationToEdit.location[1])} })
    }, []);


    //sets common vs scientific name search
    const handleChange = (event) => {
        setNameSearchType(event.target.value);
    }

     //sets coordinates in updated observation
    useEffect(() => {
        if (coordinates == null ) {
            return console.log("no coords")
        } else{
            console.log('setting coordinates');
            setUpdatedObservation({...updatedObservation, location: [coordinates.lat, coordinates.lng]});
        }
    }, [coordinates]);

    //updates observation
    const updateObservation = event => {
        event.preventDefault();
        if (updatedObservation !== observationToEdit) {
            console.log("observation is:", updatedObservation)
            dispatch({ type: 'EDIT_OBSERVATION', payload: updatedObservation });
            history.push('/user')
        } else { /// update
            console.log('no changes')
            history.push('/user')
        }
    }

    return (
        <div>
            <h3>Edit Observation</h3>
            <form onSubmit={updateObservation}>
                <label htmlFor="name_type">Species:</label>
                <fieldset id="name_type">
                    <div>
                    <input 
                        type="radio"
                        name="common"
                        id="common"
                        value="common"
                        checked={nameSearchType === 'common'}
                        onChange={handleChange}
                    />
                    <label htmlFor="common"> Common Name
                    </label>
                    <br/>
                    {nameSearchType === 'common' &&
                    
                    <select
                    value={updatedObservation.species_id}
                    onChange={(event) => setUpdatedObservation({...updatedObservation, species: event.target.value})}
                    required
                    >
                        {commonNamesList.map((plant,i) => {
                                return <option key={i} value={plant.id}>{plant.common_name}</option>;
                        })}
                    </select>
                    }
                    </div>
                    <div>
                    <input 
                        type="radio"
                        name="scientific"
                        id="scientific"
                        value="scientific"
                        checked={nameSearchType === 'scientific'}
                        onChange={handleChange}
                    />
                    <label htmlFor="scientific"> Scientific Name
                    </label>
                    <br/>
                    {nameSearchType === 'scientific' &&
                
                    <select
                    value={updatedObservation.species_id}
                    onChange={(event) => setUpdatedObservation({...updatedObservation, species_id: event.target.value})}
                    required
                    >
                        {scientificNamesList.map((plant,i) => {
                                return <option key={i} value={plant.id}>{plant.scientific_name}</option>;
                        })}
                    </select>

                    }
                    </div>

                </fieldset>

                <br/>
                <label htmlFor="loc">Location:</label>
                <SearchMap  id="loc" />
                <br/>
                <br/>
                <label htmlFor="date">Date Observed:</label>
                <input type='date' id="date" value={alterDate(updatedObservation.date_observed)} onChange={(event) => setUpdatedObservation({...updatedObservation, date_observed: event.target.value})} placeholder="observation date" />
                <br/>
                <label>Notes: </label>
                <br/>
                <textarea rows="5" cols="35" name="text" value={updatedObservation.notes} onChange={(event) => setUpdatedObservation({...updatedObservation, notes: event.target.value})} placeholder="notes"></textarea>
                <br />
                <label htmlFor="photos">Photos:</label>
                <input type='text' id="photos" value={updatedObservation.photo} onChange={(event) => setUpdatedObservation({...updatedObservation, photo: event.target.value})} placeholder="photo url" />
                <br/>
                <br/>
                <button type='submit'> Update Observation </button>
            </form>
        </div>
    );
}


export default EditObsForm;