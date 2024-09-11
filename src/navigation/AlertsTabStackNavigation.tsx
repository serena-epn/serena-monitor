import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useTranslation} from 'react-i18next';

import AlertsScreen from '../screens/Alerts/AlertsScreen';
import AlertsConfigScreen from '../screens/Alerts/AlertsConfigScreen';
import AlertsListScreen from '../screens/Alerts/AlertsListScreen';
import AlertDetailsScreen from '../screens/Alerts/AlertDetailsScreen';

const Stack = createNativeStackNavigator();

export type Props = {};

const AlertsTabStackNavigation: React.FC<Props> = ({}) => {
  const {t, i18n} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#452ea6',
        },
        headerTintColor: '#FFFFFF',
      }}>
      <Stack.Screen
        name="AlertsScreen"
        component={AlertsScreen}
        options={{headerShown: false, headerBackTitle: t('BACK')}}
      />
      <Stack.Screen
        name="AlertsConfigScreen"
        component={AlertsConfigScreen}
        options={{
          title: t('ALERTS_CONFIG_HEADER'),
          headerShown: true,
          headerBackTitle: t('BACK'),
        }}
      />
      <Stack.Screen
        name="LocationAlertsScreen"
        component={AlertsListScreen}
        initialParams={{alertsType: 1}}
        options={{
          title: t('ALERTS_LOCATION_HEADER'),
          headerShown: true,
          headerBackTitle: t('BACK'),
        }}
      />
      <Stack.Screen
        name="EmergencyAlertsScreen"
        component={AlertsListScreen}
        initialParams={{alertsType: 2}}
        options={{
          title: t('ALERTS_EMERGENCY_HEADER'),
          headerShown: true,
          headerBackTitle: t('BACK'),
        }}
      />
      <Stack.Screen
        name="BatteryAlertsScreen"
        component={AlertsListScreen}
        options={{
          title: t('ALERTS_BATTERY_HEADER'),
          headerShown: true,
          headerBackTitle: t('BACK'),
        }}
        initialParams={{alertsType: 3}}
      />
      {/* <Stack.Screen
        name="MiscAlertsScreen"
        component={AlertsListScreen}
        initialParams={
          {alertsType:4}
        }
        options={{ title: t("ALERTS_MISC_HEADER"),headerShown: true,headerBackTitle:t("BACK")}}
      /> */}
      <Stack.Screen
        name="AlertsHistoryScreen"
        component={AlertsListScreen}
        initialParams={{alertsType: null}}
        options={{
          title: t('ALERTS_HISTORY_HEADER'),
          headerShown: true,
          headerBackTitle: t('BACK'),
        }}
      />

      <Stack.Screen
        name="AlertDetailsScreen"
        component={AlertDetailsScreen}
        // initialParams={
        //   {alert:null}
        // }
        options={{
          title: t('ALERTS_DETAILS_HEADER'),
          headerShown: true,
          headerBackTitle: t('BACK'),
        }}
      />
    </Stack.Navigator>
  );
};

export default AlertsTabStackNavigation;
