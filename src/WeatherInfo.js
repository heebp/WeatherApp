import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert

} from 'react-native';
import axios from 'axios'
const API_KEY = "914812757d39d05d77da90e5c6bd8ad2";
const lat = 38;
const lon = 128;
const CurrentWeather = async ({lat, lon}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [error, setError] = useState(false);
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
      return(
        <View>
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
        )
 
  }
  CurrentWeather.propTypes = {
    currentWeather: PropTypes.string.isRequired,
    temp: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };
  export default CurrentWeather