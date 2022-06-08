import React, {useContext, useEffect, useState,useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { DBContext } from '../Context/DataBase';
import { LocationContext } from '../Context/CurrentLocation';

function LocationListScreen({route,navigation}){
    const db = useContext(DBContext)
    const location = useContext(LocationContext)
    const {markerLocation} = route.params

    console.log("마커",markerLocation)
    //console.log("",location)
    useEffect(()=>{
      location.setlatitude(markerLocation.lat)
      location.setlongitude(markerLocation.lng)
      console.log(".....",markerLocation)
    },[markerLocation])
    return(
        <View style={styles.screen}>
            
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
      flex: 1,
      backgroundColor:"black"
    },
    screen2:{
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center' 
    },
})
export default LocationListScreen