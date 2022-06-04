import React, {Component,useLayoutEffect, useState,useEffect, useContext} from 'react';
import { NavigationContainer, useNavigation,useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { DBContext } from '../Context/DataBase';

function SheetList({navigation}) {
  const db = useContext(DBContext)
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [sheet, setSheet] = useState([]);
  const [catags, setCatags] = useState([])
  
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

  const loadSheet=()=>{
    db.transaction((tx) => {
      tx.executeSql(`SELECT clothes_sheet.date, weather,group_concat(categoryName) categories,group_concat(tagName) tags,temperature,windchill,memo FROM clothes_sheet 
      LEFT JOIN sheet_tag on clothes_sheet.date = sheet_tag.date 
      LEFT JOIN clothes_tag on clothes_tag.tagNum = sheet_tag.tagNum 
      GROUP BY clothes_sheet.date
      `,
      [],
        (tx, results) => {
          console.log("조회 log:"+results);
          const rows = results.rows;
          console.log("조회 log:"+rows.length);
          let temp = [];
            for (let i=0; i<rows.length; i++) {
              console.log(rows.item(i));
              temp.push({
                ...rows.item(i),
                i
              });
            }
        setSheet(temp)
        //console.log(sheet)
        },
      (error)=>{
        console.log('에러발생',error);
      });
    });
  }
  useEffect(()=>{
    loadSheet();
},[isFocused])


const renderItem = ({ item, index }) => (
  <TouchableOpacity key={item.i} style={{marginTop:40, marginLeft:35, width:150, height:180, backgroundColor: 'lightgray'}} onPress={()=> navigation.navigate('ClothesSheet',{item:item})}>
  {/* <Text>{item.i}</Text> */}
    <Text>날짜 : {item.date}</Text>
    <Text >날씨 : {item.weather}</Text>
    <Text >기온 : {item.temperature}</Text>
    <Text >체감온도 : {item.windchill}</Text>
    <Text> 태그 : {item.tags}</Text>
{/* 
    ------------db값 spilit()함수 적용안됨------------ 
    <Text>상의 : {item.tags}</Text>
    <Text >하의 : </Text>
    <Text >겉옷 : </Text>
*/}
    <Text >오늘의 메모 : {item.memo}</Text>
    <StatusBar  style="black"/>
  </TouchableOpacity> 
);

      return (

        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <View style={{flexDirection: 'row'}}>  
             <View  style={{marginTop:20, marginLeft:20}}>
              <DropDownPicker
              open={open}
              value={value}
              setOpen={setOpen}
              setValue={setValue}
              placeholder="날씨순"
              items={[
                { label: "맑음", value: "sun" },
                { label: "흐림", value: "cloudy" },
                { label: "비", value: "rain" },
                { label: "눈", value: "snow" }
              ]}
              defaultIndex={0}
              containerStyle={{height:30}}
              onChangeItem={(item) => setSelectedEmail(item.value)}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownMaxHeight={200}
   
              style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                width: 90,
              }}
              dropDownStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: 'green',
              }}
              /> 
              </View>
  
              <View style={styles.container}>
                <Button
                title="추가하기"
                color="black"
                onPress={() => navigation.navigate('ClothesSheet',{item: -1})}
                />
              </View>
            </View> 
              <FlatList
                key={'#'}
                data={sheet}
                renderItem={renderItem}
                // keyExtractor={(sheet) => sheet.id}
                numColumns={2}
              />
          </View>
        </View>  

      );
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
    })
    export default SheetList