/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import WeatherHomeScreen from './src/WeatherHomeScreen/WeatherHomeScreen'
import CategoryScreen from './src/CategoryScreen'
import WeatherDetailScreen from './src/WeatherDetailScreen/WeatherDetailScreen'
import ClothesSheetScreen from './src/ClothesSheetScreen/ClothesSheetScreen';
import LocationScreen from './src/LocationScreen/LocationScreen';
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CurrentLocation } from './src/Context/CurrentLocation';
import { DataBase } from './src/Context/DataBase';
import { CurrentWeather } from './src/Context/CurrentWeather';

import SheetListScreen from './src/ClothesSheetScreen/SheetListScreen';
const Stack = createNativeStackNavigator();

function App() {

  return (
    <SafeAreaProvider>
      <CurrentLocation>
        <CurrentWeather> 
          <DataBase>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="WeatherHome" component={WeatherHomeScreen} options={{title:'\t\t현재 날씨'}}/>
              <Stack.Screen name="Category" component={CategoryScreen} />
              <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} options={{title:'\t\t상세 날씨'}} />
              <Stack.Screen name="SheetList" component={SheetListScreen} options={{title:'\t\t의상 기록 리스트'}} />
              <Stack.Screen name="ClothesSheet" component={ClothesSheetScreen} options={{title:'\t\t의상 기록'}} />
              <Stack.Screen name="Location" component={LocationScreen} options={{title:'\t\t위치 설정'}} />
            </Stack.Navigator>
          </NavigationContainer>
          </DataBase>
         </CurrentWeather> 
      </CurrentLocation>

    </SafeAreaProvider>
  );
}


export default App;
