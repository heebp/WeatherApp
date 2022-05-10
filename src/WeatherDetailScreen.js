import React, {Component, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Alert
} from 'react-native';
import { useLayoutEffect,useEffect } from 'react';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';

function WeatherDetailScreen({navigation}) {
const API_KEY = "914812757d39d05d77da90e5c6bd8ad2";
const lat = 38;
const lon = 128;
const getForecastWeather = async => {
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
          <View style={styles.top}>
            <Text>시간별 날씨</Text>
            <HourlyWeather style={styles.screen}/>
          </View>
          <View style={styles.bottom}>
            <Text>주간별 날씨</Text>
            <DailyWeather style={styles.screen}/>
          </View>
        </View>
      );
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
        tinyText: {
          fontSize: 1,
        },
        top: {
          flex: 0.5,
          backgroundColor: "beige",
          borderWidth: 5,
        },
        bottom: {
          flex: 0.5,
          backgroundColor: "pink",
          borderWidth: 5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
    })
    export default WeatherDetailScreen