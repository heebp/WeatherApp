import React, { useState, useContext,} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';
import {API_KEY} from '@env'
import { LocationContext } from '../Context/CurrentLocation';
import {useIsFocused } from '@react-navigation/native';
import 'moment/locale/ko'
import WeatherIcon from '../assets/WeatherIcon';

function HourlyWeather() {
const isFocused = useIsFocused()
const [hours, setHours] = useState([]);
const location = useContext(LocationContext);

const getForecastWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,current,minutely,daily&appid=${API_KEY}&units=metric`
  );
  const json = await response.json();
  setHours(json.hourly);
};

useEffect(() => {
  getForecastWeather(location.lat, location.lng);
}, [isFocused]);

      return (
        <View style={styles.screen}>
          {hours.length === 0 ? (
          <View>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          <View style={styles.hours}>{
          hours.slice(0,12).map((hour, index) => (
            <View key={index} style={styles.hour}>
              <Text style={styles.tinytext}>{new Date(hour.dt * 1000).toString().substring(16, 18)}시</Text> 
                <WeatherIcon size={30} value={hour.weather[0].main} color="white"/>
{/*                 
              <Text style={styles.tinytext}>
                {hour.weather[0].main}
              </Text>
               */}
              <Text style={styles.tinytext}>{parseInt(hour.temp)}도</Text>
              {/* <Text style={styles.tinytext}>{hour.weather[0].description}</Text> */}
              <Text style={styles.tinytext}>{hour.rain == undefined ? '0mm' : Math.round(hour.rain['1h']*100)+"mm"}</Text>
            </View>
          ))
          }
          </View>
        )}
        </View>
      );
    }
    const styles = StyleSheet.create({
      screen:{
        justifyContent:"center"
      },

      bandtext:{
        color:"white"
      },
      hours:{
        flexDirection:"row"
      },
      hour:{
        width:70
      },
      tinytext: {
        color:"white",
        margin:2,
        fontSize: 15,
      },
    })
    export default HourlyWeather