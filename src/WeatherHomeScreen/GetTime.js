import React, { useState  } from 'react';
import { StyleSheet } from 'react-native';
import Moment from 'react-moment'
import 'moment/locale/ko';

import { Text } from "@rneui/themed";
import { useInterval } from 'react-use';
//하위 컴포넌트 선언=> 상위 컴포넌트 : interval로 인한 리렌더링 방지 
function GetTime(){
    const [nowTime1,setNowTime1] = useState(Date.now())
    useInterval(()=>{
        setNowTime1(Date.now())
    }, 1000);
   return(
    <Moment format="YYYY-MM-DD HH:mm" element={Text} style={styles.middletext}>{nowTime1}</Moment>
   )
}
const styles = StyleSheet.create({
    middletext:{
      fontSize:20
    },

})
export default GetTime