import React, { useContext, useState,useEffect,useRef} from 'react';
import { NavigationContainer, useNavigation,useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import { WeatherContext } from '../Context/CurrentWeather';
import moment from 'moment';
import { DBContext } from '../Context/DataBase';
import ClothesTag from './ClothesTag';
import WeatherIcon from '../assets/WeatherIcon';
import ClothesImage from './ClothesImage';

function ClothesSheetScreen({route, navigation}) {
  const db = useContext(DBContext)
  const {item} = route.params
  const weather = useContext(WeatherContext);
  const nowTime = moment().format('YYYY/MM/DD');
  const [memo, setMemo] = useState('오늘의 메모');
  const [image, setImage] = useState(null); // 이미지 삽입
  const [tags, setTags] = useState() 
  

  const saveData = () => {
    try{
      //의상 기록 저장
      db.transaction((tx) => {
        tx.executeSql(`INSERT INTO clothes_sheet(date,weather,temperature,windchill,memo) VALUES(?,?,?,?,?);`,
        [nowTime.toString().substring(0,10),weather.currentWeather,Math.round(weather.temp),Math.round(weather.windchill),memo],
          (tx, results) => {
          inserClothesTag()
          insertImage()
          alert('저장되었습니다.')
          console.log("저장 로그->")
          console.log(results)
        },
        (error)=>{
          
          Alert.alert('오늘 이미 등록된 기록이 있습니다.',
          "이 내용으로 수정하시겠습니까(수정중)?",[{text: "네", onPress: () => console.log("네")/*updateData()*/},
          {text: "아니오", onPress: () => console.log("아니오")}])
          
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }    
  }

  const updateAlert=()=>{
    Alert.alert('이미 등록된 기록이 있습니다.',
    "이 내용으로 수정하시겠습니까?",[{text: "네", onPress: () => updateData(nowTime)},
    {text: "아니오", onPress: () => console.log("아니오")}])
  }

  const updateData = () => {
    try{
      //의상 기록 수정
      db.transaction((tx) => {
        tx.executeSql(`UPDATE clothes_sheet SET memo ='`+memo+`' where date='`+item.date+`';`,
        [],
          (tx, results) => {
            inserClothesTag()
            insertImage()

          alert('저장되었습니다.')
        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }

  const inserClothesTag=()=>{
    deleteTag()
    //clothes_tag에 추가
    for(let j = tags.length-1; j>-1; j-- ){
      try{
        db.transaction((tx) => {
          tx.executeSql(`INSERT INTO clothes_tag(tagName,categoryName) VALUES(?,?)`,
          [tags[j].tagName,tags[j].categoryName],
            (tx, results) => {
              insertSheetTag(results.insertId)
            },
          (error)=>{
            console.log('에러발생',error);
          });
        });
      }catch(error){
        console.log(error);
      }
    }  
  }
  const insertImage=()=>{
    var date 
    if(item.date == null || item.date == undefined){
      date = nowTime
    }else{
      date = item.date
    }
    deleteImage()
    //clothes_tag에 추가
    for(let j = image.length-1; j>-1; j-- ){
      try{
        db.transaction((tx) => {
          tx.executeSql(`INSERT INTO clothes_sheet_image(date,image) VALUES(?,?)`,
          [date,image[j]],
            (tx, results) => {
            },
          (error)=>{
            console.log('에러발생',error);
          });
        });
      }catch(error){
        console.log(error);
      }
    }  
  }
  const deleteImage=()=>{
    try{
      db.transaction((tx) => {
        tx.executeSql(`DELETE from clothes_sheet_image WHERE clothes_sheet_image.date ='`+item.date+`';`,
        [],
          (tx, results) => {

        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }
  //sheet_tag 추가
  const insertSheetTag=(tagNum)=>{
    var date 
    if(item.date == null || item.date == undefined){
      date = nowTime
    }else{
      date = item.date
    }
    try{
      db.transaction((tx) => {
        tx.executeSql(`INSERT INTO sheet_tag(date,tagNum) VALUES(?,?)`,
        [date,tagNum],
          (tx, results) => {

          },
        (error)=>{
          console.log('에러발생',error);
        });
        
      });
    }catch(error){
      console.log(error);
    }
  }
  //태그 삭제
  const deleteTag = () => {
    try{
      db.transaction((tx) => {
        tx.executeSql(`DELETE from sheet_tag WHERE sheet_tag.date 
        IN( SELECT sheet_tag.date from sheet_tag LEFT JOIN clothes_tag on sheet_tag.tagNum = clothes_tag.tagNum WHERE sheet_tag.date='`+item.date+`' );`,
        [],
          (tx, results) => {

        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }
  const tagHighfunction= (clothesTags) =>{
    setTags(clothesTags);
  }

  const imageHighfunction= (imageSource) =>{
    setImage(imageSource)
 }
  useEffect(() => {
    //저장된 db가 있다면 -< db memo을 initialize
    if(item!=-1){
      setMemo(item.memo)
    }
  }, [item]);

  return(
    <View style={styles.screen}>
      <View style={styles.sheethead}>
      {item === -1 ? (
        <View style={styles.sheet}>
          <Text>날짜 : {nowTime} </Text>
          <Text>날씨 : 
            <WeatherIcon value={weather.currentWeather}/>
            {/*weather.currentWeather*/}
          </Text>
          <Text>온도 : {Math.round(weather.temp)}도</Text>
          <Text>체감온도 :{Math.round(weather.windchill)}도</Text>
        </View>
      ):(
        <View style={styles.sheet}>
          <Text>날짜 : {item.date} </Text>
          <Text>날씨 : 
            <WeatherIcon value={item.weather} size={20}/>
            {/*item.weather*/}
          </Text>
          <Text>온도 : {item.temperature}도</Text>
          <Text>체감온도 :{item.windchill}도</Text>
        </View>
        )
      }
      </View>
      <View style={styles.tagcontainer}>
        <ClothesTag value={item} propfunction={tagHighfunction}/>
      </View>
      <View style={styles.imagecontainer}>
        <ClothesImage value={item} propfunction={imageHighfunction}/>
      </View>
    
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(value)=>{setMemo(value)}}
        value={memo}
      /> 
        <View style={{flexDirection:"row", alignSelf:"flex-end"}}>
        {item == -1?( 
          <Button title="저장하기" color="black" onPress={()=>saveData()} />
        ):(
          <Button title="저장하기" color="black" onPress={()=>updateAlert()} />
        )} 
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screen:{
    flex: 1,
    alignItems:'center'
  },
  sheethead:{
    width:"90%",
    backgroundColor:"lightgray",
    borderRadius:20,
    margin:10,
    elevation: 8,
  },
  sheet:{
    alignSelf:"flex-start",
    margin:10
  },

  tagcontainer:{
    width:"90%",
    height:"40%", 
    backgroundColor:"lightgray",
    margin:10,
    borderRadius:20,
    elevation: 8,
  },
  tag:{

  },
  imagecontainer:{
    width:380
  },
  input: {
    borderWidth: 1,
    width:380,
    marginTop:20,
    
  },
})

export default ClothesSheetScreen