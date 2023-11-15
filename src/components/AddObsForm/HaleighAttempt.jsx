import loadScript from 'load-script'

const setScript = () =>{
loadScript(
    `https://maps.googleapis.com/maps/api/place/json?libraries=places&components=country:us&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`,
    { async: true },
    () => {
      loading = false
      googleMapsApi = window.google.maps
      setApi(window.google.maps)
      each(callbacks, init => init())
      callbacks = []
    })

}

const AutocompleteAttempt = () => {
//   https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}
//   &types=establishment
//   &components=country:us
//   &key=YOUR_API_KEY


    return (
        <div></div>
    )
}