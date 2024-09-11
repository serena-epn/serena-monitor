import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import useAppStoreHook from "../../store/appStore";
import { Icon, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import api from "../../utils/api";

export type Props = {
  navigation:any
};


const ConfigCaregiverScreen: React.FC<Props> = ({
  navigation
  })=>{
  //useStates and useEffects
  
  

  const {appUser,setUser} = useAppStoreHook();

  const [userName,setUserName] = useState<string>(appUser?.name);
  const [userLastName,setUserLastName] = useState<string>(appUser?.lastname);
  const [userIdNumber,setUserIdNumber] = useState<string>(appUser?.idNumber);
  const [userBirthDate,setUserBirthDate] = useState<string>(appUser?.birthdate);
  const [userPhone,setUserPhone] = useState<string>(appUser?.phone);
  const [userEmail,setUserEmail] = useState<string>(appUser?.email);

  const [saveEnabled,setSaveEnabled] = useState<boolean>(false);

const handleGuardar=async()=>{
  Alert.alert(
    'Confirmación',
    '¿Está seguro de que desea guardar?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          // Lógica cuando se confirma la acción
        console.log(userName)
        console.log(userLastName)
        console.log(userIdNumber)
        console.log(userBirthDate)
        console.log(userPhone)
        console.log(userEmail)

        api.put("/user",{
          ...appUser,
          name:userName,
          lastname:userLastName,
          phone:userPhone,
          idNumber:userIdNumber,
          
        })
        .then(response=>{
          console.log("Respuesta: "+JSON.stringify(response.data))
      
          api.post("/auth/getfromjwt",{
            jwt:appUser.access_token
          })
          .then(response=>{
            console.log("Respuesta: "+JSON.stringify(response.data))
        
            setUser(response.data)
           
        
          })
          .catch(error=>{
            console.log("Error: "+error)
          });
          
      
        })
        .catch(error=>{
          console.log("Error: "+error)
        });

        },
      },
    ],
    { cancelable: false }
  );
  // console.log("printGuardar")
  // console.log(patientLastName)
  // console.log(patientIdNumber)
  // console.log(patientBirthDate)
  // console.log(patientContactInfo)
}

const handlePhoneChange = (text:string) => {
  // Filtrar solo números y limitar a 10 caracteres
  const numericValue = text.replace(/[^0-9]/g, '').slice(0, 10);
  setUserPhone(numericValue);
  setSaveEnabled(true);
};
const handleNameChange = (text:string) => {
  const filteredText = text.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
  setUserName(filteredText);
  setSaveEnabled(true);
};
const handleIdNumberChange = (text:string) => {
  const filteredText = text.replace(/[^0-9]/g, ''); // Solo permite números
  setUserIdNumber(filteredText);
  setSaveEnabled(true);
};

const handleLastNameChange = (text:string) => {
  const filteredText = text.replace(/[^a-zA-Z ]/g, ''); // Solo permite letras y espacios
  setUserLastName(filteredText);
  setSaveEnabled(true);
};
useEffect(()=>{
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity disabled={!saveEnabled} onPress={handleGuardar} style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
          <Icon
            name="save"
            type="material"
            color={saveEnabled?"#FFF":"#909090"}
            size={26}
          />
      </TouchableOpacity>
    ),
  });
},[navigation,saveEnabled,styles,userName,
  userLastName,
  userIdNumber,
  userBirthDate,
  userPhone,
  userEmail,]);



  return (
    <SafeAreaProvider style={styles.container}>
    <ScrollView>
        
    <Input
      label="Nombre"
      placeholder='10%'
      leftIcon={{ type: 'material', name: 'person' }}
      value={userName}
      onChangeText={handleNameChange}

      
    />
    <Input
      label="Apellido"
      placeholder='10%'
      leftIcon={{ type: 'material', name: 'person' }}
      value={userLastName}
      onChangeText={handleLastNameChange}

      
    />
        <Input
      label="Cédula"
      placeholder='17XXXXXXXX'
      leftIcon={{ type: 'material', name: 'badge' }}
      value={userIdNumber}
      onChangeText={handleIdNumberChange}
      maxLength={10}
      keyboardType="numeric"
    />
    
    <Input
      label="Teléfono"
      placeholder='09XXXXXXXX'
      leftIcon={{ type: 'material', name: 'phone' }}
      value={userPhone}
      onChangeText={handlePhoneChange}
      maxLength={10}
      keyboardType="numeric"
    />
    <Input
      label="Correo"
      disabled
      placeholder='10%'
      leftIcon={{ type: 'material', name: 'mail' }}
      value={userEmail}
      onChangeText={(text)=>{
        setUserEmail(text)
        setSaveEnabled(true)
      }}
      
    />
    <Input
      label="Fecha de Nacimiento"
      disabled
      placeholder='10%'
      leftIcon={{ type: 'material', name: 'event' }}
      value={userBirthDate}
      onChangeText={(text)=>{
        setUserBirthDate(text)
        setSaveEnabled(true)
      }}
      
    />

    </ScrollView>
    
      {/* <Text>{JSON.stringify(appUser)}</Text> */}
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 1,
    paddingBottom: 90,
    backgroundColor:"#FFF"
   },
});

export default ConfigCaregiverScreen;
