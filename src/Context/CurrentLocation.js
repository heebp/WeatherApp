import React, {useEffect, createContext, useState } from "react";
import Geolocation from 'react-native-geolocation-service';
import {  Platform, PermissionsAndroid,} from "react-native"
import {API_KEY, GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'
export const LocationContext = createContext();

async function requestPermission() { 
    try { 
      if (Platform.OS === "ios") { 
        return await Geolocation.requestAuthorization("always"); 
      }  
      if (Platform.OS === "android") { 
        return await PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
           ); 
        } 
    } catch (e) {
           console.log(e); 
    } 
}

export const CurrentLocation = (props)=>{
    const [lat, setlatitude] = useState();
    const [lng, setlongitude] = useState();
    const [currentLat, setCurrentLat] = useState()
    const [currentLng, setCurrentLng] = useState()
    const [currentAddress, setCurrentAddress] = useState('')

    const getAddress = async (lat, lng) => {
      const response = await fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng
        + '&key=' + GOOGLE_CUSTOM_API_KEY + '&language=ko');
      const json = await response.json();

      setCurrentAddress(json.results[0].formatted_address)
    };

    useEffect(() => {
        requestPermission().then(result => { 
         if (result === "granted") { 
           Geolocation.getCurrentPosition( 
             pos => { 
               setlatitude(pos.coords.latitude);
               setlongitude(pos.coords.longitude);
               setCurrentLat(pos.coords.latitude)
               setCurrentLng(pos.coords.longitude)
               getAddress(pos.coords.latitude,pos.coords.longitude)

             }, 
             error => { 
               console.log(error); 
             }, 
             { 
               enableHighAccuracy: true, 
               timeout: 3600, 
               maximumAge: 3600, 
             }, 
             ); 
           } 
         });
      }, []);
      
    return(
        <LocationContext.Provider value={{lat,lng,currentLat,currentLng,currentAddress,setlatitude,setlongitude}}>
            {props.children}
        </LocationContext.Provider>
    )
}