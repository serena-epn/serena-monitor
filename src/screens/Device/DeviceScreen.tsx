import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text
} from "react-native";
import ScreenMenuComponent from "../../components/ScreenMenuComponent";
import ScreenHeaderComponent from "../../components/ScreenHeaderComponent";
import { DEVICESCREENMENU } from "./../../utils/constants"
import { DEVICELOGOHEADER } from "./../../utils/constants";

export type Props = {
  navigation:any
};


const DeviceScreen: React.FC<Props> = ({
  navigation
  })=>{

  //useStates and useEffects
  

  return (
    <SafeAreaProvider>
      
      <ScreenHeaderComponent headerComponentProps={DEVICELOGOHEADER}/>
      <ScreenMenuComponent navigation={navigation} menuList={DEVICESCREENMENU}/>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
});

export default DeviceScreen;
