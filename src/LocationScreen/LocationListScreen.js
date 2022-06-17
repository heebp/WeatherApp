import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {API_KEY, GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'
import { DBContext } from '../Context/DataBase';
import { LocationContext } from '../Context/CurrentLocation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function LocationListScreen({route,navigation}){
    const db = useContext(DBContext)
    const location = useContext(LocationContext)
    const {markerLocation} = route.params
    const headerAddress = route.params
    const [forceRender, setForceRender] = useState(false)
    const [address, setAddress] = useState('')
    
    const getAddress = async (lat, lng) => {
      const response = await fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng
        + '&key=' + GOOGLE_CUSTOM_API_KEY + '&language=ko');
      const json = await response.json();
      saveLocation(markerLocation, json.results[0].formatted_address)
    };

    function saveLocation(location, address){
      try{
        db.transaction((tx) => {
          tx.executeSql(`INSERT INTO location(lat,lng,address) VALUES(?,?,?);`,
          [location.lat,location.lng,address],  
          (tx, results) => {
            setForceRender(true)
          },
          (error)=>{
            console.log('에러발생',error);
          });
        });
      }catch(error){
        console.log(error);
      }
  }
  const getLocation = (temp) => {
    try{
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM location;`,
        [],  
        (tx, results) => {
            const rows = results.rows;
            let tag = [];
            for (let i=0; i<rows.length; i++) {
                tag.push({
                    ...rows.item(i),
                });
            }
            console.log(tag)
            setAddress(tag);
        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }
  const changeLocation=(lat, lng,address)=>{
    location.setlatitude(lat)
    location.setlongitude(lng)
    headerAddress.setAddress(address)
  }
  const deleteLocation = (address)=>{
    console.log("?",address)
    try{
      db.transaction((tx) => {
        //tx.executeSql(`DELETE FROM location where lat='`+lat+`' and lng='`+lng+`';`,
        tx.executeSql(`DELETE FROM location where address='`+address +`';`,
        [],  
        (tx, results) => {
          console.log("dasf",results)
          getLocation()
        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }
    useEffect(()=>{
      if(markerLocation != undefined){
        if(forceRender==false){
          getAddress(markerLocation.lat,markerLocation.lng,)
        }
      }
      getLocation()
    },[markerLocation, forceRender])
    return(
        <View style={styles.screen}>
          <View style={styles.screen2}>
          <TouchableOpacity onPress={()=>changeLocation(location.currentLat, location.currentLng,location.currentAddress)}>
            <Text style={styles.locationtext}>현재 위치 : {location.currentAddress}</Text>
          </TouchableOpacity>
          </View>
          {address.map===undefined?(
              <View>
                <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large"/>
              </View>
          ):(
            address.map((item,index) => (
              <View  key={item.address} style={styles.addresscontainer}>
                <View  key={item.address} style={{flex:1}}>
                <TouchableOpacity key={item.address} onPress={()=>changeLocation(item.lat,item.lng,item.address)}>
                  <Text key={item.address} style={styles.locationtext}>{item.address}</Text>
                </TouchableOpacity>   
                </View>
                <View style={{marginRight:"auto"}}>
                  <TouchableOpacity key={item.address} style={styles.icon}  onPress={()=>deleteLocation(item.address)}>
                    <FontAwesome5  key={item.address} name="times" color={"white"} size={20}/>
                  </TouchableOpacity>
                </View>
              </View>
              ))
          )}
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
      flex: 1,
      alignItems:"center",
      backgroundColor:"black"
    },
    screen2:{
      alignSelf:"flex-start"
    },
    locationtext:{
      color: "white",
    },
    addresscontainer:{
      flexDirection:'row' 
    },
    icon:{
      alignContent:"flex-end",
    }
})
export default LocationListScreen