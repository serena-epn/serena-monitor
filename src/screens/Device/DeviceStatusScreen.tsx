import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
//imports
import {StyleSheet, Text} from 'react-native';
import DeviceMenu from '../../components/ScreenMenuComponent';
import DeviceHeader from './DeviceHeader';
import {Icon} from '@rneui/themed';
import socketInitializer from '../../utils/socket';
import useAppStoreHook from '../../store/appStore';
export type Props = {
  navigation: any;
};

const DeviceStatusScreen: React.FC<Props> = ({navigation}) => {
  //useStates and useEffects
  const {
    loginUser,
    appUser,
    logoutUser,
    mapConfig,
    lastLocation,
    setLastLocation,
  } = useAppStoreHook();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [colorState, setColorState] = useState<string>(
    (new Date().getTime() -
      new Date(lastLocation.registeredAt ?? '').getTime()) /
      1000 /
      60 >=
      3
      ? 'red'
      : 'green',
  );

  useEffect(() => {
    // Update the document title using the browser API
    console.log('useEffect ok');
    //socket.emit("events", { data: "ok1" });
    //socket.emit("testClient", { data: "ok2" });
    console.log('appUser .....');
    console.log(appUser);
    const socket = socketInitializer(appUser ? appUser.device.imei : '');

    socket.on('updateGeoLoc', (data: any) => {
      console.log('updateGeoLoc');
      console.log(data);
      const newOrigin = {
        latitude: data.data.latitude,
        longitude: data.data.longitude,
      };
      console.log('newOrigin');
      console.log(newOrigin);
      // setOrigin(newOrigin);

      // setRegion(prevRegion => ({
      //   ...prevRegion,
      //   latitude: newOrigin.latitude,
      //   longitude: newOrigin.longitude,
      // }));
      setLastLocation({
        latitude: newOrigin.latitude,
        longitude: newOrigin.longitude,
        registeredAt: new Date(),
      });
    });
  }, [socketInitializer]);

  useEffect(() => {
    // Configura un temporizador para actualizar el tiempo actual cada segundo
    const intervalId = setInterval(() => {
      const auxOnline =
        (new Date().getTime() -
          new Date(lastLocation.registeredAt ?? '').getTime()) /
          1000 /
          60 >=
        3;
      const newColor = auxOnline ? 'red' : 'green';
      setIsOnline(!auxOnline);
      // console.log(new Date().getTime());
      // console.log(new Date(lastLocation.registeredAt ?? '').getTime());
      // console.log('lastLocation.registeredAt');
      // console.log(lastLocation.registeredAt);
      // console.log(
      //   (new Date().getTime() -
      //     new Date(lastLocation.registeredAt ?? '').getTime()) /
      //     1000 /
      //     60,
      // );
      // console.log(
      //   '        new Date().getTime() -          new Date(lastLocation.registeredAt ?? ).getTime() / 1000 / 60',
      // );
      // console.log('newColor');
      // console.log(newColor);
      setColorState(newColor);
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [lastLocation]);

  return (
    <SafeAreaProvider style={styles.container}>
      <Icon name="watch" type="material" color={colorState} size={90} />
      <Text style={{marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>
        Estado: {isOnline ? 'En Línea' : 'Fuera de Línea'}
      </Text>
      <Text style={{marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>
        {lastLocation.registeredAt && (
          <>
            Último mensaje recibido:{' '}
            {new Date(lastLocation.registeredAt).toLocaleString()}
          </>
        )}
      </Text>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default DeviceStatusScreen;
