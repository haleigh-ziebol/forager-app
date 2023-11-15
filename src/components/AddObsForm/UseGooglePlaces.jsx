import { useEffect, useState, useCallback } from 'react'
import loadScript from 'load-script'
import each from 'lodash/each'


//useCallback caches a function definition between re-renders
var googleMapsApi
var loading = false
var callbacks = []

const useGooglePlaces = () => {
  const [api , setApi] = useState()

  const callback = useCallback(() => {
    setApi(window.google.maps)
  }, []) //will be re-rendered based on changed dependencies

  useEffect(() => {
    if (loading) {
      callbacks.push(callback)
    } else {
      if (!googleMapsApi) {
        loading = true
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
          { async: true },
          () => {
            loading = false
            googleMapsApi = window.google.maps
            setApi(window.google.maps)
            each(callbacks, init => init())
            callbacks = []
          })
      }
    }
  }, [])

  return googleMapsApi
}

export default useGooglePlaces