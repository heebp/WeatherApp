import React, {} from 'react';
import {
  Text,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';

function WeatherIcon(props){
    const icons ={
        Clear : "day-sunny",
        Clouds : "cloudy",
        Rain : "rain",
        Atomosphere : "",
        Snow : "snow",
        Drizzle : "",
        Thunderstorm : "",
    }
    return(
        <Text>
            <Fontisto name={icons[props.value]} color="white"size={30}/>
        </Text>
    )
}

export default WeatherIcon