import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import { Icon } from "@rneui/themed";

import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from "../screens/Map/MapScreen";
import DeviceTabStackNavigation from "./DeviceTabStackNavigation";
import ConfigTabStackNavigation from "./ConfigTabStackNavigation";
import HelpTabStackNavigation from "./HelpTabStackNavigation";
import AlertsTabStackNavigation from "./AlertsTabStackNavigation";

const Tab = createBottomTabNavigator();

export type Props = {

};

const BottomTabsNavigation: React.FC<Props> = ({

}) => {
  const { t, i18n } = useTranslation();

  return (

    <Tab.Navigator
      
      screenOptions={{
        "tabBarHideOnKeyboard": true,
        "tabBarShowLabel": false,
        "tabBarStyle": [
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            height: 90,
          }
        ],
        headerShown: false
      }}
    >

      <Tab.Screen name="ConfigTabStackNavigation" component={ConfigTabStackNavigation} options={{
        headerShown: false,
        tabBarActiveTintColor: '#452ea6',
        tabBarLabel: 'ConfigTabStackNavigation',
        tabBarIcon: ({ color, size, focused }) => (
          <View>
            <Icon
              name='settings'
              type='material'
              color={color} size={size}
            />
            <Text style={{ "color": color, "fontSize": 10 }}>{t("CONFIG_TAB")}</Text>
          </View>
        ),
      }} />

      <Tab.Screen name="DeviceTabStackNavigation" component={DeviceTabStackNavigation} options={{
        headerShown: false,
        tabBarActiveTintColor: '#452ea6',
        tabBarLabel: 'DeviceTabStackNavigation',
        tabBarIcon: ({ color, size, focused }) => (
          <View>
            
            <Icon
              name='watch'
              type='material'
              color={color} size={size}
            />
            <Text style={{ "color": color, "fontSize": 10 }}>{t("DEVICE_TAB")}</Text>
          </View>
        ),
      }} />

      <Tab.Screen name="MapScreen" component={MapScreen} options={{
        headerShown: true,
        tabBarActiveTintColor: '#452ea6',
        title: t("MAP_SCREEN_HEADER"),
        tabBarLabel: t("MAP_SCREEN_HEADER"),
        headerStyle: {
          backgroundColor: '#452ea6',
        },
        headerTintColor:'#FFFFFF',
        tabBarIcon: ({ color, size, focused }) => (
          <View style={{backgroundColor:color,borderRadius:200,padding:10}}>
            <Icon
              name='person-pin'
              type='material'
              color={"#FFF"} size={size}
            />
            <Text style={{ "color": "#FFF", "fontSize": 10 }}>{t("MAP_TAB")}</Text>
          </View>
        ),
      }} />

      <Tab.Screen name="AlertsTabStackNavigation" component={AlertsTabStackNavigation} options={{
        headerShown: false,
        tabBarActiveTintColor: '#452ea6',
        tabBarLabel: 'AlertsTabStackNavigation',
        tabBarIcon: ({ color, size, focused }) => (
          <View>
            <Icon
              name='notifications'
              type='material'
              color={color} size={size}
            />
            <Text style={{ "color": color, "fontSize": 10 }}>{t("ALERTS_TAB")}</Text>
          </View>
        ),
      }} />

      <Tab.Screen name="HelpTabStackNavigation" component={HelpTabStackNavigation} options={{
        headerShown: false,
        tabBarActiveTintColor: '#452ea6',
        tabBarLabel: 'HelpTabStackNavigation',
        tabBarIcon: ({ color, size, focused }) => (
          <View>
            <Icon
              name='help'
              type='material'
              color={color} size={size}
            />
            <Text style={{ "color": color, "fontSize": 10 }}>{t("TUTORIAL_TAB")}</Text>
          </View>
        ),
      }} />

    </Tab.Navigator>

  );
}

export default BottomTabsNavigation;