import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScreenHeaderComponent from "../../components/ScreenHeaderComponent";
import { HELPLOGOHEADER, HELPSCREENMENU } from "./../../utils/constants";

//imports
import {
  StyleSheet,
  Text
} from "react-native";
import ScreenMenuComponent from "../../components/ScreenMenuComponent";

export type Props = {
  navigation:any
};


const HelpScreen: React.FC<Props> = ({
  navigation
  })=>{
  //useStates and useEffects
  

  return (
    <SafeAreaProvider>
      <ScreenHeaderComponent headerComponentProps={HELPLOGOHEADER}/>
      <ScreenMenuComponent navigation={navigation} menuList={HELPSCREENMENU}/>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
});

export default HelpScreen;
