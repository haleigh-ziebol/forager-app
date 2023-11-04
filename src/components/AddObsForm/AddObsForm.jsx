import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import Debounce from './AutoComplete.jsx'

//child components
import SearchMap from '../SearchMap/SearchMap';

//MUI components
import Alert from '@mui/material/Alert';
import Fade from "@mui/material/Fade";
import { Button, Card } from '@mui/material';

//function to fetch current date
function getDate() {
    const today = new Date().toISOString()
    return today.substr(0,10)
}


const AddObsForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [newObservation, setNewObservation] = useState({ user_id: null, species: '', location:[] , photo: '', notes: '', date_observed: getDate(), time_stamp: getDate()});
    const [nameSearchType, setNameSearchType] = useState('common');
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [selectedFile, setSelectedFile] = useState();

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

    //photo upload
    const onFileChange = async (event) => {
        const fileToUpload = event.target.files[0];
        console.log("file", fileToUpload)
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg' ]
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            setSelectedFile(fileToUpload);
        }
        else {
            alert('Please select an image');
        }
    }

    //adds user's new observation
    const addNewObservation = event => {
        event.preventDefault();
        console.log(selectedFile)
        let fileName = "";
        const formData = new FormData();
        if (selectedFile) { // keeps photo data empty if nothing uploaded
        fileName = encodeURIComponent(selectedFile.name);
        console.log(fileName, "file name")
        formData.append('image', selectedFile);
        console.log(formData, "form data")
        }
        const addUserId = {...newObservation, user_id: user.id} //payload is set immediately whereas setting newObs with useState is lagged
        console.log(addUserId, "user")
        const payload = {observationData: addUserId, formData: formData, fileName:fileName}

        if(addUserId.user_id !== null && newObservation.species !== null && payload.fileName !== null) { //prevents observation from being submitted without user.id and species
            dispatch({ type: 'ADD_NEW_OBSERVATION', payload: payload, callback });
            console.log("observation submitted")
        }
        else if(addUserId.user_id !== null && newObservation.species !== null && payload.fileName == null) {
            dispatch({ type: 'ADD_NEW_OBSERVATION', payload: payload, callback });
            console.log("observation submitted") 
        } else {
            callback(false)
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
        <div className='center'>
         <Card sx={{ maxWidth: 4/5, p:'2rem', bgcolor:'#FFF4F4', color:'#484E6B'}} className='background1'>
        {/* <Debounce/> */}
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
                    <Alert severity="success">Your find has been added to your map! <button onClick={()=> history.push('/user')}>Look here!</button></Alert>
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
                    <Alert severity="error">Error with adding observation! Make sure all inputs are set.</Alert>
                </Fade>
            }

            <h2>Add A Find</h2>
            <form onSubmit={addNewObservation}>
                <fieldset id="name_type">
                    <legend>Species:</legend>
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
                <input 
                    type='file' 
                    id="photos" 
                    accept="image/*"
                    onChange={onFileChange} 
                />
                <br/>

                <br/>
                <Button type='submit' variant="outlined" style={{backgroundColor: "#E6CFC1", color: "#484E6B"}}> add new find! </Button>
            </form>
            </Card>
        </div>
    );
}


export default AddObsForm;