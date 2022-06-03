import React, { useState, useRef, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Text } from "@rneui/themed";
import { useEffect,useLayoutEffect } from 'react';
import Moment from 'react-moment'
import 'moment/locale/ko';
import {API_KEY, GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'
import { WeatherContext } from '../Context/CurrentWeather';
import GetTag from './GetTag';
import GetImages from './GetImage';
import GetTime from './GetTime';
Moment.startPooledTimer(1000);
const Stack = createNativeStackNavigator();
function WeatherHomeScreen({navigation}) {
  console.log("WeatherHOmeScreen 실행")
  const weather = useContext(WeatherContext);
  const scrollviewRef = useRef()
  const [searchWord, setSearchWord] = useState('');
  //const [customImages, setCustomImages] = useState('');
  //const SEARCH_WORD = "청바지 맨투맨";
//구현 중
const prevButtonHandler = index => {
  // scrollviewRef.current.scrollTo({
  //   x: index * width,
  //   animation: false
  // })
}
//구현 중
const nextButtonHandler = () => {

}
  useEffect(() => {
    console.log("WeatherHomeScreen 값 : "+weather.temp)
    //getImages(SEARCH_WORD);
    //ssw(searchWord);
  }, []);
  
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
        title="Category"
        onPress={ () => navigation.navigate('Category')}>
          <Image source={ require('../images/categoryButton.png') } style={ { width: 30, height: 30, } } />
        </TouchableOpacity>
      ),
    })
  })
  // 하위 컴포넌트 값 받아오기
  const highfunction= (text) =>{
    console.log(text);
    setSearchWord(text)
  }
 return (
    <View style={styles.screen}>
          <>
          <View style={styles.top}>
            <GetTime/>
          {/* <Moment interval={1000} format="YYYY-MM-DD HH:mm" style={styles.middletext} element={Text} >{nowTime1}</Moment> */}
            {/* <Text style={styles.middletext}>{nowTime.toString().substring(0,16)}</Text>  */}
            <Text style={styles.bigtext}> {Math.round(weather.temp)+"ºC"} </Text>
            <Text style={styles.middletext}> 미세먼지 : {weather.airPollution}</Text>
          {/* <Text> 날씨 : {weather.currentWeather} </Text>
          <Text> 체감온도 : {Math.round(weather.windchill)}</Text> */}
          </View>
          {/* next prev 버튼 수정중 */}
          <View style={styles.middle}>
            <View style={styles.middlebutton}>
              <TouchableOpacity onPress={prevButtonHandler}>
                <Text>prev</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} ref={scrollviewRef}>
                <GetImages value={searchWord}/> 
              </ScrollView>
            </View>
            <View style={styles.middlebutton} >
              <TouchableOpacity onPress={nextButtonHandler}>
                <Text>next</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={styles.buttonlayout}>
                <GetTag value={weather.temp} propfunction={highfunction}/>
            </View>
          </View>
          </>
    </View>
    );
  }
  
const styles = StyleSheet.create({
    screen:{
      flex: 1,
      alignItems: 'center',
      justifyContent: "space-between",
    },
    flexlayout:{
      flexDirection:"row",
      justifyContent: 'space-between'
    },
    header:{
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    middletext:{
      fontSize:20
    },
    bigtext:{
      fontSize: 40
    },
    cardImage: {
      width: 200,
      height: 300,
    },
    cardImageContainer:{
      alignItems: 'center', 
      justifyContent: 'center',
    },
    cardContainer:{
      flex:0.5,
      flexDirection: 'row',
      borderColor: 'black',
      borderWidth: 3,
      borderStyle: 'solid',
      borderRadius: 20,
      width:200,
      height: 300,
    },
    buttonlayout:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button:{
      width: 80,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:3,
    },
    top: {
      flex: 0.2,
      alignItems: 'center',
      backgroundColor: "grey",
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    middle: {
      flex: 0.6,
      backgroundColor: "beige",
      flexDirection:"row",
      borderWidth: 5,
    },
    middlebutton:{
      flex:0.1,alignItems:"center",justifyContent:"center"
    },
    bottom: {
      flex: 0.1,
      backgroundColor: "pink",
      borderWidth: 5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
})
  export default WeatherHomeScreen;