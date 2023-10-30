import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

//child components
import SearchMap from '../SearchMap/SearchMap';

//MUI components
import Alert from '@mui/material/Alert';
import Fade from "@mui/material/Fade";

//function to fetch current date
function getDate() {
    const today = new Date().toISOString()
    return today.substr(0,10)
}


const AddObsForm = () => {
    const dispatch = useDispatch();
    
    const [newObservation, setNewObservation] = useState({ user_id: null, species: '', location:[] , photo: '', notes: '', date_observed: getDate(), time_stamp: getDate()});
    const [nameSearchType, setNameSearchType] = useState('common');
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)


    const user = useSelector(store => store.user);
    const commonNamesList = useSelector(store => store.plants.commonNamesList);
    const scientificNamesList = useSelector(store => store.plants.scientificNamesList);
    const coordinates = useSelector(store => store.observation.newObservationCoords[0]);

    //fetches species for form selector
    useEffect(() => {
        console.log('fetching plant names lists');
        dispatch({type:'FETCH_COMMON'})
        dispatch({type:'FETCH_SCIENTIFIC'})
    }, []);

    //sets user_id in newObservation
    useEffect(() => {
        if(user.id > 0){
            console.log('setting user id:', user.id);
            setNewObservation({...newObservation, user_id: user.id});
        }
    }, [user]);

    //sets coordinates in newObservation
    useEffect(() => {
        if (coordinates == null ) {
            return console.log("no coords")
        } else{
            console.log('setting coordinates');
            setNewObservation({...newObservation, location: [coordinates.lat, coordinates.lng]});
        }
    }, [coordinates]);

    //sets common vs scientific name search
    const handleChange = (event) => {
        setNameSearchType(event.target.value);
    }

    //adds user's new observation
    const addNewObservation = event => {
        event.preventDefault();
        const payload = {...newObservation, user_id: user.id} //payload is set immediately whereas setting newObs with useState is lagged
        if(payload.user_id !== null && payload.species !== null) { //prevents observation from being submitted without user.id and species
        dispatch({ type: 'ADD_NEW_OBSERVATION', payload: payload, callback });    
        } else {
            callback(false);
            console.log("trouble with vars")
        }
    }

    const callback = (string) => {
        if (string == true) {
            successObservation();
        } else if (string == false) {
            errorObservation();
        }
    }

    const successObservation = () => {
        setNewObservation({...newObservation, species: '', location: [] , photo:'' , notes:'', date_observed: getDate(), time_stamp: getDate()});
        window.scrollTo(0, 0);
        setSuccess(true);
    }

    const errorObservation = () => {
        window.scrollTo(0, 0);
        setFailed(true);
    }

    return (
        <div>
            { success &&
                <Fade
                in={success}
                timeout={{ enter: 200, exit: 200 }}
                addEndListener={() => {
                    setTimeout(() => {
                    setSuccess(false)
                    }, 4000); //alerts on a timer
                }}
                >
                    <Alert severity="success">Observation Added!</Alert>
                </Fade>
            }
            { failed &&
                <Fade
                in={failed}
                timeout={{ enter: 200, exit: 200 }}
                addEndListener={() => {
                    setTimeout(() => {
                    setFailed(false)
                    }, 4000);
                }}
                >
                    <Alert severity="error">Error with adding observation! Make sure all inputs set</Alert>
                </Fade>
            }

            <h3>Add A Find</h3>
            <form onSubmit={addNewObservation}>
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
                    value={newObservation.species}
                    onChange={(event) => setNewObservation({...newObservation, species: event.target.value})}
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
                    value={newObservation.species}
                    onChange={(event) => setNewObservation({...newObservation, species: event.target.value})}
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
                <input type='date' id="date" value={newObservation.date_observed} 
                    onChange={(event) => setNewObservation({...newObservation, date_observed: event.target.value})} placeholder="observation date" required/>
                <br/>
                <label>Notes: </label>
                <br/>
                <textarea rows="5" cols="35" name="text" value={newObservation.notes} onChange={(event) => setNewObservation({...newObservation, notes: event.target.value})} 
                    placeholder="not required">
                </textarea>
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