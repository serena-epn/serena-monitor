import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text
} from "react-native";
import ScreenMenuComponent from "../../components/ScreenMenuComponent";
import ScreenHeaderComponent from "../../components/ScreenHeaderComponent";
import { CONFIGSCREENMENU } from "./../../utils/constants"
import { CONFIGLOGOHEADER } from "./../../utils/constants";

export type Props = {
  navigation:any
};

const ConfigScreen: React.FC<Props> = ({
  navigation
  })=>{

  //useStates and useEffects
  

  return (
    <SafeAreaProvider style={styles.container}>
      <ScreenHeaderComponent headerComponentProps={CONFIGLOGOHEADER}/>
      <ScreenMenuComponent navigation={navigation} menuList={CONFIGSCREENMENU}/>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 1
  },
});

export default ConfigScreen;
