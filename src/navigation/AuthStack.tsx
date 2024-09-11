import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/Auth/AuthScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RecoverScreen from "../screens/Auth/RecoverScreen";

import { useTranslation } from 'react-i18next';
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HelpAuthScreen from "../screens/Auth/HelpAuthScreen";

const Stack = createNativeStackNavigator();

export type Props = {
    
  };

const AuthStack: React.FC<Props> = ({
    
})=>{
  const {t,i18n}=useTranslation();

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: "Registrarse",headerShown: true,headerBackTitle:t("BACK")}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: t("LOGIN_SCREEN"),headerBackTitle:t("BACK")}}
      />
      <Stack.Screen
        name="RecoverScreen"
        component={RecoverScreen}
        options={{ title: t("RECOVER_PASSWORD_SCREEN"),headerBackTitle:t("BACK")}}
      />
      <Stack.Screen
        name="HelpAuthScreen"
        component={HelpAuthScreen}
        options={{ title: t("HELP_SCREEN"),headerBackTitle:t("BACK")}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;

