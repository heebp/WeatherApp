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
import { CurrentWeather } from './src/Context/CurrentWeather';
const Stack = createNativeStackNavigator();

function App() {

  return (
    <SafeAreaProvider>
      <CurrentLocation>
        <CurrentWeather> 
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="WeatherHome" component={WeatherHomeScreen} options={{title:'현재 날씨'}}/>
              <Stack.Screen name="Category" component={CategoryScreen} />
              <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} options={{title:'상세 날씨'}} />
              <Stack.Screen name="ClothesSheet" component={ClothesSheetScreen} options={{title:'의상 기록'}} />
              <Stack.Screen name="Location" component={LocationScreen} options={{title:'위치 설정'}} />
            </Stack.Navigator>
          </NavigationContainer>
         </CurrentWeather> 
      </CurrentLocation>
    </SafeAreaProvider>
  );
}


export default App;
