import React, {useEffect, createContext, useContext,useState } from "react";
import SQLite from 'react-native-sqlite-storage';
export const DBContext = createContext();
export const DataBase = (props)=>{
    const db = SQLite.openDatabase(
        {
            name: 'PSP3.db',
            location: 'default',
            createFromLocation: 1,
        },
        (db) => {
            console.log('불러오기 성공',);
        },
        (error) => {
            console.log('에러발생: ', error);
        });
        return(
            <DBContext.Provider value={db}>
                {props.children}
            </DBContext.Provider>
        )
}