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
import { useEffect,useLayoutEffect } from 'react';
import axios from 'axios'
const Stack = createNativeStackNavigator();

function WeatherHomeScreen({navigation}) {

const [isLoading, setIsLoading] = useState(true);
const [currentWeather, setCurrentWeather] = useState('');
const [temp, setTemp] = useState('');
const [error, setError] = useState(false);
const API_KEY = "914812757d39d05d77da90e5c6bd8ad2";
const lat = 38;
const lon = 128;

useEffect(() => {
  getWeather(lat, lon);
}, []);
const getWeather = async (lat, lon) => {
  try {
    const resWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    let _main = resWeather.data.weather[0].main;
    let _temp = resWeather.data.main.temp;
    //let res = JSON.stringify(resWeather);
    //console.log('[LOG] resWeather : ' + res);
    //setCurrentWeather(res);
    setCurrentWeather(_main);
    setTemp(_temp);
  } catch (error) {
    Alert.alert("날씨 정보를 읽어올 수 없습니다.")
    setError(true);
    
  } finally {
    setIsLoading(false);
  }
};

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
        <Text>현재 날씨 스크린</Text>
        {isLoading || error
        ? <Text> Waiting.. </Text>
        : (
          <>
          <Text> 날씨 : {currentWeather} </Text>
          <Text> 온도 : {Math.round(temp)} </Text>
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
      justifyContent: 'center' 
    },
})
  export default WeatherHomeScreen;