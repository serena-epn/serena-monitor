import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text
} from "react-native";

export type Props = {
  //NAVIGATION:any
};


const MainScreen: React.FC<Props> = ({
  //navigation
  })=>{
  //useStates and useEffects
  

  return (
    <SafeAreaProvider>

      <Text>Usuario: Danilo Pilacuán</Text>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
});

export default MainScreen;
