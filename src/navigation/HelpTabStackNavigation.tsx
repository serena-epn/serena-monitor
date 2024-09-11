import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from 'react-i18next';

import HelpScreen from "../screens/Help/HelpScreen";
// import ConfigCaregiverScreen from "../screens/Config/ConfigCaregiverScreen";
// import ConfigPatientScreen from "../screens/Config/ConfigPatientScreen";

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
        name="HelpScreen"
        component={HelpScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ConfigCaregiverScreen"
        component={ConfigCaregiverScreen}
        options={{ title: "ConfigCaregiverScreen",headerShown: true,headerBackTitle:t("BACK")}}
      />
      <Stack.Screen
        name="ConfigPatientScreen"
        component={ConfigPatientScreen}
        options={{ title: "ConfigPatientScreen",headerShown: true,headerBackTitle:t("BACK")}}
      /> */}
    
    </Stack.Navigator>
  );
}

export default ConfigTabStackNavigation;

