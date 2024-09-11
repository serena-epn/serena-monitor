import React, { useState, useEffect } from "react";

// import type { PropsWithChildren } from "react";
// import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

import { FAB,Card,Icon,SpeedDial } from '@rneui/themed';

import MapView, { Circle, Marker } from "react-native-maps";
import socketInitializer from "../../utils/socket";
import useAppStoreHook from "../../store/appStore";

import mapStyle from "./../../utils/mapStyle.json"

export type Props = {
  //navigation:any
};


const MapScreen: React.FC<Props> = ({
  //navigation
  })=>{
  const [origin, setOrigin] = React.useState({
    latitude: -0.222620, 
    longitude: -78.511312,
  });

  const [region, setRegion] = useState({
    latitude: -0.222620, 
    longitude: -78.511312,
    latitudeDelta: 0.0922, // Diferencia en latitud que se muestra en el mapa
    longitudeDelta: 0.0421, // Diferencia en longitud que se muestra en el mapa
  });



  const [count, setCount] = useState(0);
  const [infoVisible, setInfoVisible] = useState(false);
  //const [count, setCount] = useState(0);
  //const [count, setCount] = useState(0);

  const {loginUser,appUser,logoutUser,mapConfig} = useAppStoreHook();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log("useEffect ok");
    //socket.emit("events", { data: "ok1" });
    //socket.emit("testClient", { data: "ok2" });
    console.log('appUser .....')
    console.log(appUser)
    const socket = socketInitializer(appUser?appUser.device.imei:'')
    
    
    socket.on("updateGeoLoc", (data:any) => {
      console.log("updateGeoLoc");
      console.log(data);
      const newOrigin={latitude:data.data.latitude,longitude:data.data.longitude}
      console.log('newOrigin')
      console.log(newOrigin)
      setOrigin(newOrigin);

      setRegion(prevRegion=>({
        ...prevRegion,
        latitude: newOrigin.latitude,
        longitude: newOrigin.longitude,
      }))
    });

  }, [socketInitializer]);

  

  return (
    <SafeAreaProvider>
      
      <View style={styles.container}>
        
      <MapView
              style={styles.map}
              
              //provider={PROVIDER_GOOGLE}
              //mapType="mutedStandard"
              key={mapConfig.isDark ? "dark" : "light"} 
              userInterfaceStyle={mapConfig.isDark ? "dark" : "light"}
              customMapStyle={mapConfig.isDark ? mapStyle : undefined}
              showsUserLocation={true}
              showsCompass={true}
              showsScale={true}
              loadingEnabled={true}
              initialRegion={region}
              region={region}
            >
              <Marker
                coordinate={origin}
              />
              <Circle
                center={{latitude:appUser.zone.latitude,longitude:appUser.zone.longitude}}
                radius={appUser.zone.radius*1000}
                strokeWidth={2}
                strokeColor="#452ea6"
                fillColor="#f8a60233"
              />
            </MapView>
      
      <View style={styles.topArea}>
        <FAB
          visible={true}
          icon={{ name: 'zoom-in', color: 'white',type:'foundation'}}
          color="#A0A0A0"
          size='large'
          style={{marginBottom:5}}
          onPress={
            ()=>{
              setRegion((prevRegion) => ({
                ...prevRegion,
                latitudeDelta: prevRegion.latitudeDelta / 2,
                longitudeDelta: prevRegion.longitudeDelta / 2,
              }));
            }
          }
        />
        <FAB
          visible={true}
          icon={{ name: 'zoom-out', color: 'white',type:'foundation' }}
          color="#A0A0A0"
          size='large'
          style={{marginBottom:5}}
          onPress={()=>{
            setRegion((prevRegion) => ({
              ...prevRegion,
              latitudeDelta: prevRegion.latitudeDelta * 2,
              longitudeDelta: prevRegion.longitudeDelta * 2,
            }));
          }}
        />
        <FAB
          visible={true}
          icon={{ name: 'gps-fixed', color: 'white' }}
          color="#f8a602"
          size='large'
          style={{marginBottom:5}}
          onPress={()=>
            {
              const newOrigin={latitude:appUser.zone.latitude,longitude:appUser.zone.longitude}
              console.log('newOrigin')
              console.log(newOrigin)
              //setOrigin(newOrigin);

              setRegion(prevRegion=>({
                ...prevRegion,
                latitude: prevRegion.latitude*2.1,
                longitude: prevRegion.longitude*2.1,
              }))

              setRegion(prevRegion=>({
                ...prevRegion,
                latitude: newOrigin.latitude,
                longitude: newOrigin.longitude,
              }))

              console.log(region)

            }
          }
        />
      </View>
      {infoVisible &&<View style={styles.bottomArea}>
        <Card containerStyle={{flex:1,flexGrow:1,borderRadius:20,paddingHorizontal:45}} wrapperStyle={{}}>
      <Card.Title>{appUser?.patient?.name +" "+ appUser?.patient?.lastname}</Card.Title>
      <Card.Divider />
      <View
        style={{
          width:'100%',
          position: "relative",
          alignItems: "center",
        }}
      >
        <Icon
        name='watch' size={50} color='green'/>
        <Text>Estado: Ok</Text>
        <Text>Dentro de zona segura: Si</Text>
      </View>
    </Card>
      </View>}
      <View style={styles.bottomFab}>

        {/* <Text>Usuario: Danilo Pilacuán</Text>
        <Text>Latitud: {origin.latitude}</Text>
        <Text>Longitud: {origin.longitude}</Text> */}
        <FAB
          visible={true}
          size='small'
          icon={{ name: infoVisible?'close':'info', color: 'white' }}
          color={infoVisible?'#ad1457':"#3188dc"}
          onPress={()=>{setInfoVisible(!infoVisible)}}
        />
        
      </View>

      
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:90,
    height:'100%'
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    flex:1
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomArea:{
    position: 'absolute',
    bottom:100,
    right:0,
    paddingRight:0,
    alignItems:'flex-end',
    width:'100%'
  },
  topArea:{
    position: 'absolute',
    top:10,
    right:0,
    paddingRight:10,
    alignItems:'flex-end'
  },
  bottomFab:{
    position: 'absolute',
    bottom:100,
    right:0,
    paddingRight:10,
    alignItems:'flex-end',
    
  }
  
});

export default MapScreen;
