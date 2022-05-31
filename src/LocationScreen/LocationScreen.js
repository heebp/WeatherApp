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
Geocode.setApiKey(GOOGLE_CUSTOM_API_KEY)
Geocode.setLanguage('en')
Geocode.setRegion('es')
Geocode.enableDebug()
const Stack = createNativeStackNavigator();

function LocationScreen({navigation}) {
  const mapRef = useRef(null);
  const location = useContext(LocationContext)
  const [searchLocation,setSearchLocation] = useState(location)
  const [searchWord, setSearchWord] = useState('검색');

  function getGeocoding(searchWord){
    console.log("test"+searchWord)

    Geocode.fromAddress(searchWord).then(
      response => {
      const latt = response.results[0].geometry.location;
      console.log(response.results[0].address_components);
      console.log(response.results[0].geometry.location);
      console.log(response);
      console.log("test"+latt.lat +"lon"+ latt.lng);
      setSearchLocation(latt);
      mapRef.current.animateToRegion({
        latitude : searchLocation.lat,
        longitude : searchLocation.lng
      })
    },
    error => {
      console.error(error);
    }
  );
  }

  console.log(location)
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerLeft: () => (
            <Button
            title="Category"
            onPress={ () => navigation.navigate('Category')}
          />
          ),
        })
      })
      useEffect(()=>{
      },[])
      return(
        <View style={{width: "100%", height: "100%"}}>
          <View style={{flexDirection:'row', margin: 5, alignItems:'center', justifyContent:'center', borderWidth:2, borderColor:'#888', borderRadius:10, backgroundColor:'#fff'}}>
            <View style={{flex:4}}>  
              <TextInput
                    style={{

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
            <View style={{flex:1}}>
              <TouchableOpacity onPress={() => getGeocoding(searchWord)}>
                <Image source={ require('../images/searchImage.png') } style={ { width: 40, height: 40 } } />
              </TouchableOpacity>
            </View>
          </View>
          <MapView
            ref ={mapRef} 
            style={{flex: 1}}
            region={{
              latitude: searchLocation.lat, 
              longitude: searchLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            
            /*
            onRegionChange={region => {
              setChangedLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}
            
            onRegionChangeComplete={region => {
              setChangedLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              });
            }}
            */
            showsUserLocation={true}
            >
            <Marker
              coordinate={{
                latitude: searchLocation.lat,
                longitude: searchLocation.lng
              }}
            />
          </MapView>
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