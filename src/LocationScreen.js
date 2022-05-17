import React, {Component, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { useLayoutEffect,useEffect } from 'react';
import axios from 'axios'
import SQLite from 'react-native-sqlite-storage';
const Stack = createNativeStackNavigator();



function LocationScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const db = SQLite.openDatabase(
    {
        name: 'TestDB3.db',
        location: 'default',
        createFromLocation: 1,
    },
    (db) => {
        console.log('불러오기 성공',);
    },
    (error) => {
        console.log('에러발생: ', error);
    });
  const getData = () => {
    try{
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM clothes_tag WHERE highTemp>20 AND 20>lowTemp;`, [], (tx, results) => {
          console.log("aaaaaa");
          console.log(results)
            const rows = results.rows;
            let users = [];
            for (let i=0; i<rows.length; i++) {
                console.log(rows.item(i));
                users.push({
                    ...rows.item(i),
                });
            }
            setUsers(users);
        },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }catch(error){
      console.log(error);
    }
  }
  /*
  const createTable = () =>{
    db.transaction ((tx)=>{
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "test"
        + "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT NOT NULL, age NUMERIC NOT NULL, email TEXT NOT NULL)"
      );
    }) 
  }*/

useEffect(() => {
  //createTable();
  getData();
}, [])


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

      return (
        <View style={styles.screen}>
          <Text>지역 검색 스크린</Text>
          {
    users.map((item) => (
        <Text key={item.id}>이름: {item.name}, 나이: {item.age}</Text>
    ))
}
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
    export default LocationScreen