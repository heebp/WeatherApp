import React, {Component, useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';
import {API_KEY} from '@env'

function HourlyWeather() {
const [hours, setHours] = useState([]);
const lat = 38;
const lon = 128;
const test = "true"
const getForecastWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,current,minutely,daily&appid=${API_KEY}&units=metric`
  );
  const json = await response.json();
  setHours(json.hourly);
};
 
  useEffect(() => {
    getForecastWeather(lat, lon);
  }, []);
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
          hours.slice(0,7).map((hour, index) => (
            <View key={index} style={styles.hour}>
              <Text style={styles.tinytext}>{new Date(hour.dt * 1000).toString().substring(16, 18)}</Text> 
              <Text style={styles.tinytext}>{hour.weather[0].main}</Text>
              <Text style={styles.tinytext}>{parseInt(hour.temp)}</Text>
              {/* <Text style={styles.tinytext}>{hour.weather[0].description}</Text> */}
              <Text style={styles.tinytext}>{hour.rain == undefined ? '0mm' : Math.round(hour.rain*100)+"mm"}</Text>
            </View>

          ))
          }
          </View>
        )}
        
        </View>
      );
    }
    const styles = StyleSheet.create({
      hours:{
        flexDirection:"row"
      },
        hour:{
          flexDirection: "column",
          borderWidth: 1,
        },
        tinyText: {
          fontSize: 1,
        },
    })
    export default HourlyWeather