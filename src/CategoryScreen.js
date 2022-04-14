import React, {Component} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

function CategoryScreen({navigation}){
    return (
      <View style={styles.container}>
        <View style={styles.case1}>
          <TouchableOpacity onPress={()=> navigation.navigate('WeatherHome')}>
            <Text>현재 날씨</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.case2}>
          <TouchableOpacity onPress={()=> navigation.navigate('WeatherDetail')}>
            <Text>상세 날씨</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.case3}>
          <TouchableOpacity onPress={()=> navigation.navigate('ClothesSheet')}>
            <Text>의상 기록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.case4}>
          <TouchableOpacity onPress={()=> navigation.navigate('Location')}>
            <Text>지역 검색</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  const styles = StyleSheet.create({
    container:{
      flex: 1,  
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    case1:{
      flex: 1,  
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    case2:{
      flex: 1,  
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    case3:{
      flex: 1,  
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    case4:{
      flex: 1,  
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    button:{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
    TouchableOpacity:{
        styles: 'button',
    },
})
export default CategoryScreen