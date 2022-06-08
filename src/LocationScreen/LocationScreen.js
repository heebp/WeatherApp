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
import MapView, {Marker} from 'react-native-maps';
import Geocode from 'react-geocode'
import { useLayoutEffect } from 'react';
import { LocationContext } from '../Context/CurrentLocation';
import {API_KEY, GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DBContext } from '../Context/DataBase';
Geocode.setApiKey(GOOGLE_CUSTOM_API_KEY)
Geocode.setLanguage('ko')
Geocode.setRegion('es')
Geocode.enableDebug()


function LocationScreen({navigation}) {
  const db = useContext(DBContext)
  const mapRef = useRef(null);
  const location = useContext(LocationContext)
  const [searchLocation,setSearchLocation] = useState(location)
  const [markerLocation,setMarkerLocation] = useState(location)
  const [searchWord, setSearchWord] = useState('검색');

  function getGeocoding(searchWord){
    console.log("test"+searchWord)

    Geocode.fromAddress(searchWord).then(
      response => {
      const latt = response.results[0].geometry.location;
      console.log(response.results[0].address_components);
      console.log(response.results[0].geometry.location);
      console.log(response.results[0].geometry.location);
      console.log(response);
      console.log("test"+latt.lat +"lon"+ latt.lng);
      setSearchLocation(latt);
      setMarkerLocation(latt);
       mapRef.current.animateToRegion({
         latitude : latt.lat,
         longitude : latt.lng,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       })
    },
    error => {
      console.error(error);
    }
  );
  }
  function createMarker(coordinate){
    const marker={"lat":coordinate.latitude,"lng":coordinate.longitude}
    setMarkerLocation(marker)
  }
  useEffect(()=>{

  },[markerLocation])
      return(
        <View style={{width: "100%", height: "100%"}}>
          <View style={{flexDirection:'row', margin: 5,  borderWidth:2, borderColor:'#888', borderRadius:10, backgroundColor:'#fff'}}>
            <View style={{flex:4, }}>  
              <TextInput
                    style={{
                      position:'absolute',
                      justifyContent:'flex-start',
                      alignItems:'flex-start'
                    }}
                    onChangeText={(value)=>{
                      setSearchWord(value)
                      console.log(searchWord)
                    }}
                    onSubmitEditing={() => getGeocoding(searchWord)}
                    value={searchWord}
                    placeholder={'Search'}
                    placeholderTextColor={'#666'}
                />
            </View>
            <View style={{flex:1, }}>
              <TouchableOpacity style={{alignItems:'flex-end'}} onPress={() => getGeocoding(searchWord)}>
                <FontAwesome5 name="search" size={35} style={{margin:5}}/>
              </TouchableOpacity>
            </View>
          </View>
          <MapView
            ref ={mapRef} 
            style={{flex: 1}}
            initialRegion={{
              latitude: searchLocation.lat, 
              longitude: searchLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            /*
            region={{
              latitude: searchLocation.lat, 
              longitude: searchLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            */
            //onRegionChange={onRegionChange}           
            onRegionChange={region => {
              setSearchLocation(region);
            }}         
            onRegionChangeComplete={region => {
              setSearchLocation(region)
            }}          
            onPress={(event)=>createMarker(event.nativeEvent.coordinate)}
            showsUserLocation={true}      >
            <Marker
              coordinate={{
                latitude: markerLocation.lat,
                longitude: markerLocation.lng
              }}
            />
          </MapView>
          <View style={{position:'absolute',  top: '86%',  alignSelf: 'center',justifyContent:'center' }}>
              <TouchableOpacity style={{justifyContent:'center', backgroundColor:'black',borderRadius:100,width:300,height:40}}onPress={()=> navigation.navigate('LocationList',{markerLocation})}>
                <Text style={{fontWeight:"800",fontSize:15,color:'white',alignSelf: 'center'}}>위치 저장</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        map:{
          flex: 1,
        },
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
    })
    export default LocationScreen