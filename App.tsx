import React, { useEffect, useState } from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import './src/translations/i18n';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {requestUserPermission,NotificationListener } from "./src/utils/pushnotificacions_helper"
import useAppStoreHook from "./src/store/appStore";
import { Platform } from "react-native";


export default function App(){
  
  const {applicationToken,setApplicationToken} = useAppStoreHook();

  const [loading, setLoading] = useState(false);


  const [fireBaseToken,setFireBaseToken] = useState('');

  useEffect(()=>{
    if (Platform.OS != 'ios') {
      requestUserPermission();
      const getToken = async()=>{
        const fcmToken = await  NotificationListener()
        setFireBaseToken(fcmToken);
  
        console.log('Use effect token: ',fcmToken)
  
        setApplicationToken(fcmToken)
  
      }
      getToken().catch(()=>
        console.log('cant get fcm')
      )
    }
  },[])

  return (
    <>
      <GestureHandlerRootView style={{flex:1}}>
        <MainNavigation loading={loading} />
      </GestureHandlerRootView>
    
    </>
  );
}