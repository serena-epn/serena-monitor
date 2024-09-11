import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from 'react-i18next';

import DeviceScreen from "../screens/Device/DeviceScreen";
import DeviceStatusScreen from "../screens/Device/DeviceStatusScreen";
import DeviceZonesScreen from "../screens/Device/DeviceZonesScreen";
import DeviceConfigScreen from "../screens/Device/DeviceConfigScreen";
import DeviceMapsScreen from "../screens/Device/DeviceMapsScreen";
import { Icon } from "@rneui/themed";

const Stack = createNativeStackNavigator();

export type Props = {
    
  };

const DeviceTabStackNavigation: React.FC<Props> = ({
    
})=>{
  const {t,i18n}=useTranslation();

  return (
    <Stack.Navigator
    screenOptions={
      {
        headerStyle: {
          backgroundColor: '#452ea6',
        },
        headerTintColor:'#FFFFFF',
      }
    }
    >
      <Stack.Screen
        name="DeviceScreen"
        component={DeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeviceStatusScreen"
        component={DeviceStatusScreen}
        options={{ title: t("DEVICE_STATUS_HEADER"),headerShown: true,headerBackTitle:t("BACK")}}
      />
      <Stack.Screen
        name="DeviceZonesScreen"
        component={DeviceZonesScreen}
        //options={{ title: t("DEVICE_ZONES_HEADER"),headerShown: true,headerBackTitle:t("BACK")}}
        options={({ navigation, route }) => ({
          title: t("DEVICE_ZONES_HEADER"),headerShown: true,headerBackTitle:t("BACK"),
          headerRight: () => (
            <Icon
            name="save"
            type="material"
            color={"#909090"}
            size={26}
          />
          ),
        })}
      />
      <Stack.Screen
        name="DeviceConfigScreen"
        component={DeviceConfigScreen}
        //options={{ title: t("DEVICE_CONFIG_HEADER"),headerShown: true,headerBackTitle:t("BACK")}}
        options={({ navigation, route }) => ({
          title: t("DEVICE_CONFIG_HEADER"),headerShown: true,headerBackTitle:t("BACK"),
          headerRight: () => (
            <Icon
            name="save"
            type="material"
            color={"#909090"}
            size={26}
          />
          ),
        })}
      />
      <Stack.Screen
        name="DeviceMapsScreen"
        component={DeviceMapsScreen}
        options={{ title: t("DEVICE_MAPS_HEADER"),headerShown: true,headerBackTitle:t("BACK")}}
      />
    
    </Stack.Navigator>
  );
}

export default DeviceTabStackNavigation;

