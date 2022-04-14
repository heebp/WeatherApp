import React, {Component} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button from 'react-native';
import { useLayoutEffect } from 'react';
function HeadbarEffect(place,{navigation}){
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
return place
}

export default HeadbarEffect
