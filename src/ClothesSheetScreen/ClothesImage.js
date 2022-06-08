import React, { useContext, useState,useEffect,useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useLayoutEffect } from 'react';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { DBContext } from '../Context/DataBase';
import ImageModal from 'react-native-image-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { transform } from '@babel/core';


function ClothesImage(props){
    const [imageSource, setImageSource] = useState(undefined);

    const options = {
        title: 'Load Photo',
        customButtons: [
        { name: 'button_id_1', title: 'CustomButton 1' },
        { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
        skipBackup: true,
        path: 'images',
        },
    }
    const showCamera = () => {
        launchCamera(options, (response) => {
            console.log(response)
          if (response.error) {
            console.log('LaunchCamera Error: ', response.error);
          }
          else {
            setImageSource(response.assets[0].uri);
          }
        });
    };

    const showCameraRoll = ()=> {
        launchImageLibrary(options, (response) => {
            console.log(response.assets[0].uri)
          if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
          }
          else {
            setImageSource(response.assets[0].uri);
          }
        });
    };
    /*
    const confirmImage=()=>{
        props.propfunction()
    }
    */
    useEffect(()=>{
 

        //console.log("test",imageSource)
      
    },[])

    return(
        <View style={styles.imagepicker}>
            <View style={styles.photocontainer}>
              <View style={styles.imageborder}>
            {imageSource && 
              <ImageModal 
              
              resizeMode='cover'
              //modalImageResizeMode='contain'
              /*renderFooter={전체화면시 하단에 보여줄 항목(예시 :다른 이미지 배열) }*/ 
              //style={[styles.photo, {transform:[{scale: 0.2}]}]} 
              style={styles.photo}
              source={{uri: imageSource}}
              />}
 
            </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={showCamera} style={{paddingBottom:10}}>
                <FontAwesome name="camera" size={30} style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={showCameraRoll}>
                <FontAwesome name="image" size={30} style={styles.icon}/>
              </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
  imagepicker:{ 
    flexDirection:"row"
  },

  photocontainer:{
    alignContent:"flex-start",
    alignSelf:"flex-start",
    justifyContent:"flex-start",
    width:"90%",
  },
  imageborder:{
    width:70,
    height:70,
    backgroundColor:"red",
    
    
  },
  photo:{
    alignContent:"flex-start",
    alignSelf:"flex-start",
    justifyContent:"flex-start",
    width:70,
    height:70,
    resizeMode:'cover'
    //margin:
    


  },
  buttons:{

    flexDirection:"column",
    alignContent:"flex-end",
    alignSelf:"flex-end",
    justifyContent:"flex-end",
  },

})

export default ClothesImage