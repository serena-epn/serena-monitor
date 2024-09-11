import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import useAppStoreHook from "../../store/appStore";
import { Button, Icon, Input } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import api from "../../utils/api";

export type Props = {
  navigation: any;
};

const ConfigPatientScreen: React.FC<Props> = ({ navigation }) => {
  const { appUser, setUser } = useAppStoreHook();

  const [patientName, setPatientName] = useState<string>(appUser?.patient?.name + "");
  const [patientLastName, setPatientLastName] = useState<string>(appUser?.patient?.lastname + "");
  const [patientIdNumber, setPatientIdNumber] = useState<string>(appUser?.patient?.idNumber + "");
  const [patientBirthDate, setPatientBirthDate] = useState<string>(appUser?.patient?.birthdate + "");
  const [patientContactInfo, setPatientContactInfo] = useState<string>(appUser?.patient?.contactInfo + "");

  const [saveEnabled, setSaveEnabled] = useState<boolean>(false);

  const handleGuardar = async () => {
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
            
            api.put("/patient",{
              ...appUser.patient,
              name:patientName,
              lastname:patientLastName,
              phone:patientContactInfo,
              idNumber:patientIdNumber,
              
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
    

            // Aquí deberías agregar la lógica para guardar la configuración
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={!saveEnabled} onPress={handleGuardar} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Icon
            name="save"
            type="material"
            color={saveEnabled ? "#FFF" : "#909090"}
            size={26}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, saveEnabled,patientName,
    patientLastName,
    patientIdNumber,
    patientBirthDate,
    patientContactInfo,]);

  const handleNameChange = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z ]/g, '');
    setPatientName(filteredText);
    setSaveEnabled(true);
  };

  const handleLastNameChange = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z ]/g, '');
    setPatientLastName(filteredText);
    setSaveEnabled(true);
  };

  const handleIdNumberChange = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setPatientIdNumber(filteredText);
    setSaveEnabled(true);
  };

  const handlePhoneChange = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setPatientContactInfo(filteredText);
    setSaveEnabled(true);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <Input
          label="Nombre"
          placeholder="Nombre"
          leftIcon={{ type: 'material', name: 'person' }}
          value={patientName}
          onChangeText={handleNameChange}
        />
        <Input
          label="Apellido"
          placeholder="Apellido"
          leftIcon={{ type: 'material', name: 'person' }}
          value={patientLastName}
          onChangeText={handleLastNameChange}
        />
        <Input
          label="Cédula"
          placeholder="17XXXXXXXX"
          leftIcon={{ type: 'material', name: 'badge' }}
          value={patientIdNumber}
          onChangeText={handleIdNumberChange}
          maxLength={10}
          keyboardType="numeric"
        />
        <Input
          label="Teléfono de contacto"
          placeholder="10 dígitos"
          leftIcon={{ type: 'material', name: 'phone' }}
          value={patientContactInfo}
          onChangeText={handlePhoneChange}
          maxLength={10}
          keyboardType="numeric"
        />
        <Input
          disabled
          label="Fecha de Nacimiento"
          placeholder="YYYY-MM-DD"
          leftIcon={{ type: 'material', name: 'event' }}
          value={patientBirthDate}
          
        />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
    backgroundColor: "#FFF"
  }
});

export default ConfigPatientScreen;
