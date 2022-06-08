import React, {Component,useRef, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useLayoutEffect,useEffect } from 'react';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';
const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

function WeatherDetailScreen({navigation}) {
    const scrollviewRef = useRef()

    console.log("웨더 디테일 렌더 로드")
    useEffect(()=>{

    },[navigation])
      return (
        <View style={styles.screen}>
          <View style={styles.band}>

          </View>
          <View style={styles.band2}>
            <Text style={styles.bandtext}>시간별 날씨</Text>
          </View>
          <View style={styles.hourly}>
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} ref={scrollviewRef}>
              <HourlyWeather style={styles.screen}/>
            </ScrollView>
          </View>
          <View  style={styles.band2}>
            <Text style={styles.bandtext}>주간날씨</Text>
          </View>
          <View style={styles.bottom}>
            <DailyWeather style={styles.screen}/>
          </View>
        </View>
      );
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 2,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
        band:{
          flex:0.4,
          width: Dimensions.get('window').width,
          alignItems: 'flex-start', 
          justifyContent: 'center' ,
          backgroundColor:"darkslateblue"
        },
        band2:{
          flex:0.05,
          width: Dimensions.get('window').width,
          alignItems: 'flex-start', 
          justifyContent: 'center' ,
          backgroundColor:"black"
        },
        bandtext:{
          color:"white",
          fontSize:18,
        },
        tinyText: {
          fontSize: 1,
        },
        hourly: {
          flex: 0.2,
          backgroundColor: "darkslateblue",

          justifyContent:"center",
          alignItems: 'center',
          alignContent:"center",
          
        },
        bottom: {
          flex: 0.5,
          width: Dimensions.get('window').width,
          backgroundColor: "pink",

        },
    })
    export default WeatherDetailScreen