import React, {Component, useState, useRef} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator

} from 'react-native';
import { Text } from "@rneui/themed";
import { useEffect,useLayoutEffect } from 'react';
import axios from 'axios'
import moment from 'moment';
import 'moment/locale/ko';
import SQLite from 'react-native-sqlite-storage';
import {API_KEY, GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'
const Stack = createNativeStackNavigator();

function WeatherHomeScreen({navigation}) {
  const scrollviewRef = useRef()
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [customImages, setCustomImages] = useState('');
  const [windchill, setWindchill] = useState('');
  const [error, setError] = useState(false);
  const [airPollution,setAirPollution] = useState('');
  const lat = 38;
  const lon = 128;
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  //const API_KEY = "914812757d39d05d77da90e5c6bd8ad2";
 // const GOOGLE_CUSTOM_API_KEY = "AIzaSyDYXdyEvLH7O0d3NPHxfueSPuZgoc4RKfY";
  //const SEARCH_ENGINE = "61faa79a8971472e2";
  const SEARCH_WORD = "청바지 맨투맨";
  const getImage = async (SEARCH_WORD) => {
  console.log(SEARCH_WORD);
     //const imageSearch = await fetch(
     //   `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_CUSTOM_API_KEY}&cx=${SEARCH_ENGINE}&q=${SEARCH_WORD}`
     //);
//  const resimage = await imageSearch.json()
//    // //console.log(resimage.error.code)
//    // //const _image = resimage.items[0].pagemap.cse_image[0].src
//    // //console.log(_image);


  // setCustomImages(resimage.items)
 
}
const getWeather = async (lat, lon) => {
  try {
    const resWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    
    const resPollution = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    let _main = resWeather.data.weather[0].main;
    let _temp = resWeather.data.main.temp;
    let _windchill = resWeather.data.main.feels_like;
    let _airPollution = resPollution.data.list[0].main.aqi;
    setCurrentWeather(_main);
    setTemp(_temp);
    setWindchill(_windchill);

    setAirPollution(_airPollution);
    getData(_temp);

  } catch (error) {
    Alert.alert("날씨 정보를 읽어올 수 없습니다.")
    setError(true);
    
  } finally {
    setIsLoading(false);
  }
};
const prevButtonHandler = index => {
  // scrollviewRef.current.scrollTo({
  //   x: index * width,
  //   animation: false
  // })
}
const nextButtonHandler = () => {

}

const [tag, setTag] = useState([]);

const db = SQLite.openDatabase(
  {
      name: 'PSP3.db',
      location: 'default',
      createFromLocation: 1,
  },
  (db) => {
      console.log('불러오기 성공',);
  },
  (error) => {
      console.log('에러발생: ', error);
  });
const getData = (temp) => {
  //console.log(temp)
  var temperature = Math.round(temp)
  //console.log(temperatue)
  try{
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM clothes_tag WHERE highTemp>=`+ temperature+` AND `+ temperature +`>=lowTemp;`,[],  (tx, results) => {
        console.log("aaaaaa");
        console.log(results)
          const rows = results.rows;
          let tag = [];
          for (let i=0; i<rows.length; i++) {
              console.log(rows.item(i));
              tag.push({
                  ...rows.item(i),
              });
          }
          setTag(tag);
      },
      (error)=>{
        console.log('에러발생',error);
      });
    });
  }catch(error){
    console.log(error);
  }
}
  useEffect(() => {
    getWeather(lat, lon);
    getImage(SEARCH_WORD);
  }, []);
  
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft: () => (
        <Button
        title="Category"
        onPress={ () => navigation.navigate('Category')}
      />
      ),
    })
  })
const test = (test) => {
  console.log(test)
}
 return (
    <View style={styles.screen}>
          {isLoading || error
        ? <Text> Waiting.. </Text>
        : (
          <>
          <View style={styles.top}>
            <Text style={styles.middletext}>{nowTime.toString().substring(0,16)}</Text> 
            <Text style={styles.bigtext}> {Math.round(temp)+"ºC"} </Text>
            <Text style={styles.middletext}> 미세먼지 : {airPollution}</Text>
          {/* <Text> 날씨 : {currentWeather} </Text>
          <Text> 체감온도 : {Math.round(windchill)}</Text> */}
          </View>
          {/* 수정중 */}
          <View style={styles.middle}>
            <View style={styles.middlebutton}>
              <TouchableOpacity onPress={prevButtonHandler}>
                <Text>prev</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} ref={scrollviewRef}>
              {customImages.length === 0 ? (
                <View>
                  <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large"/>
                </View>
                 ) : (
                  customImages.map((customImage, index) => (
                    <View key={index}>
                      <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage} source={customImage.pagemap.cse_image == undefined ? require('./test.jpg') : {uri:customImage.pagemap.cse_image[0].src}}/>
                      </View>
                    </View>
                  ))
              )}
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
            {
            tag.map((item) => (
              <TouchableOpacity key={item.tagNum} style={styles.button} onPress={()=> getImage(item.tagName)}>
                <Text key={item.tagNum}>{item.tagName}</Text>
              </TouchableOpacity>    
              ))
            }
            </View>
          </View>
          </>
        ) 
      }
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