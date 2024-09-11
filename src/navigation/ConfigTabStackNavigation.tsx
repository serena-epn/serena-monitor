import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from 'react-i18next';

import ConfigScreen from "../screens/Config/ConfigScreen";
import ConfigCaregiverScreen from "../screens/Config/ConfigCaregiverScreen";
import ConfigPatientScreen from "../screens/Config/ConfigPatientScreen";
import { Button, Icon } from "@rneui/themed";

const Stack = createNativeStackNavigator();

export type Props = {
    
  };

const ConfigTabStackNavigation: React.FC<Props> = ({
    
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
        name="ConfigScreen"
        component={ConfigScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfigCaregiverScreen"
        component={ConfigCaregiverScreen}
        //options={{ title: t("CONFIG_CAREGIVER_HEADER"),headerShown: true,headerBackTitle:t("BACK")}}
        options={({ navigation, route }) => ({
          title: t("CONFIG_CAREGIVER_HEADER"),headerShown: true,headerBackTitle:t("BACK"),
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
        name="ConfigPatientScreen"
        component={ConfigPatientScreen}
        options={({ navigation, route }) => ({
          title: t("CONFIG_PATIENT_HEADER"),headerShown: true,headerBackTitle:t("BACK"),
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
    
    </Stack.Navigator>
  );
}

export default ConfigTabStackNavigation;

