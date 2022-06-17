import React, { useEffect, useState  } from 'react';
import { StyleSheet, View } from 'react-native';
import Moment from 'react-moment'
import 'moment/locale/ko';

import { Text } from "@rneui/themed";
import { useInterval } from 'react-use';
//하위 컴포넌트 선언=> 상위 컴포넌트 : interval로 인한 리렌더링 방지 
function GetTime(){
    const [nowTime,setNowTime] = useState(Date.now())
    useInterval(()=>{
        setNowTime(Date.now())
    }, 1000);
   return(
    <View style={styles.time}>
        <Moment format="YYYY-MM-DD" element={Text} style={styles.date}>{nowTime}</Moment>
        <Moment format="HH:mm " element={Text} style={styles.hour}>{nowTime}</Moment>
    </View>
   )
}
const styles = StyleSheet.create({
    time:{
        alignContent:"flex-start",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        flexDirection:"column"
    },
    date:{
        fontSize:22,
        marginBottom:10,
        color:"silver",
    },
    hour:{
        fontSize:20,
        marginBottom:20,
        color:"silver",
    }
})
export default GetTime