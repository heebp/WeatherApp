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
import Dialog from "react-native-dialog";

import { DBContext } from '../Context/DataBase';

function ClothesTag(props){
    const [categoryBGC, setCategoryBGC]=useState('lightgrey')
    const [categoryName,setCategoryName] = useState('상의')
    const nextId = useRef(100);
    const db = useContext(DBContext)
    const [forceRender, setForceRender] =useState(false);
    const [clothesTag, setClothesTag] = useState([]);
    const [clothesTagInput, setClothesTagInput] = useState('');
    const [tagClick, setTagClick] = useState(false)
    const [isChecked, setChecked] = useState(true); // 카테고리 체크
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
      };
      const handleTagClick = (clothesTag) =>{
        if(clothesTag.click==true){
          clothesTag.click=false;
          clothesTag.backgroundColor='darkgray'
        }else{
          clothesTag.click=true
          clothesTag.backgroundColor='yellow'
        }
        //태그 색 바꾸기 렌더링
        if(forceRender==false){
          setForceRender(true);
        }else{
          setForceRender(false);
        }
      }
      const handleAdd = () => {

        const tag = {
          id: nextId.current,
          tagName:clothesTagInput,
          categoryName:categoryName,
          click:tagClick,
          backgroundColor:'darkgray'
        }

        setClothesTag(clothesTag=>[...clothesTag, tag])
        setClothesTagInput('');
        nextId.current += 1;
        setVisible(false);
        //console.log("하위"+clothesTag)
        //confirmTag(clothesTag)
      };
      const handleDeleteTag = () =>{
        setClothesTag(clothesTag.filter((clothesTag)=> clothesTag.click !== true ));
      }
      const handleCancel = () => {
        setVisible(false);
      };
    
      const handleTagCategory=(cateName)=>{
        if(cateName=='상의'){
          setCategoryName("상의")
          setChecked(true,'yellow');setChecked2(false,'lightgrey');setChecked3(false,'lightgrey')
        }else if(cateName=="하의"){
          setCategoryName("하의")
          setChecked(false,'lightgrey');setChecked2(true,'yellow');setChecked3(false,'lightgrey')
        }else{
          setCategoryName("겉옷")
          setChecked(false,'lightgrey');setChecked2(false,'lightgrey');setChecked3(true,'yellow')
        }
    
      }
      const renderItem = ({ item, index }) => (
      (isChecked===true && item.categoryName==="상의")?(
      <TouchableOpacity style={{ alignItems:"center", marginTop:10, marginLeft:20, width:60,borderRadius:100, backgroundColor: item.backgroundColor}} key={item.id} onPress={()=>{handleTagClick(item)}}>
        <Text>{item.tagName}</Text>
      </TouchableOpacity>
      ):((isChecked2===true && item.categoryName==="하의")?(
        <TouchableOpacity style={{ alignItems:"center", marginTop:10, marginLeft:20, width:60,borderRadius:100, backgroundColor: item.backgroundColor}} key={item.id} onPress={()=>{handleTagClick(item)}}>
        <Text>{item.tagName}</Text>
      </TouchableOpacity>
      ):((isChecked3==true && item.categoryName==="겉옷")?(
        <TouchableOpacity style={{ alignItems:"center", marginTop:10, marginLeft:20, width:60,borderRadius:100, backgroundColor: item.backgroundColor}} key={item.id} onPress={()=>{handleTagClick(item)}}>
        <Text>{item.tagName}</Text>
      </TouchableOpacity>
      ):(
        <View></View>
      )))
      );
    const confirmTag=(clothesTag)=>{
        //console.log("하위"+clothesTag)
        props.propfunction(clothesTag)
    }
    useEffect(()=>{
      confirmTag(clothesTag)
    },[clothesTag])
    return(
        <View>
            <View style={{flexDirection:"row", alignSelf:"flex-start", margin:10}}>

          <TouchableOpacity style={{width:45, height:30, borderWidth:1, alignItems:'center',justifyContent:"center", backgroundColor:categoryBGC,}} onPress={()=>handleTagCategory("상의")}>
            <Text>상의</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:45, height:30, borderWidth:1, alignItems:'center',justifyContent:"center",  backgroundColor:categoryBGC,}} onPress={()=>handleTagCategory("하의")}>
            <Text>하의</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:45, height:30,  borderWidth:1, alignItems:'center',justifyContent:"center", backgroundColor:categoryBGC,}} onPress={()=>handleTagCategory("겉옷")}>
            <Text>겉옷</Text>
          </TouchableOpacity>

          </View>
          <View style={{flexDirection:"row", alignSelf:"flex-start",margin:3}}>
        <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={showDialog}>
          <Image source={ require('../images/plusImage.png') } style={ { width: 30, height: 30, } } />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteTag} >
          <Image source={ require('../images/binImage.png') } style={ { width: 30, height: 30, } } />
        </TouchableOpacity>
          </View>
 
        <Dialog.Container visible={visible}>
          <Dialog.Title>태그 추가</Dialog.Title>
          <Dialog.Input value={clothesTagInput} onChangeText={(value)=>{setClothesTagInput(value)}}></Dialog.Input>
          <Dialog.Button label="추가" onPress={()=>handleAdd()} />
          <Dialog.Button label="취소"  onPress={handleCancel}/>
        </Dialog.Container> 

          <FlatList
            style={{alignSelf:'flex-start'}}
            key={'#'}
            data={clothesTag}
            renderItem={renderItem}
            // keyExtractor={(sheet) => sheet.id}
             numColumns={4}
         />
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center' 
    },
})
export default ClothesTag