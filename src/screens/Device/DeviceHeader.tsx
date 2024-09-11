import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text
} from "react-native";

export type Props = {
  //navigation:any
};


const DeviceHeader: React.FC<Props> = ({
  //navigation
  })=>{
  //useStates and useEffects
  

  return (
    <SafeAreaProvider style={styles.container}>

      <Text>Header</Text>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 0,
    paddingBottom: 0
   },
});

export default DeviceHeader;
