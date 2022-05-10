import React, {Component, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import { useLayoutEffect,useEffect } from 'react';
import axios from 'axios'
const Stack = createNativeStackNavigator();

function WeatherDetailScreen({navigation}) {
const [isLoading, setIsLoading] = useState(true);
const [time, setTime] = useState('');
const [forecastWeather, setForecastWeather] = useState('');
const [temp, setTemp] = useState('');
const [rain, setRain] = useState('');
const [error, setError] = useState(false);
const API_KEY = "914812757d39d05d77da90e5c6bd8ad2";
const lat = 38;
const lon = 128;
const getForecastWeather = async (lat, lon) => {
  try {
    const resWeather = await axios.get(
      `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=7`
    );
    console.log(resWeather);
    var i =0;
    let _main="";
    let _temp="";
    let _rain="";
    //_temp = korea time + 9 <== need to fix
    while(i<7){
      _main = _main + resWeather.data.list[i].weather[0].main+" " ;
      if(resWeather.data.list[i].rain===undefined) {
        _rain =_rain + "\n0mm";
      }else{
        convertRain = parseInt(resWeather.data.list[i].rain[0])
        convertRain = convertRain*100
        _rain = _rain +"\n"+convertRain+"%";
        _rain = _rain + resWeather.data.list[i].rain[0]+" ";
      }
      _temp = _temp + "\n"+resWeather.data.list[i].dt_txt ;
      i++;
    }
    setForecastWeather(_main);
    setTemp(_temp);
    //setRain(_rain);
  } catch (error) {
    Alert.alert("날씨 정보를 읽어올 수 없습니다.")
    setError(true);
    
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    getForecastWeather(lat, lon);
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
          <Text>상세 날씨 스크린</Text>
          <View style={{flex:1, backgroundColor:"red" }}>
            <Text> 날씨 :{forecastWeather} </Text>
            <Text> 시간 :{temp}</Text> 
            {/* <Text> 강수확률 : {rain}</Text> */}
          </View>
          <View style={{flex:1, backgroundColor:"green"}}>
            <Text>layout</Text>
          </View>
          <View style={{flex:1, backgroundColor:"purple"}}>
            <Text>layout</Text>
          </View>
        </View>
      );
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
           
        },
    })
    export default WeatherDetailScreen