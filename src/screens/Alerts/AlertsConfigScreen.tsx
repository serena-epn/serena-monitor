import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text
} from "react-native";
import { CheckBox } from "@rneui/themed";
import useAppStoreHook from "../../store/appStore";

export type Props = {
  //navigation:any
};


const AlertsConfigScreen: React.FC<Props> = ({
  //navigation
  })=>{
  //useStates and useEffects
  
  const {alertsConfig,setAlertsConfig} = useAppStoreHook()

  return (
    <SafeAreaProvider style={styles.container}>

    <CheckBox
      center
      title="Recibir Alertas de Zona Segura"
      checked={alertsConfig.locationEnabled}
      //checkedColor="#f8a602"
      checkedColor="#000"
      onPress={() => {
        setAlertsConfig(
          {
            ...alertsConfig,
            locationEnabled:!alertsConfig.locationEnabled,
          }
          )
        }
      }
    />
    <CheckBox
      center
      title="Recibir Alertas de Emergencias"
      checked={alertsConfig.emergenciesEnabled}
      //checkedColor="#f8a602"
      checkedColor="#000"
      onPress={() => {
        setAlertsConfig(
          {
            ...alertsConfig,
            emergenciesEnabled:!alertsConfig.emergenciesEnabled,
          }
          )
        }
      }
    />
    <CheckBox
      center
      title="Recibir Alertas de Batería"
      checked={alertsConfig.batteryEnabled}
      //checkedColor="#f8a602"
      checkedColor="#000"
      onPress={() => {
        setAlertsConfig(
          {
            ...alertsConfig,
            batteryEnabled:!alertsConfig.batteryEnabled,
          }
          )
        }
      }
    />
    <CheckBox
      center
      title="Recibir Alertas Adicionales"
      checked={alertsConfig.miscEnabled}
      //checkedColor="#f8a602"
      checkedColor="#000"
      onPress={() => {
        setAlertsConfig(
          {
            ...alertsConfig,
            miscEnabled:!alertsConfig.miscEnabled
          }
          )
        }
      }
    />
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 1,
    paddingBottom: 0,
    alignItems:'flex-start',
    backgroundColor:"#FFF"
   },
});

export default AlertsConfigScreen;
