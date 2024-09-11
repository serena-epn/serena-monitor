import React,{ useEffect } from "react";
import { StyleSheet, SafeAreaView, Dimensions, TextInput, Alert, View, Text } from "react-native";
import { Button, Image } from "@rneui/base";
import { useTranslation } from 'react-i18next';


import useAppStoreHook from "../../store/appStore";

import api from "../../utils/api";
import { TUser } from "../../types/CustomTypes";

export type Props = {
  navigation: any
};

const LoginScreen: React.FC<Props> = ({
  navigation
}) => {

  

  const {loginUser,applicationToken,appUser} = useAppStoreHook();

  const navigate = (page: string) => {
    navigation.navigate(page);
  };

  const {t,i18n}=useTranslation();

  const [correo, onChangeCorreo] = React.useState('');
  const [contrasenia, onChangePassword] = React.useState('');
  const [mailOk, setMailOk] = React.useState(true);
  const [mailInput, setMailInput] = React.useState(true);

  const validate = (text: string) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      onChangeCorreo(text)
      setMailOk(false)
      setMailInput(true)
      return false;
    }
    else {
      onChangeCorreo(text)
      console.log("Email is Correct");
      setMailOk(true)
      setMailInput(true)
    }
  }

  useEffect(()=>{

  },[correo,contrasenia])

  const getZustandData=async()=>{
    console.log("zustand")
    console.log(appUser)
  }
  
  const loginRequest=async()=>{
    console.log("looooooo")
    api.post("/auth/login",{
      
        "username": correo,
        "password": contrasenia,
        "applicationToken":applicationToken
      
    })
    .then(response=>{
      console.log("Respuesta: "+JSON.stringify(response.data))

      loginUser(
        {
          ...response.data.user
        }
      )




    })
    .catch(error=>{
      console.log("Error: "+error)
    });

  }

  const signInUser = async () => {
    //const {email, password} = values;
    console.log("Sign Inn1111111112nnnnnn");

      const userAttributes:TUser = {
        
        "_id": "65b8b3e451fe612589cb8e31",
        "name": "Juan",
        "lastname": "Molina",
        "birthdate": "01/01/1985",
        "phone": "0987171345",
        "email": "juan.molina@gmail.com",
        "idNumber": "1724564756",
        "deviceId": "AFDFR343",
        "zone":"",
        "device":"",
        "patient": {
          "_id": "65b89d599696ae642ac9e14e",
          "name": "Mario",
          "lastname": "Molina",
          "birthdate": "02/02/1943",
          "contactInfo": "0982838232",
          "idNumber": "040034232",
          "deviceId": "353534534",
          
        },
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWI4YjNlNDUxZmU2MTI1ODljYjhlMzEiLCJ1c2VybmFtZSI6Ikp1YW4iLCJpYXQiOjE3MDY4NzM2NzYsImV4cCI6MTcwNjg3NDI3Nn0.7VAXgOQqTrCVKzzhQbPlrshEtsVrFBQbUoSM7L3RIAA",
      }

      loginUser(        
        userAttributes    
      )

      

      // dispatch({
      //   type: AuthActions.SignIn,
      //   accessToken:  "11111iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      //   userAttributes: userAttributes,
      // });


  };


  return (
    <SafeAreaView style={styles.container}>

      <TextInput style={styles.input} onChangeText={(text) => validate(text)} value={correo} placeholder={t("MAIL")}
        keyboardType="email-address"
        autoCapitalize={'none'}
      />

      {mailOk == false && mailInput == true && <Text style={{ color: '#FF0000' }}>{t("WRONG_MAIL")}</Text>}

      <TextInput
        value={contrasenia}
        onChangeText={onChangePassword}
        placeholder={t("PASSWORD")}
        secureTextEntry={true}
        style={styles.input}
      />


      <Button disabled={!(mailOk && mailInput)} buttonStyle={styles.button} containerStyle={styles.buttonContainer} title={t("LOGIN")} onPress={() => loginRequest()} />
      {/* <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer} title={"testToken"} onPress={() => getZustandData()} /> */}
      <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer} title={t("FORGOT_PASSWORD")} onPress={() => {signInUser()}} />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  button: {
    flexDirection: "row",
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#452ea6',

  },
  buttonContainer: {
    width: '80%',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 200,
  },
  input: {
    width: "80%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default LoginScreen;