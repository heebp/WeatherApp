import React, { useState, useRef, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Text } from "@rneui/themed";
import { useEffect } from 'react';
import { WeatherContext } from '../Context/CurrentWeather';
import GetTag from './GetTag';
import GetImages from './GetImage';
import GetTime from './GetTime';
import WeatherIcon from '../assets/WeatherIcon';

const WeatherHomeStack = createNativeStackNavigator();
function WeatherHomeScreen() {
  const weather = useContext(WeatherContext);
  const scrollviewRef = useRef()
  const [searchWord, setSearchWord] = useState('');
  const airStatus ={
    1 : "매우좋음",
    2 : "좋음",
    3 : "보통",
    4 : "나쁨",
    5 : "매우나쁨",
}

  useEffect(() => {

  }, []);
  
  const highfunction= (text) =>{
    setSearchWord(text)
  }

 return (
    <View style={styles.screen}>
      <ImageBackground source={require("../assets/images/bg.jpg")} resizeMode="cover">
        {weather.value ==='' ?(
          <View>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ):(
          <View style={styles.containter}>
            <View style={styles.top}>
              <View style={styles.toptime}>
                <GetTime/>
              </View>
              <View style={styles.toptemp}>
               <WeatherIcon size={70} value={weather.currentWeather} color="white" />
               {/* <Text>{weather.currentWeather}</Text> */}
               <Text style={styles.middletext}> 미세먼지 : {airStatus[weather.airPollution]}</Text>
             </View>
              <Text style={styles.bigtext}> {Math.round(weather.temp)+"ºC"} </Text>
            {/*<Text> 체감온도 : {Math.round(weather.windchill)}</Text> */}
            </View>
            {/* next prev 버튼 수정중 */}
            <View style={styles.middle}>
              <View style={styles.cardContainer}>
                <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} ref={scrollviewRef}>
                  <GetImages value={searchWord}/> 
                </ScrollView>
              </View>
            </View>

            <View style={styles.bottom}>
              <View style={styles.buttonlayout}>
                <GetTag value={weather.temp} propfunction={highfunction}/>
              </View>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>

    );
  }
  
const styles = StyleSheet.create({
    screen:{
      flex: 1,
      alignItems: 'center',
      justifyContent: "space-between",
    },
    top: {
      flex: 0.2,
      width: Dimensions.get('window').width,
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
    },
    toptime:{
      marginLeft:10,
    },
    toptemp:{
      alignItems:"center",
      flexDirection:"column"
    },
    middletext:{
      fontSize:20,
      color:"silver"
    },
    bigtext:{
      fontSize: 40,
      marginLeft:10,
      color:"white"
    },

    cardContainer:{
      flexDirection: 'row',
      borderColor: 'black',
      borderWidth: 5,
      borderStyle: 'solid',
      borderRadius: 20,
      width:252,
      height: 352,
    },
    buttonlayout:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    middle: {
      flex: 0.7,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      alignContent:"center",

    },
    bottom: {
      flex: 0.1,
      
    },
})
  export default WeatherHomeScreen;