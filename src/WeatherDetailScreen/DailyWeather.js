import React, {Component, useState, useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';
import {API_KEY} from '@env'
import { LocationContext } from '../Context/CurrentLocation';
const Stack = createNativeStackNavigator();

function DailyWeather(props) {
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
  useEffect(() => {
    console.log("데일리 웨더 리렌더링")
    getForecastWeather(location.lat, location.lng);
  }, []);
  
      return (
        <View style={styles.screen}>
          {days.length === 0 ? (
          <View>
            {/* <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            /> */}
          </View>
        ) : (
            <View style={styles.days}>{
           days.slice(0,7).map((day, index) => (
             <View key={index} style={styles.day}>
               <Text style={styles.tinytext}>{new Date(day.dt * 1000).toString().substring(0, 3)}</Text> 
               <Text style={styles.description}>{day.weather[0].main}</Text>
               <Text style={styles.description}>{parseInt(day.temp.max)}</Text>
               <Text style={styles.description}>{parseInt(day.temp.min)}</Text>
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
          borderWidth: 1,
        },
        tinyText: {
          fontSize: 1,
        },
    })
    export default DailyWeather