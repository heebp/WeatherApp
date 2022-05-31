import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

function GetTag(props){
    console.log("GetTag 실행")
    const [tag, setTag] = useState([]);
    const [temperature, setTemperature] = useState(10);
    /*
    db 분리 필요
    */
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
    //props 사용 불가능
    //-> Conte APi 사용
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

    //상위 컴포넌트에 태그네임값 전달
    function tagChangeHandler(tagName){
        props.propfunction(tagName)
    }

    useEffect(() => {
        setTemperature(props.value)
        //console.log("GetTag:"+props.value)
        getData(temperature);
    }, [props]);

    return(   
        tag.map((item) => (
            <TouchableOpacity key={item.tagNum} style={styles.button} onPress={()=> tagChangeHandler(item.tagName)}>
                <Text key={item.tagNum}>{item.tagName}</Text>
            </TouchableOpacity>    
        ))
    )
} 

const styles = StyleSheet.create({
    button:{
        width: 80,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
      },
})
export default GetTag