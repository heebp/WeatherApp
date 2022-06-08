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
import WeatherIcon from '../WeatherIcon';

function SheetList({navigation}) {
  
  const db = useContext(DBContext)
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [selected, setSelected] = useState('');
  const [selected2, setSelected2] = useState('');
  const [sheet, setSheet] = useState([]);


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
        setSheet(temp)
        },
      (error)=>{
        console.log('에러발생',error);
      });
    });
  }
  useEffect(()=>{
    console.log(open2)
    if(open==true){
      if(open2==true){
        setOpen(false)
      }
      setOpen2(false)
    } else if(open2 ==true){
      setOpen(false)
    }else if(open==true && open2 ==true){
      setOpen2(false)
    }
    loadSheet();
    
},[isFocused,open,open2])


const renderItem = ({ item, index }) => (
  <TouchableOpacity key={item.i} style={{marginTop:40, marginLeft:35, width:150, height:180, backgroundColor: 'lightgray'}} onPress={()=> navigation.navigate('ClothesSheet',{item:item})}>
  {/* <Text>{item.i}</Text> */}
    <Text>날짜 : {item.date}</Text>
    <Text>날씨 :
      <WeatherIcon value={item.weather} />
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
                    { label: <WeatherIcon value={"Clear"}/> , value: "Clear" },
                    { label: <WeatherIcon value={"Clouds"}/>, value: "cloudy" },
                    { label: <WeatherIcon value={"Rain"}/>, value: "rain" },
                    { label: <WeatherIcon value={"Snow"}/>, value: "snow" }
                  ]}
                  defaultIndex={0}
                  containerStyle={{height:30}}
                  onChangeItem={(item) => setSelected(item.value)}
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
             
                  onChangeItem={(item) => setSelected2(item.value)}
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
      );
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
        dropDown : {

    
          marginTop:30,
          marginLeft:20,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          width: 90,
          zIndex: 10
        },
        dropDown2 : {

       

          marginLeft:130,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          width: 90,
          zIndex: 10
        },
        button : {
          // marginTop:0,
          // marginLeft:260,
          // backgroundColor:'white',
          borderColor: 'gray',
          borderWidth: 2,
          borderRadius: 5,
          width:90
        }
    })
    
    export default SheetList