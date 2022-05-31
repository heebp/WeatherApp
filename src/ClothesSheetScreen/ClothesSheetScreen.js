import React, { useContext, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useLayoutEffect } from 'react';
import { WeatherContext } from '../Context/CurrentWeather';
import moment from 'moment';
const Stack = createNativeStackNavigator();

function ClothesSheetScreen({navigation}) {
  const weather = useContext(WeatherContext);
  console.log(weather)
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const [isChecked, setChecked] = useState(false); // 태그 체크
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [memo, setMemo] = useState('오늘의 메모');
  const [image, setImage] = useState(null); // 이미지 삽입
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
    //

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
            "이 내용으로 수정하시겠습니까?",[{text: "네", onPress: () => console.log("네")},
            {text: "아니오", onPress: () => console.log("아니오")}])
            console.log('에러발생',error);
          });
        });

        
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
      }catch(error){
        console.log(error);
      }



    }
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
      return(
        <View style={{ flex: 1, alignItems: 'center'}}>
        <Text>{ "\n"}{ "\n"}</Text>
        <Text>날짜 : 2022/5/24</Text>
        <Text>{"\n"}날씨 : {weather.currentWeather}</Text>
        <Text>{ "\n"}온도 : {Math.round(weather.temp)}도</Text>
        <Text>{ "\n"}체감온도 :{Math.round(weather.windchill)}도</Text>
        <Text>{ "\n"}{ "\n"}</Text>
    
        {/* <View style={styles.section}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
            <Text style={styles.paragraph}>상의 태그 </Text>
      
    
            <Checkbox style={styles.checkbox} value={isChecked2} onValueChange={setChecked2} />
            <Text style={styles.paragraph}>하의 태그 </Text>
         
    
            <Checkbox style={styles.checkbox} value={isChecked3} onValueChange={setChecked3} />
            <Text style={styles.paragraph}>겉옷 태그</Text>
        </View> */}
    
        <Text>{ "\n"}{ "\n"}</Text>
{/*     
        <Button title="사진 불러오기" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />} */}
    
       <TextInput
            style={styles.input}
            onChangeText={(value)=>{
              setMemo(value)
            }}
            value={memo}
        /> 
    
        <Button title="저장하기" color="black" onPress={saveData} />
        <Text>{ "\n"}</Text>
        <Button title="코디 목록" color="black" onPress={() => navigation.goBack()} />
        </View>
      )
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
    })
    export default ClothesSheetScreen