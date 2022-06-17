import React, { useContext, useState,useEffect,useRef} from 'react';
import {
  StyleSheet,
  View,

  Alert,
  TouchableOpacity,

} from 'react-native';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { DBContext } from '../Context/DataBase';
import ImageModal from 'react-native-image-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ClothesImage(props){
    const [imageSource, setImageSource] = useState([]);
    const [forceRender,setForceRender]= useState(false)
    const db = useContext(DBContext)
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
        saveToPhotos : true
    }
    const showCamera = () => {
      if(imageSource.length!=4){
        launchCamera(options, (response) => {
            console.log(response)
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              setImageSource(imageSource=>[...imageSource, response.assets[0].uri]);
 
          }
        });
      }else{
        Alert.alert("이미지는 최대 4장 저장 가능합니다.")
      }
    };

    const showCameraRoll = ()=> {
      if(imageSource.length!=4){
        launchImageLibrary(options, (response) => {
            //console.log(response.assets[0].uri)
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              setImageSource(imageSource=>[...imageSource, response.assets[0].uri]);
          }
        });
      }else{
        Alert.alert("이미지는 최대 4장 저장 가능합니다.")
      }
    };
    const deletePhoto=(image)=>{
      setImageSource(imageSource.filter((imageSource) =>imageSource !=image));
    }

    const loadImage=()=>{
      // 렌더링 해제
      setForceRender(true)
      db.transaction((tx) => {
        tx.executeSql(`SELECT image FROM clothes_sheet_image where clothes_sheet_image.date='`+props.value.date+`'`,
        [],
          (tx, results) => {
            const rows = results.rows;
              for (let i=0; i<rows.length; i++) {
                 setImageSource(imageSource=>[...imageSource,rows.item(i).image] )
              }

          },
        (error)=>{
          console.log('에러발생',error);
        });
      });
    }

    const confirmImage=(imageSource)=>{
        props.propfunction(imageSource)
    }
    
    useEffect(()=>{
      if(forceRender == false){
        loadImage()
      }else{
        confirmImage(imageSource)
      }
      
    },[imageSource])

    return(
        <View style={styles.imagepicker}>
            <View style={styles.photocontainer}>
              <View style={styles.imageborder}>
            {imageSource.length != 0 ? (
              imageSource.map((item,index)=>(
                <View style={{position:'relative'}}>
                <ImageModal 
                key={index}
                resizeMode='cover'
                //modalImageResizeMode='contain'
                /*renderFooter={전체화면시 하단에 보여줄 항목(예시 :다른 이미지 배열) }*/ 
                //style={[styles.photo, {transform:[{scale: 0.2}]}]} 
                style={styles.photo}
                source={{uri: (item)}}
                />
                <TouchableOpacity key={index+1} style={styles.delete}  onPress={()=>deletePhoto(item)}>
                  <FontAwesome5  key={index+2} name="times" color={"white"} size={20}/>
                </TouchableOpacity>
                </View>
              )) 
              ):(
                <></>
              )}
            </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={showCamera} style={{paddingBottom:10}}>
                <FontAwesome name="camera" size={30} style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={showCameraRoll}>
                <FontAwesome name="image" size={30} style={styles.icon}/>
              </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
  imagepicker:{ 
    flexDirection:"row",
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
    flexDirection:"row",
    
  },
  photo:{
    alignContent:"flex-start",
    alignSelf:"flex-start",
    justifyContent:"flex-start",
    width:70,
    height:70,
    resizeMode:'cover',
    margin:2,
  },
  buttons:{

    flexDirection:"column",
    alignContent:"flex-end",
    alignSelf:"flex-end",
    justifyContent:"flex-end",
  },
  delete:{
    position:'absolute',
    marginBottom:20,
    marginLeft:55,
  },
})

export default ClothesImage