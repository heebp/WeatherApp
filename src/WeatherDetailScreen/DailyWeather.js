import React, {Component, useState, useContext,useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused } from '@react-navigation/native';
import {API_KEY} from '@env'
import { LocationContext } from '../Context/CurrentLocation';
import WeatherIcon from '../assets/WeatherIcon';
const Stack = createNativeStackNavigator();

function DailyWeather(props) {
const isFocused = useIsFocused()
const location = useContext(LocationContext);
const [days, setDays] = useState([]);
const getForecastWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,current,minutely,hourly,&appid=${API_KEY}&units=metric`
  );
  const json = await response.json();
  //console.log(json.daily)
  setDays(json.daily);
      
};
function getTodayLabel(time){
  var week = new Array('일','월','화','수','목','금','토');
  var today = new Date(time).getDay();
  var todayLabel = week[today];
  return todayLabel;
}
  useEffect(() => {
    getForecastWeather(location.lat, location.lng);
  }, [isFocused]);
  
      return (
        <View style={styles.screen}>
          {days.length === 0 ? (
          <View>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            /> 
          </View>
        ) : (
            <View style={styles.days}>{
           days.slice(0,7).map((day, index) => (
             <View key={index} style={styles.day}>
                <Text style={styles.tinytext}>{getTodayLabel(day.dt*1000)}</Text> 
                  <WeatherIcon size={30} value={day.weather[0].main} color="white"/>
                <Text style={styles.description}>
                  {day.weather[0].main}
                </Text>
                <Text style={styles.high}>{parseInt(day.temp.max)}도</Text>
                <Text style={styles.low}>{parseInt(day.temp.min)}도</Text>
                <Text style={styles.description}>{day.rain == undefined ? "0mm":Math.round(day.rain*100)+"mm"}</Text>
             </View>
           ))
        }
        </View>
        )}
        </View>
      );
    }
    const styles = StyleSheet.create({
        days:{
            flexDirection: "row",
        },
        day:{
          width:58
        },
        tinytext:{
          color:"white",
        },
        high:{
          color:"red"
        },
        low:{
          color:"blue"
        },
        description:{
          color:"white"
        }
    })
    export default DailyWeather