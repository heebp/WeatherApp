import React, {Component,useRef, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useEffect } from 'react';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';

function WeatherDetailScreen({navigation}) {
    const scrollviewRef = useRef()
    useEffect(()=>{

    },[navigation])
      return (
        <View style={styles.screen}>
          <ImageBackground source={require("../assets/images/bg.jpg")} resizeMode="cover">
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
          </ImageBackground>
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
          //backgroundColor:"darkslateblue"
        },
        band2:{
          flex:0.07,
          width: Dimensions.get('window').width,
          alignItems: 'flex-start', 
          justifyContent: 'center' ,
          backgroundColor:"black",
          borderWidth: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        bandtext:{
          color:"white",
          fontSize:18,
        },

        hourly: {
          flex: 0.3,
          backgroundColor: "darkslateblue",
          marginBottom:40,
          justifyContent:"center",
          alignItems: 'center',
          alignContent:"center",
          borderWidth: 5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        bottom: {
          flex: 0.4,
          marginBottom:40,
          width: Dimensions.get('window').width,
          backgroundColor: "gray",
          borderWidth: 5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
    })
    export default WeatherDetailScreen