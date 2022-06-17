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
import WeatherIcon from '../assets/WeatherIcon';
import { WeatherContext } from '../Context/CurrentWeather';
function SheetList({navigation}) {
  
  const db = useContext(DBContext)
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [sheet, setSheet] = useState([]);
  const [tempSheet, setTempSheet] = useState([])
  const weather = useContext(WeatherContext);

  const loadSheet=()=>{
    db.transaction((tx) => {
      tx.executeSql(`SELECT clothes_sheet.date, weather,group_concat(categoryName) categories,group_concat(tagName) tags,temperature,windchill,memo FROM clothes_sheet 
      LEFT JOIN sheet_tag on clothes_sheet.date = sheet_tag.date 
      LEFT JOIN clothes_tag on clothes_tag.tagNum = sheet_tag.tagNum 
      GROUP BY clothes_sheet.date Order by clothes_sheet.date desc
      `,
      [],
        (tx, results) => {
          const rows = results.rows;
          let temp = [];
            for (let i=0; i<rows.length; i++) {
              temp.push({
                ...rows.item(i),
                i
              });
            }
            if(JSON.stringify(temp)!=JSON.stringify(sheet))
              setSheet(temp)
            setTempSheet(temp)
        },
      (error)=>{
        console.log('에러발생',error);
      });
    });
  }

  const sortByWeather = (weather) =>{
    setSheet(tempSheet.filter((sheet)=>sheet.weather == weather))
  }

  const sortByTemp = (value) =>{
    if(value=="higher"){
      setSheet(tempSheet.sort(function (a,b){
        if(a.temperature > b.temperature){
          return -1
        }
        if(a.temperature < b.temperature){
          return 1
        }
        return 0
      }))
    }
    if(value=="lower"){
      setSheet(tempSheet.sort(function (a,b){
        if(a.temperature > b.temperature){
          return 1
        }
        if(a.temperature < b.temperature){
          return -1
        }
        return 0
      }))
    }
    if(value=="similar"){
      const temp = Math.round(weather.temp)
      setSheet(tempSheet.sort(function (a,b){
        if(a.temperature >temp && b.temperature< temp){
          return 1
        }
        if(a.temperature <temp && b.temperature> temp){
          return -1
        }
        return (Math.abs(temp-a.temperature) - Math.abs(temp-b.temperature))
      }))
    }
  }

  useEffect(()=>{ 
    loadSheet();

},[isFocused])


const renderItem = ({ item, index }) => (
  <TouchableOpacity key={item.i} style={styles.sheet} onPress={()=> navigation.navigate('ClothesSheet',{item:item})}>
    <View style={styles.sheetcontainer}>
  {/* <Text>{item.i}</Text> */}
    <Text style={styles.sheetdate}>날짜 : {item.date}</Text>
    <Text>날씨 :
      <WeatherIcon value={item.weather} size={20} />
    </Text>
    <Text>기온 : {item.temperature} 도</Text>
    <Text>체감온도 : {item.windchill} 도</Text>
    <Text>의상 태그 : &lt;{item.tags}&gt;</Text>
{/* 
    ------------db값 spilit()함수 적용안됨------------ 
    <Text>상의 : {item.tags}</Text>
    <Text >하의 : </Text>
    <Text >겉옷 : </Text>
*/}
    <Text>메모 :  {item.memo} </Text>
    <StatusBar  style="black"/>
    </View>
  </TouchableOpacity> 
);

      return (

        <View style={{flex:1}}>
            <View style={{flexDirection: 'row'}}>  
             <View  style={{ marginLeft:20}}>
              <DropDownPicker
                  style={styles.dropDown}
                  placeholder="날씨순"
                  items={[
                    { label: <WeatherIcon value={"Clear"} size={25} /> , value: "Clear" },
                    { label: <WeatherIcon value={"Clouds"} size={25}/>, value: "Clouds" },
                    { label: <WeatherIcon value={"Rain"} size={25}/>, value: "Rain" },
                    { label: <WeatherIcon value={"Snow"} size={25}/>, value: "Snow" }
                  ]}
                  defaultIndex={0}
                  containerStyle={{width: 100, height:0 ,marginLeft:20}}
                  onChangeItem={(value) => setSelected(value)}
                  onSelectItem={(item)=>sortByWeather(item.value)}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownMaxHeight={10}
                  
                  open={open}
                  value={value}
                  setOpen={setOpen}
                  setValue={setValue}
                  
                  dropDownStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    backgroundColor: 'green',
                  }}
                /> 
              <DropDownPicker
                style={styles.dropDown2}
                placeholder="온도순"
                  items={[
                    { label: "높은순", value: "higher" },
                    { label: "낮은순", value: "lower" },
                    { label: "비슷한순", value: "similar" },
                  ]}
                  defaultIndex={0}
                  containerStyle={{width: 100, marginLeft:140}}
                  onChangeItem={(item) => setSelected2(item.value)}
                  onSelectItem={(item)=>sortByTemp(item.value)}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownMaxHeight={10}
        
                  open={open2}
                  value={value2}
                  setOpen={setOpen2}
                  setValue={setValue2}
        
                  dropDownStyle2={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    backgroundColor: 'green',
                  }}
              />

             </View>
              
             <View style={styles.button}>
                <TouchableOpacity
                color="white"
                onPress={() => navigation.navigate('ClothesSheet',{item: -1})}
                >
                  <Text style={styles.buttontext}>추가하기</Text>
                </TouchableOpacity>
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
      );
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center', 
        },
        dropDown : {

          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          width: 100,
          zIndex: 10
        },
        dropDown2 : {

          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          width: 100,
          zIndex: 10
        },
        button : {
          marginLeft:30,
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:'white',
          borderColor: 'gray',
          borderWidth: 2,
          borderRadius: 5,
          width:90
        },
        buttontext:{
          fontWeight:"bold"
        },
        sheet:{
          marginTop:40, 
          marginLeft:35, 
          width:150, 
          height:180, 
          backgroundColor: 'lightgray',
          borderRadius:20,
          elevation: 8,
        },
        sheetcontainer:{
          marginTop:8,
          marginLeft:8,
          
        },
        sheetdate:{
          fontWeight:'bold', 
          margin:5
        }
    })
    
    export default SheetList