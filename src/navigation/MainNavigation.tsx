import React, { useState, useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef } from './NavigationService'; // Importa navigationRef desde NavigationService


//import Spinner from "react-native-loading-spinner-overlay";
import { StyleSheet } from "react-native";

//import {checkAuth} from '../services/auth';
//import {NavigationContainer, Stack} from './route';
//import {Route} from './route';
//import AppTabNavigator from './tab-navigator';

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import useAppStoreHook from "./../store/appStore";

const Stack = createNativeStackNavigator()

export type Props = {
  loading: boolean;
};

const MainNavigation: React.FC<Props> = ({
  loading = true
}) => {

  const {loginUser,appUser} = useAppStoreHook();

  
  const [, setLoading] = useState(false);
  


  const [spinner, setSpinner] = useState(true);

  // useEffect(() => {
  //   const bootstrapAsync = async () => {
      
      
            
      
  //     setLoading(false);
  //   };

  //   bootstrapAsync().then();
  // }, []);
  

  return (
    // <NavigationContainer>

    //   {!loading && (
    //     <Stack.Navigator screenOptions={{
    //       headerShown: false
    //     }} initialRouteName={"AuthStack"}>
    //       {/* <Stack.Screen name="LoginStack" component={LoginStack} />
    //       <Stack.Screen name="CamStack" component={CamStack} />
    //       <Stack.Screen name="BottomTabs" component={BottomTabs} /> */}
    //       <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
    //     </Stack.Navigator>
    //   )}
    //   {loading && (
    //     <Spinner
    //       visible={spinner}
    //       textContent={"Loading..."}
    //       textStyle={styles.spinnerTextStyle}
    //     />
    //   )}
    // </NavigationContainer>


    // <NavigationContainer>

    //   {!loading && (
    //     <Stack.Navigator screenOptions={{
    //       headerShown: false
    //     }} initialRouteName={"AuthStack"}>
    //       <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
    //     </Stack.Navigator>
    //   )}
    //   {loading && (
    //     <Spinner
    //       visible={spinner}
    //       textContent={"Loading..."}
    //       textStyle={styles.spinnerTextStyle}
    //     />
    //   )}
    // </NavigationContainer>


    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {!appUser._id ? (
            <Stack.Group>
              {/* <Stack.Screen
                name={Route.SIGN_IN}
                component={SignInScreen}
                options={SignInScreen.navigationOptions}
              /> */}
              <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Serena" component={AppStack} options={{ headerShown: false }} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>


  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default MainNavigation;
