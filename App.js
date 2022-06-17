/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect, useState } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { CurrentLocation } from './src/Context/CurrentLocation';
 import { DataBase } from './src/Context/DataBase';
 import { CurrentWeather } from './src/Context/CurrentWeather';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import Geolocation, { PositionError } from 'react-native-geolocation-service';
 import WeatherHomeScreen from './src/WeatherHomeScreen/WeatherHomeScreen'
 import WeatherDetailScreen from './src/WeatherDetailScreen/WeatherDetailScreen'
 import ClothesSheetScreen from './src/ClothesSheetScreen/ClothesSheetScreen';
 import LocationScreen from './src/LocationScreen/LocationScreen';
 import SheetListScreen from './src/ClothesSheetScreen/SheetListScreen';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LocationListScreen from './src/LocationScreen/LocationListScreen';
import {API_KEY, GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'
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
    <SheetStack.Screen name="ClothesSheet" component={ClothesSheetScreen}options={{headerShown: false }} />
  </SheetStack.Navigator>
  )
 }
function LocationStackApp(route){
  console.log(route.route.params)
  return(
  <LocationStack.Navigator>
    <LocationStack.Screen name="Location" component={LocationScreen} options={{headerShown: false }}/>
    <LocationStack.Screen name="LocationList" component={LocationListScreen} options={{headerShown: false }} initialParams={route.route.params}/>
  </LocationStack.Navigator>

  )
}
 function App() {
  const [address, setAddress] = useState('')
  /*
    불필요한 렌더링을 방지하기 위해 주소 기능 App에 정의
    location context 사용 X
  */
  const getAddress = async (lat, lng) => {
    const response = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng
      + '&key=' + GOOGLE_CUSTOM_API_KEY + '&language=ko');
    const json = await response.json();
    //console.log(json.results[0].formatted_address)
    setAddress(json.results[0].formatted_address)
  };
  useEffect(()=>{
    Geolocation.getCurrentPosition( 
      pos => { 
        getAddress(pos.coords.latitude,pos.coords.longitude)

      }, 
      error => { 
        console.log(error); 
      }, 
      { 
        enableHighAccuracy: true, 
        timeout: 3600, 
        maximumAge: 3600, 
      }, 
      ); 
  },[])
   return (
     <SafeAreaProvider>
       <CurrentLocation>
         <CurrentWeather> 
           <DataBase>
           <NavigationContainer>
             <Tab.Navigator
                screenOptions={({ route, }) => ({
                  headerShown: true,
                  tabBarActiveTintColor: 'skyblue',
                  tabBarInactiveTintColor: 'gray',
                  tabBarLabel:() => {return null},
                  tabBarIcon: ({ focused,tintColor }) => {
                     let iconName;
                     let size=30
                     let clickSize = 35
                     if (route.name === "WeatherHome") {
                         iconName = "home"
                         focused ? (tintColor ="skyblue", size = clickSize): tintColor ="gray"
                     } else if (route.name === "WeatherDetail") {
                        iconName = "cloud-sun-rain"
                        focused ? (tintColor ="skyblue" , size = clickSize) : tintColor ="gray"
                     } else if(route.name === "SheetListStack"){
                        iconName = "edit"
                        focused ?(tintColor ="skyblue", size = clickSize): tintColor ="gray"
                     } else if( route.name === "LocationStack"){
                        iconName = "map"
                        focused ?(tintColor ="skyblue", size = clickSize): tintColor ="gray"
                     }
                     
                     return <FontAwesome5 name={iconName} size={size} color={tintColor}/>;
                 }, 
                 })}
              >
               <Tab.Screen name="WeatherHome" component={WeatherHomeScreen}
                options={{title:address, headerTitleAlign: 'center'}}/>
               <Tab.Screen name="WeatherDetail" component={WeatherDetailScreen}
                options={{title:address, headerTitleAlign: 'center'}} />
               <Tab.Screen name="SheetListStack" component={SheetListStackApp} 
               options={{title:address, headerTitleAlign: 'center'}}/>
               {/* <Tab.Screen name="ClothesSheet" component={ClothesSheetScreen} options={{title:'\t\t의상 기록', tabBarButton:()=>null,}} /> */}
               <Tab.Screen name="LocationStack" component={LocationStackApp} 
               options={{title:address,headerTitleAlign: 'center'}} 
               initialParams={{setAddress}}
               />
             </Tab.Navigator>
           </NavigationContainer>
           </DataBase>
          </CurrentWeather> 
       </CurrentLocation>
 
     </SafeAreaProvider>
   );
 }

 
 export default App;
 