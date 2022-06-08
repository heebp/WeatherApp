import React, { useState, useEffect,useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DBContext } from '../Context/DataBase';

function GetTag(props){
    const db = useContext(DBContext)

    console.log("GetTag 실행")
    const [tag, setTag] = useState([]);
    const [temperature, setTemperature] = useState(10);
    /*
    db 분리 필요
    */

    //props 사용 불가능
    //-> Context APi 사용
    const getData = (temp) => {
        var temperature = Math.round(temp)
        try{
          db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM clothes_tag WHERE highTemp>=`+ temperature+` AND `+ temperature +`>=lowTemp;`,[],  (tx, results) => {
                const rows = results.rows;
                let tag = [];
                for (let i=0; i<rows.length; i++) {
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