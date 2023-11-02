import { useRef, useEffect } from "react";

const AutoComplete = () => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "us" },
  fields: ["geometry"],
  types: ["establishment"]
 };
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
  console.log(inputRef, "input ref")
  autoCompleteRef.current.addListener("place_changed", async function () {
   const place = await autoCompleteRef.current.getPlace();
   console.log({ place });
  });
 }, []);
 return (
  <div>
   <label>enter address :</label>
   <input ref={inputRef} />
  </div>
 );
};
export default AutoComplete;

// import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
// import useEffect from 'react';

// export default () => {
//   const {
//     placesService,
//     placePredictions,
//     getPlacePredictions,
//     isPlacePredictionsLoading,
//   } = usePlacesService({
//     apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
//   });

//   useEffect(() => {
//     // fetch place details for the first element in placePredictions array
//     if (placePredictions.length)
//       placesService?.getDetails(
//         {
//           placeId: placePredictions[0].place_id,
//         },
//         (placeDetails) => savePlaceDetailsToState(placeDetails)
//       );
//   }, [placePredictions]);

//   return (
//     <>
//       <Input
//         placeholder="Debounce 500 ms"
//         onChange={(evt) => {
//           getPlacePredictions({ input: evt.target.value });
//         }}
//         loading={isPlacePredictionsLoading}
//       />
//       {placePredictions.map((item) => renderItem(item))}
//     </>
//   );
// };