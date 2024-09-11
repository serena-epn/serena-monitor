import React, { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Slider, Icon,Button } from "@rneui/themed";

//imports

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import MapView, { Circle, Marker } from "react-native-maps";

import { TCoordinate } from "../../types/CustomTypes";
import useAppStoreHook from "../../store/appStore";
import api from "../../utils/api";
import mapStyle from "./../../utils/mapStyle.json"

export type Props = {
  navigation:any
};


const DeviceZonesScreen: React.FC<Props> = ({
  navigation
  })=>{
  //useStates and useEffects
  const {appUser,setUser,mapConfig} = useAppStoreHook();

  

  const [origin, setOrigin] = React.useState<TCoordinate>({
    latitude: appUser.zone.latitude, 
    longitude: appUser.zone.longitude
  });

  const [zoneRadius, setZoneRadius] = React.useState<number>(appUser.zone.radius*1000);
  const [initialSliderValue, ] = React.useState<number>(appUser.zone.radius*1000);


const [saveEnabled,setSaveEnabled] = useState<boolean>(false);


const handleGuardar=()=>{

   Alert.alert(
    'Confirmación',
    '¿Está seguro de que desea guardar?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          // Lógica cuando se confirma la acción
          
  console.log('Acción confirmada');
          
  console.log('zoneRadius ......')
  console.log(zoneRadius)
  

  //await setUser({...appUser,zone:{})

  console.log('target appUser')
  console.log({
    _id: appUser.zone._id,
    latitude: origin.latitude,
    longitude: origin.longitude,
    radius: zoneRadius/1000,
  })

  api.put("/zone",{
    
    _id: appUser.zone._id,
    latitude: origin.latitude,
    longitude: origin.longitude,
    radius: zoneRadius/1000,
  
})
.then(response=>{
  console.log("Respuesta: "+JSON.stringify(response.data))

  api.post("/auth/getfromjwt",{
    jwt:appUser.access_token
  })
  .then(response=>{
    console.log("Respuesta: "+JSON.stringify(response.data))

    setUser(response.data)
    setUser({...appUser,zone:{_id: appUser.zone._id,
      latitude: origin.latitude,
      longitude: origin.longitude,
      radius: zoneRadius/1000}})

  })
  .catch(error=>{
    console.log("Error: "+error)
  });
  
  

})
.catch(error=>{
  console.log("Error: "+error)
});


        },
      },
    ],
    { cancelable: false }
  );

  
  // console.log("printGuardar")
  // console.log(patientLastName)
  // console.log(patientIdNumber)
  // console.log(patientBirthDate)
  // console.log(patientContactInfo)
}



  

useEffect(()=>{
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity disabled={!saveEnabled} onPress={handleGuardar} style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
          <Icon
            name="save"
            type="material"
            color={saveEnabled?"#FFF":"#909090"}
            size={26}
          />
      </TouchableOpacity>
    ),
  });

  


},[navigation,saveEnabled,styles,zoneRadius,origin]);


  return (
    <SafeAreaProvider style={styles.container}>

<MapView
        style={styles.map}
        showsUserLocation={true}
        key={mapConfig.isDark ? "dark" : "light"} 
        userInterfaceStyle={mapConfig.isDark ? "dark" : "light"}
        customMapStyle={mapConfig.isDark ? mapStyle : undefined}
        
        
        showsCompass={true}
        showsScale={true}
        loadingEnabled={true}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(direction) => {
            //console.log('onDragEnd', direction)
            setOrigin(direction.nativeEvent.coordinate)
            console.log("Marker set")
          }
          }
          //onSelect={e => console.log('onSelect', e)}
          //onDrag={e => console.log('onDrag', e)}
          //onDragStart={e => console.log('onDragStart', e)}
          //onPress={e => console.log('onPress', e)}
        />
        <Circle
          center={origin}
          radius={zoneRadius}
          strokeWidth={2}
          strokeColor="#452ea6"
          fillColor="#f8a60233"
        />
      </MapView>
      <View style={styles.zoneConfigContainer}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>Configurar zona segura</Text>
          <View style={styles.sliderContainer}>
          <Slider
              animateTransitions
              animationType="timing"
              maximumTrackTintColor="#ccc"
              maximumValue={1500}
              minimumTrackTintColor="#222"
              minimumValue={100}
              onSlidingComplete={(value) =>
                {console.log("onSlidingComplete() ",value)
                  setZoneRadius(value);
                }
                
              }
              onSlidingStart={() =>
                {console.log("onSlidingStart()")}
              }
              onValueChange={value =>{
                  console.log("onValueChange()", value)
                  
                  console.log('set radius: ',zoneRadius)
                  setSaveEnabled(true);
                }
              }
              orientation="horizontal"
              step={10}
              style={styles.sliderStyle}
              thumbStyle={{ height: 20, width: 20 }}
              thumbProps={{
                children: (
                  <Icon
                    name="gps-fixed"
                    type="material"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color="#f2a700"
                  />
                )
              }}
              thumbTintColor="#0c0"
              thumbTouchSize={{ width: 40, height: 40 }}
              trackStyle={{ height: 10, borderRadius: 20 }}
              value={initialSliderValue}
            />
            <View style={styles.sliderTextContainer}>
              <Text style={styles.sliderText}>{zoneRadius} m</Text>
            </View>
          </View>

      

        {/* <Button radius={"lg"} type="solid" buttonStyle={{
                backgroundColor: 'rgba(69,46,166,255)',
                paddingTop:8,
                paddingBottom:8,
                paddingHorizontal:40,
                marginTop:10,
              }}
              iconPosition='left'
              icon={<Icon name="save" size={15} color="#FFF" />}
              >
          
          Guardar
        </Button> */}
    
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "60%",
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

export default DeviceZonesScreen;


