import React, {Component, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity

} from 'react-native';
import { useEffect,useLayoutEffect } from 'react';
import axios from 'axios'
import CurrentWeather from './WeatherInfo';
import moment from 'moment';
import 'moment/locale/ko';
const Stack = createNativeStackNavigator();

function WeatherHomeScreen({navigation}) {

const [isLoading, setIsLoading] = useState(true);
const [currentWeather, setCurrentWeather] = useState('');
const [temp, setTemp] = useState('');
const [windchill, setWindchill] = useState('');
const [error, setError] = useState(false);
const [airPollution,setAirPollution] = useState('');
const API_KEY = "914812757d39d05d77da90e5c6bd8ad2";
const lat = 38;
const lon = 128;
const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
const getWeather = async (lat, lon) => {
  try {
    const resWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    
    const resPollution = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    
    let _main = resWeather.data.weather[0].main;
    let _temp = resWeather.data.main.temp;
    let _windchill = resWeather.data.main.feels_like;
    let _airPollution = resPollution.data.list[0].main.aqi;
    setCurrentWeather(_main);
    setTemp(_temp);
    setWindchill(_windchill);

    setAirPollution(_airPollution);
  } catch (error) {
    Alert.alert("날씨 정보를 읽어올 수 없습니다.")
    setError(true);
    
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    getWeather(lat, lon);
  }, []);
  
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

 return (
    <View style={styles.screen}>
          {isLoading || error
        ? <Text> Waiting.. </Text>
        : (
          <>
          <View style={styles.top}>
            <Text style={styles.middletext}>{nowTime.toString().substring(0,16)}</Text> 
            <Text style={styles.bigtext}> {Math.round(temp)+"ºC"} </Text>
            <Text style={styles.middletext}> 미세먼지 : {airPollution}</Text>
          {/* <Text> 날씨 : {currentWeather} </Text>
          <Text> 체감온도 : {Math.round(windchill)}</Text> */}
          </View>
          {/* 수정중 */}
          <View style={styles.middle}>

            <View style={styles.middlebutton}>
              <TouchableOpacity>
                <Text>left</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cardImageContainer}>
                <Image style={styles.cardImage} source={require('./test.jpg')}/>
              </View>
            </View>
          <View style={styles.middlebutton} >
              <TouchableOpacity >
                <Text>right</Text>
              </TouchableOpacity>      
          </View>
          </View>

          <View style={styles.bottom}>
            <View style={styles.buttonlayout}>
            <TouchableOpacity style={styles.button}>
              <Text>tag</Text>
            </TouchableOpacity>         
            <TouchableOpacity style={styles.button}>
              <Text>tag</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.button}>
              <Text>tag</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.button}>
              <Text>tag</Text>
            </TouchableOpacity>   
            </View>
          </View>
          </>

        ) 
      }
    </View>
    );
  }
  
const styles = StyleSheet.create({
    screen:{
      flex: 1,
      alignItems: 'center',
      justifyContent: "space-between",
      margin: 10,
    },
    flexlayout:{
      flexDirection:"row",
      justifyContent: 'space-between'
    },
    header:{
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    middletext:{
      fontSize:20
    },
    bigtext:{
      fontSize: 40
    },
    cardImage: {
      width: 0,
      height: 0,
    },
    cardContainer:{
      flex:0.5,
      flexDirection: 'row',
      borderColor: 'black',
      borderWidth: 3,
      borderStyle: 'solid',
      borderRadius: 20,
      width:200,
      height: 300,
    },
    buttonlayout:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button:{
      width: 80,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:3,
    },
    top: {
      flex: 0.2,
      alignItems: 'center',
      backgroundColor: "grey",
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    middle: {
      flex: 0.6,
      backgroundColor: "beige",
      flexDirection:"row",
      borderWidth: 5,
    },
    middlebutton:{
      flex:0.1,alignItems:"center",justifyContent:"center"
    },
    bottom: {
      flex: 0.1,
      backgroundColor: "pink",
      borderWidth: 5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
})
  export default WeatherHomeScreen;