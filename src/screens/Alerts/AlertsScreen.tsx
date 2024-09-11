import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text
} from "react-native";


import ScreenMenuComponent from "../../components/ScreenMenuComponent";
import ScreenHeaderComponent from "../../components/ScreenHeaderComponent";
import { ALERTSSCREENMENU } from "../../utils/constants";
import { ALERTSLOGOHEADER } from "./../../utils/constants";

export type Props = {
  navigation:any
};


const AlertsScreen: React.FC<Props> = ({
  navigation
  })=>{
  //useStates and useEffects
  

  return (
    <SafeAreaProvider>

      <ScreenHeaderComponent headerComponentProps={ALERTSLOGOHEADER}/>
      <ScreenMenuComponent navigation={navigation} menuList={ALERTSSCREENMENU}/>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
});

export default AlertsScreen;
