import React, {useEffect, createContext, useState } from "react";
import Geolocation from 'react-native-geolocation-service';
import {  Platform, PermissionsAndroid,} from "react-native"

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
    console.log("CurrentLocation 실행");
    const [lat, setlatitude] = useState();
    const [lng, setlongitude] = useState();
    useEffect(() => {
        requestPermission().then(result => { 
          console.log({ result });
         if (result === "granted") { 
           Geolocation.getCurrentPosition( 
             pos => { 
               setlatitude(pos.coords.latitude);
               setlongitude(pos.coords.longitude);
               console.log(pos.coords.latitude);
               console.log(pos.coords.longitude)
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
        <LocationContext.Provider value={{lat,lng,setlatitude,setlongitude}}>
            {props.children}
        </LocationContext.Provider>
    )
}