/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import WeatherHomeScreen from './src/WeatherHomeScreen'
import CategoryScreen from './src/CategoryScreen'
import WeatherDetailScreen from './src/WeatherDetailScreen'
import ClothesSheetScreen from './src/ClothesSheetScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from './src/LocationScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WeatherHome" component={WeatherHomeScreen} options={{title:'현재 날씨'}}/>
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} options={{title:'상세 날씨'}} />
        <Stack.Screen name="ClothesSheet" component={ClothesSheetScreen} options={{title:'의상 기록'}} />
        <Stack.Screen name="Location" component={LocationScreen} options={{title:'지역 검색'}} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
