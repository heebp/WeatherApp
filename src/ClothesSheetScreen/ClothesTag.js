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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DBContext } from '../Context/DataBase';

function ClothesTag(props){
    let checked = 'yellow'
    let notChecked = 'lightgrey'
    const [categoryName,setCategoryName] = useState('상의')
    const nextId = useRef(100);
    const db = useContext(DBContext)
    const [forceRender, setForceRender] =useState(false);
    const [clothesTag, setClothesTag] = useState([]);
    const [clothesTagInput, setClothesTagInput] = useState('');
    const [tagClick, setTagClick] = useState(false) // 개선점? : 카테고리처럼 색으로 true false 지정
    const [isChecked, setChecked] = useState(checked); // 카테고리 체크
    const [isChecked2, setChecked2] = useState(notChecked);
    const [isChecked3, setChecked3] = useState(notChecked);
    const [visible, setVisible] = useState(false);
    const [forceRender2, setForceRender2] =useState(false);

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
      const handleAdd = (dbitem) => {
        //setForceRender2(false)
        var tag
        if(dbitem!=undefined){
           tag = {
            id: nextId.current,
            tagName:dbitem.tagName,
            categoryName:dbitem.categoryName,
            click:tagClick,
            backgroundColor:'darkgray'
          }

        }else{
           tag = {
            id: nextId.current,
            tagName:clothesTagInput,
            categoryName:categoryName,
            click:tagClick,
            backgroundColor:'darkgray'
          }
        }
        
        setVisible(false);
        setClothesTag(clothesTag=>[...clothesTag, tag])
        setClothesTagInput('');
        nextId.current += 1;
        /*
        //비동기 호출 오류? -> useEffect 사용
        console.log("하위"+clothesTag)
        confirmTag(clothesTag)
        */

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
          setChecked(checked);setChecked2(notChecked);setChecked3(notChecked)
        }else if(cateName=="하의"){
          setCategoryName("하의")
          setChecked(notChecked);setChecked2(checked);setChecked3(notChecked)
        }else{
          setCategoryName("겉옷")
          setChecked(notChecked);setChecked2(notChecked);setChecked3(checked)
        }
    
      }
      const renderItem = ({ item, index }) => (
      (isChecked==checked && item.categoryName==="상의")?(
      <TouchableOpacity style={{ alignItems:"center", marginTop:10, marginLeft:10, width:60,borderRadius:100, margin:10, backgroundColor: item.backgroundColor}} key={item.id} onPress={()=>{handleTagClick(item)}}>
        <Text>{item.tagName}</Text>
      </TouchableOpacity>
      ):((isChecked2==checked && item.categoryName==="하의")?(
      <TouchableOpacity style={{ alignItems:"center", marginTop:10, marginLeft:10, width:60,borderRadius:100, margin:10, backgroundColor: item.backgroundColor}} key={item.id} onPress={()=>{handleTagClick(item)}}>
        <Text>{item.tagName}</Text>
      </TouchableOpacity>
      ):((isChecked3==checked && item.categoryName==="겉옷")?(
        <TouchableOpacity style={{ alignItems:"center", marginTop:10, marginLeft:10, width:60,borderRadius:100, margin:10, backgroundColor: item.backgroundColor}} key={item.id} onPress={()=>{handleTagClick(item)}}>
          <Text>{item.tagName}</Text>
        </TouchableOpacity>
      ):(
        <></>
      )))
      );
      const loadTag=()=>{
        // 렌더링 해제
        setForceRender2(true)
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM clothes_tag 
          join sheet_tag on clothes_tag.tagNum = sheet_tag.tagNum WHERE date='`+props.value.date+`'`,
          [],
            (tx, results) => {
              const rows = results.rows;
                for (let i=0; i<rows.length; i++) {
                  handleAdd(rows.item(i))
                }

            },
          (error)=>{
            console.log('에러발생',error);
          });
        });
      }
    //상위 컴포넌트에 값 전달
    const confirmTag=(clothesTag)=>{
        props.propfunction(clothesTag)
    }
    useEffect(()=>{
      //db 마운트할 때 state값 로딩 -> 무한 렌더링
      //forcerender2 설정 -> db 마운트시에만 렌더링 
      if(forceRender2==false){
        loadTag()
      }else{
        confirmTag(clothesTag)
      }
    },[clothesTag])
    return(
        <View>
          <View style={styles.categories}>

            <TouchableOpacity style={{width:45, height:30, borderWidth:1, alignItems:'center',justifyContent:"center", backgroundColor:isChecked,}} onPress={()=>handleTagCategory("상의")}>
              <Text>상의</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:45, height:30, borderWidth:1, alignItems:'center',justifyContent:"center",  backgroundColor:isChecked2,}} onPress={()=>handleTagCategory("하의")}>
             <Text>하의</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:45, height:30,  borderWidth:1, alignItems:'center',justifyContent:"center", backgroundColor:isChecked3,}} onPress={()=>handleTagCategory("겉옷")}>
              <Text>겉옷</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.iconlist}>
            <TouchableOpacity onPress={showDialog}>
              <FontAwesome name="plus" size={30} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteTag} >
              <FontAwesome name="trash" size={30} style={styles.icon}/>
            </TouchableOpacity>
          </View>
 
          <Dialog.Container visible={visible}>
            <Dialog.Title>태그 추가</Dialog.Title>
            <Dialog.Input value={clothesTagInput} onChangeText={(value)=>{setClothesTagInput(value)}}></Dialog.Input>
            <Dialog.Button label="추가" onPress={()=>handleAdd()} />
            <Dialog.Button label="취소"  onPress={handleCancel}/>
          </Dialog.Container> 

          <FlatList
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
    categories:{
      flexDirection:"row",
      alignSelf:"flex-start", 
      margin:10,
      height:15
    },
    iconlist:{
      flexDirection:"row",
      alignSelf:"flex-start",
      margin:15,
      height:15
    },
    icon:{
      width: 40,
      height: 30,
    }
})
export default ClothesTag