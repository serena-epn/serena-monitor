import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from 'react-i18next';
import BottomTabsNavigation from "./BottomTabsNavigation";

const Stack = createNativeStackNavigator();

export type Props = {
    
  };

const AppStack: React.FC<Props> = ({
    
})=>{
  const {t,i18n}=useTranslation();

  return (
    <Stack.Navigator >

      <Stack.Screen
        name="BottomTabsNavigation"
        component={BottomTabsNavigation}
        options={{ title: t("MAP_SCREEN"),headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppStack;