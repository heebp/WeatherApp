import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { GOOGLE_CUSTOM_API_KEY, SEARCH_ENGINE} from '@env'

function GetImage(props){
  const SEARCH_WORD = "청바지 맨투맨";
  const [customImages, setCustomImages] = useState('');
  const getImages = async (SEARCH_WORD) => {
    if(SEARCH_WORD != ''){
    const imageSearch = await fetch(
       `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_CUSTOM_API_KEY}&cx=${SEARCH_ENGINE}&q=${SEARCH_WORD}`
    );
    const resimage = await imageSearch.json()
      //    // //console.log(resimage.error.code)
      //    // //const _image = resimage.items[0].pagemap.cse_image[0].src
      //    // //console.log(_image);
      if(resimage.items == undefined){
           setCustomImages('');
      }else{
          setCustomImages(resimage.items)
      }
    }
  }
  useEffect(() => {
    getImages(props.value)
  },[props.value]);
  return(
    customImages.length === 0 ? (
      <View>
        <ActivityIndicator color="white" style={styles.loading} size="large"/>
      </View>
      ) : (
      customImages.map((customImage, index) => (
        <View key={index}>
          <View style={styles.cardImageContainer}>
            <Image style={styles.cardImage} source={customImage.pagemap.cse_image == undefined ? require('../assets/images/white.jpg') : {uri:customImage.pagemap.cse_image[0].src}}/>
          </View>
        </View>
      ))
    )
  )
}
const styles = StyleSheet.create({
    cardImage: {
        width: 242,
        height: 345,
        borderRadius:20
      },
      cardImageContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
      },
      loading:{
        marginTop: 150,
        marginLeft:105 
      }
})


export default GetImage