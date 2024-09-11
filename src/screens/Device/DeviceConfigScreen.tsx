import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
//imports
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import useAppStoreHook from '../../store/appStore';
import {Input, Icon, Button} from '@rneui/themed';
import api from '../../utils/api';

export type Props = {
  navigation: any;
};

const DeviceConfigScreen: React.FC<Props> = ({navigation}) => {
  //useStates and useEffects

  const {appUser, setUser} = useAppStoreHook();

  const [locationTimeInput, setLocationTimeInput] = useState<string>(
    appUser.device.locationTime + '',
  );
  const [batteryTimeInput, setBatteryTimeInput] = useState<string>(
    appUser.device.batteryTime + '',
  );
  const [batteryPercentageInput, setBatteryPercentageInput] = useState<string>(
    appUser.device.batteryPercentage + '',
  );

  const setStoreDeviceConfig = async () => {
    // console.log(appUser.device)
    // const newDeviceConfig:TDeviceConfig={
    //   locationTime:+locationTimeInput,
    //   batteryPercentage:+batteryPercentageInput,
    //   batteryTime:+batteryTimeInput,
    // }
    // console.log("newDeviceConfig")
    // console.log(newDeviceConfig)
    const deviceDtoObject = {
      ...appUser.device,
      locationTime: parseInt(locationTimeInput, 10),
      batteryTime: parseInt(batteryPercentageInput, 10),
      batteryPercentage: parseInt(batteryTimeInput, 10),
    };
    console.log('locationTimeInput');
    console.log(locationTimeInput);
    console.log('batteryPercentageInput');
    console.log(batteryPercentageInput);
    console.log('batteryTimeInput');
    console.log(batteryTimeInput);

    console.log('deviceDtoObject');
    console.log(deviceDtoObject);

    api
      .put('/device', deviceDtoObject)
      .then(response => {
        console.log('Respuesta: ' + JSON.stringify(response.data));

        api
          .post('/auth/getfromjwt', {
            jwt: appUser.access_token,
          })
          .then(response => {
            console.log('Respuesta: ' + JSON.stringify(response.data));

            setUser(response.data);
          })
          .catch(error => {
            console.log('Error: ' + error);
          });
      })
      .catch(error => {
        console.log('Error: ' + error);
      });

    //setDeviceConfig(newDeviceConfig)
  };

  const handleLocationTimeInputChange = async (text: string) => {
    // Filtrar solo números usando una expresión regular
    const numericValue = text.replace(/[^0-9]/g, '');
    console.log('-------------');
    console.log('numericValue');
    console.log(numericValue);
    setLocationTimeInput(numericValue);
    console.log('locationTimeInput');
    console.log(locationTimeInput);
  };

  const handleBatteryTimeInputChange = (text: string) => {
    // Filtrar solo números usando una expresión regular
    const numericValue = text.replace(/[^0-9]/g, '');
    setBatteryTimeInput(numericValue);
  };

  const handleBatteryPercentageInputChange = (text: string) => {
    // Filtrar solo números usando una expresión regular
    const numericValue = text.replace(/[^0-9]/g, '');
    setBatteryPercentageInput(numericValue);
  };

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
            // Lógica cuando se confirma la acción
            console.log('Acción confirmada');
            setStoreDeviceConfig();
          },
        },
      ],
      {cancelable: false},
    );
    // console.log("printGuardar")
    // console.log(patientLastName)
    // console.log(patientIdNumber)
    // console.log(patientBirthDate)
    // console.log(patientContactInfo)
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!saveEnabled}
          onPress={handleGuardar}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Icon
            name="save"
            type="material"
            color={saveEnabled ? '#FFF' : '#909090'}
            size={26}
          />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    saveEnabled,
    styles,
    locationTimeInput,
    batteryTimeInput,
    batteryPercentageInput,
  ]);

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.labels}>
        Tiempo desde abandono de zona segura para recibir alertas de abandono
      </Text>
      <Input
        placeholder="10 min"
        leftIcon={{type: 'material', name: 'timer'}}
        value={locationTimeInput}
        onChangeText={text => {
          handleLocationTimeInputChange(text);
          setSaveEnabled(true);
        }}
        keyboardType="numeric"
      />
      <Text style={styles.labels}>
        Porcentaje mínimo de batería para enviar alertas de baja batería
      </Text>
      <Input
        placeholder="10%"
        leftIcon={{type: 'material', name: 'percent'}}
        value={batteryPercentageInput}
        onChangeText={text => {
          handleBatteryPercentageInputChange(text);
          setSaveEnabled(true);
        }}
        keyboardType="numeric"
      />

      <Text style={styles.labels}>Tiempo entre alertas de baja batería</Text>
      <Input
        placeholder="10%"
        leftIcon={{type: 'material', name: 'schedule'}}
        value={batteryTimeInput}
        onChangeText={text => {
          handleBatteryTimeInputChange(text);
          setSaveEnabled(true);
        }}
        keyboardType="numeric"
      />

      {/* <Button radius={"lg"} type="solid" buttonStyle={{
                backgroundColor: 'rgba(69,46,166,255)',
                paddingTop:8,
                paddingBottom:8,
                paddingHorizontal:40,
                marginTop:10,
              }}
              iconPosition='left'
              icon={<Icon name="save" size={15} color="#FFF" />}
              onPress={setStoreDeviceConfig}
      >
          
          Guardar
        </Button> */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 1,
    paddingBottom: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  labels: {
    justifyContent: 'center',
  },
});

export default DeviceConfigScreen;
