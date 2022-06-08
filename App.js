/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useState } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { CurrentLocation } from './src/Context/CurrentLocation';
 import { DataBase } from './src/Context/DataBase';
 import { CurrentWeather } from './src/Context/CurrentWeather';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import WeatherHomeScreen from './src/WeatherHomeScreen/WeatherHomeScreen'
 import WeatherDetailScreen from './src/WeatherDetailScreen/WeatherDetailScreen'
 import ClothesSheetScreen from './src/ClothesSheetScreen/ClothesSheetScreen';
 import LocationScreen from './src/LocationScreen/LocationScreen';
 import SheetListScreen from './src/ClothesSheetScreen/SheetListScreen';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LocationListScreen from './src/LocationScreen/LocationListScreen';
 const Stack = createNativeStackNavigator();
 const Tab = createBottomTabNavigator();

 const SheetStack = createNativeStackNavigator()
 const LocationStack = createNativeStackNavigator()
function SheetListStackApp(){
  return(
  <SheetStack.Navigator
    screenOptions={{headerShown: true}}
  >
    <SheetStack.Screen name="SheetList"  component={SheetListScreen} options={{headerShown: false }}/>
    <SheetStack.Screen name="ClothesSheet" component={ClothesSheetScreen} />
  </SheetStack.Navigator>
  )
 }
function LocationStackApp(){
  return(
  <LocationStack.Navigator>
    <LocationStack.Screen name="Location" component={LocationScreen} options={{headerShown: false }}/>
    <LocationStack.Screen name="LocationList" component={LocationListScreen}/>
  </LocationStack.Navigator>

  )
}
 function App() {
 
   return (
     <SafeAreaProvider>
       <CurrentLocation>
         <CurrentWeather> 
           <DataBase>
           <NavigationContainer>
             <Tab.Navigator
                screenOptions={({ route, }) => ({
                  headerShown: false,
                  tabBarActiveTintColor: 'skyblue',
                  tabBarInactiveTintColor: 'gray',
                  tabBarIcon: ({ focused,tintColor }) => {
                     let iconName;
                     let size=25
                     if (route.name === "WeatherHome") {
                         iconName = "home"
                         focused ? (tintColor ="skyblue", size=30): tintColor ="gray"
                     } else if (route.name === "WeatherDetail") {
                        iconName = "cloud-sun-rain"
                        focused ? (tintColor ="skyblue" , size = 30) : tintColor ="gray"
                     } else if(route.name === "SheetListStack"){
                        iconName = "edit"
                        focused ?(tintColor ="skyblue", size=30): tintColor ="gray"
                     } else if( route.name === "LocationStack"){
                        iconName = "map"
                        focused ?(tintColor ="skyblue", size=30): tintColor ="gray"
                     }
                     
                     return <FontAwesome5 name={iconName} size={size} color={tintColor}/>;
                 }, 
                 })}
              >
               <Tab.Screen name="WeatherHome" component={WeatherHomeScreen}
                options={{title:'현재 날씨', }}/>
               <Tab.Screen name="WeatherDetail" component={WeatherDetailScreen}
                options={{title:'상세 날씨',}} />
               <Tab.Screen name="SheetListStack" component={SheetListStackApp} 
               options={{title:'의상 기록', }}/>
               {/* <Tab.Screen name="ClothesSheet" component={ClothesSheetScreen} options={{title:'\t\t의상 기록', tabBarButton:()=>null,}} /> */}
               <Tab.Screen name="LocationStack" component={LocationStackApp} 
               options={{title:'위치 설정',}} />
             </Tab.Navigator>
           </NavigationContainer>
           </DataBase>
          </CurrentWeather> 
       </CurrentLocation>
 
     </SafeAreaProvider>
   );
 }

 
 export default App;
 