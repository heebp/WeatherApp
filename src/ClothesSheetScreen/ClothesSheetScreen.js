import React, { useContext, useState,useEffect,useRef} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import { useLayoutEffect } from 'react';
import { WeatherContext } from '../Context/CurrentWeather';
import moment from 'moment';
import { DBContext } from '../Context/DataBase';
import ClothesTag from './ClothesTag';
const Stack = createNativeStackNavigator();

function ClothesSheetScreen({route, navigation}) {
  const db = useContext(DBContext)
  const {item} = route.params
  console.log("아이템")
  //console.log(item)
  const weather = useContext(WeatherContext);
  const nowTime = moment().format('YYYY/MM/DD');
  const [memo, setMemo] = useState('오늘의 메모');
  const [image, setImage] = useState(null); // 이미지 삽입
  const [tags, setTags] = useState() 
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveData = () => {
    console.log("db test")
    try{
      //의상 기록 저장
      db.transaction((tx) => {
        tx.executeSql(`INSERT INTO clothes_sheet(date,weather,temperature,windchill,memo) VALUES(?,?,?,?,?);`,[nowTime.toString().substring(0,10)
        ,weather.currentWeather
       ,Math.round(weather.temp)
       ,Math.round(weather.windchill)
        ,memo],
        //INSERT INTO clothes_sheet_image(date,image) VALUES(`+nowTime.toString().substring(0,16)+`,`+image+`);
          (tx, results) => {
          alert('저장되었습니다.')

          console.log("저장 로그\n"+results)
        },
        (error)=>{
          Alert.alert('이미 등록된 기록이 있습니다.',
          "이 내용으로 수정하시겠습니까?",[{text: "네", onPress: () => updateData()},
          {text: "아니오", onPress: () => console.log("아니오")}])
          console.log('에러발생',error);
        });
      });

        /*
        // 저장된 의상 기록 조회
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM clothes_sheet`,
          [],
          //INSERT INTO clothes_sheet_image(date,image) VALUES(`+nowTime.toString().substring(0,16)+`,`+image+`);
            (tx, results) => {
              console.log("조회 log\n"+results);
              const rows = results.rows;
              let tag = [];
                for (let i=0; i<rows.length; i++) {
                  console.log(rows.item(i));
                  tag.push({
                    ...rows.item(i),
                  });
                  }
            },
          (error)=>{
            console.log('에러발생',error);
          });
        });
        */
    }catch(error){
      console.log(error);
    }    
  }

  const updateAlert=()=>{
    Alert.alert('이미 등록된 기록이 있습니다.',
    "이 내용으로 수정하시겠습니까?",[{text: "네", onPress: () => updateData()},
    {text: "아니오", onPress: () => console.log("아니오")}])
  }

  const updateData = () => {
    try{
      //의상 기록 수정
      db.transaction((tx) => {
        tx.executeSql(`UPDATE clothes_sheet SET memo ='`+memo+`' where date='`+item.date+`';`,
        [],
        //INSERT INTO clothes_sheet_image(date,image) VALUES(`+nowTime.toString().substring(0,16)+`,`+image+`);
          (tx, results) => {
          alert('저장되었습니다.')

          console.log("저장 로그\n"+results)
        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }
  const highfunction= (clothesTags) =>{
    // console.log("상위")
    // console.log(text);
    setTags(clothesTags);
  }
  useEffect(() => {
    if(item!=-1)
    setMemo(item.memo)
    console.log("useEffect")
    console.log(tags)
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
  return(
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={{ width:"90%", backgroundColor:"lightgray",margin:10}}>
      {item === -1 ? (
        <View style={{ alignSelf:"flex-start", margin:10}}>
          <Text>날짜 : {nowTime} </Text>
          <Text>{"\n"}날씨 : {weather.currentWeather}</Text>
          <Text>{ "\n"}온도 : {Math.round(weather.temp)}도</Text>
          <Text>{ "\n"}체감온도 :{Math.round(weather.windchill)}도</Text>
        </View>
      ):(
        <View style={{ alignSelf:"flex-start", margin:10}}>
          <Text>날짜 : {item.date} </Text>
          <Text>{"\n"}날씨 : {item.weather}</Text>
          <Text>{ "\n"}온도 : {item.temperature}도</Text>
          <Text>{ "\n"}체감온도 :{item.windchill}도</Text>
        </View>
        )
      }
      </View>
      <View style={{ width:"90%",height:"40%", backgroundColor:"lightgray",margin:10}}>
        <ClothesTag value={item} propfunction={highfunction}/>
      </View>

    {/*     
    <Button title="사진 불러오기" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />} */}
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(value)=>{setMemo(value)}}
        value={memo}
      /> 
        <View style={{flexDirection:"row", alignSelf:"flex-start"}}>
        {item === -1?( 
          <Button title="저장하기" color="black" onPress={()=>saveData()} />
        ):(
          <Button title="저장하기" color="black" onPress={()=>updateAlert()} />
        )} 

          <Button title="코디 목록" color="black" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  tag:{

  },
  screen:{
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
})

export default ClothesSheetScreen