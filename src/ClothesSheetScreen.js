import React, {Component} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { useLayoutEffect } from 'react';
const Stack = createNativeStackNavigator();

function ClothesSheetScreen({navigation}) {
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
    }
    const styles = StyleSheet.create({
        screen:{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center' 
        },
    })
    export default ClothesSheetScreen