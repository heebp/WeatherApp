import React, {Component} from 'react';
import StyleSheet  from 'react-native';
//스타일 모듈화-적용안됨
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center' 
      },
    container:{
        flex: 1,  
        alignItems: 'center', 
        justifyContent: 'center' 
      },
      case1:{
        flex: 1,  
        alignItems: 'center', 
        justifyContent: 'center' 
      },
      case2:{
        flex: 1,  
        alignItems: 'center', 
        justifyContent: 'center' 
      },
      case3:{
        flex: 1,  
        alignItems: 'center', 
        justifyContent: 'center' 
      },
      case4:{
        flex: 1,  
        alignItems: 'center', 
        justifyContent: 'center' 
      },
      button:{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10
        },
      TouchableOpacity:{
          styles: 'button',
      },

})
export default function BaseInputStyled({ children }) {
    return <Wrapper>{children}</Wrapper>
  }