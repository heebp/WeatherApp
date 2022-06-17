import React, { useState, useEffect,useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text,View } from 'react-native';
import { DBContext } from '../Context/DataBase';

function GetTag(props){
    const db = useContext(DBContext)
    const [tag, setTag] = useState([]);
    const [temperature, setTemperature] = useState(10);

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
                        i
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
        tag.slice(0,5).map((item,index) => (
            <View style={styles.tagcontainer}>
                <TouchableOpacity key={item.tagNum} style={styles.button} onPress={()=> tagChangeHandler(item.tagName)}>
                    <Text style={styles.buttontext} key={item.tagNum}>{item.tagName}</Text>
                </TouchableOpacity> 
            </View>
        ))
    )
} 

const styles = StyleSheet.create({
    tagcontainer:{
        flex :1,
        flexWrap:'wrap',
        flexDirection:'row',
    },
    button:{
        width: 80,
        backgroundColor: "darkslateblue",
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        elevation:3,
        borderRadius:10,
        borderWidth:1
      },
    buttontext:{
        marginTop:10,
        flexBasis:'50%',
        color:"white"
    }
})
export default GetTag