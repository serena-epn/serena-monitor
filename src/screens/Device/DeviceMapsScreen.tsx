import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Slider, Icon,Button, CheckBox } from "@rneui/themed";

//imports

import {
  StyleSheet,
  Text,
  View
} from "react-native";

import MapView, { Circle, Marker } from "react-native-maps";

import { TCoordinate } from "../../types/CustomTypes";

import useAppStoreHook from "../../store/appStore";
import mapStyle from "./../../utils/mapStyle.json"

export type Props = {
  //navigation:any
};


const DeviceMapsScreen: React.FC<Props> = ({
  //navigation
  })=>{
  //useStates and useEffects

  

  const {mapConfig,setIsDarkMap} = useAppStoreHook()

  useEffect(() => {
    // This useEffect hook will run whenever mapConfig.isDark changes
    console.log("Map style updated: ", mapConfig.isDark ? "Dark" : "Light");
  }, [mapConfig.isDark]);
  
  const [origin, setOrigin] = React.useState<TCoordinate>({
    latitude: -0.222620, 
    longitude: -78.511312
  });

  const [radius, setRadius] = React.useState<number>(100);

  //const [isDark,setIsDark] = React.useState<boolean>(false);

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={{
        fontSize:16,
        fontWeight:'bold',
        margin:5
      }}>Vista Previa:</Text>
      <MapView
        key={mapConfig.isDark ? "dark" : "light"} 
        userInterfaceStyle={mapConfig.isDark ? "dark" : "light"}
        customMapStyle={mapConfig.isDark ? mapStyle : undefined}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >

      </MapView>
      <View style={styles.zoneConfigContainer}>
          

      <CheckBox
      center
      title="Mapa Oscuro"
      checked={mapConfig.isDark}
      //checkedColor="#f8a602"
      checkedColor="#000"
      onPress={() => {
        console.log(mapConfig.isDark)
        setIsDarkMap(!mapConfig.isDark)}}
    />

       
    
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
   container: {
    flex: 1,
    //padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: "90%",
    height: "50%",
  },
  zoneConfigContainer:
  {
    //backgroundColor:'#FFDD00',
    padding:10,
    flex:1,
    alignItems:'center'
  },
  sliderContainer:{
    width:'100%',
    paddingHorizontal:10,
    flex:0,
    alignContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginTop:10
  },
  sliderStyle:
  {
    width: "80%", 
    
  },
  sliderText:
  {
    fontSize:16,
    fontWeight:'bold',
    //fontStyle: 'italic'
  },
  sliderTextContainer:
  {
    width:'100%',
    paddingLeft: 15,

  }
});

export default DeviceMapsScreen;


