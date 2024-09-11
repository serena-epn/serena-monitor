import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
//imports
import {StyleSheet, Text, View} from 'react-native';

import ScreenMenuComponent from '../../components/ScreenMenuComponent';
import ScreenHeaderComponent from '../../components/ScreenHeaderComponent';

import MapView, {Circle, Marker} from 'react-native-maps';
import mapStyle from './../../utils/mapStyle.json';
import useAppStoreHook from '../../store/appStore';
import {formatRelative, format} from 'date-fns';
import {es, ru} from 'date-fns/locale';

export type Props = {
  route: any;
  navigation: any;
};

const AlertDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  //useStates and useEffects
  const {alert} = route.params;

  const {loginUser, appUser, logoutUser, mapConfig} = useAppStoreHook();

  const [origin, setOrigin] = React.useState({
    latitude: alert.latitude,
    longitude: alert.longitude,
  });

  const [region, setRegion] = useState({
    latitude: alert.latitude,
    longitude: alert.longitude,
    latitudeDelta: 0.0922, // Diferencia en latitud que se muestra en el mapa
    longitudeDelta: 0.0421, // Diferencia en longitud que se muestra en el mapa
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MapView
          key={mapConfig.isDark ? 'dark' : 'light'}
          userInterfaceStyle={mapConfig.isDark ? 'dark' : 'light'}
          customMapStyle={mapConfig.isDark ? mapStyle : undefined}
          style={styles.map}
          loadingEnabled={true}
          initialRegion={region}
          region={region}>
          <Marker coordinate={origin} />
          <Circle
            center={{
              latitude: appUser.zone.latitude,
              longitude: appUser.zone.longitude,
            }}
            radius={appUser.zone.radius * 1000}
            strokeWidth={2}
            strokeColor="#452ea6"
            fillColor="#f8a60233"
          />
        </MapView>

        <>
          <Text style={styles.list__Item__Text__Title}>
            {alert.type == 1 ? 'Salida de zona segura: ' : 'Emergencia'}
          </Text>
          <Text style={styles.list__Item__Text__Title}>
            Fecha:
            {format(new Date(alert.registeredAt), "dd 'de' MMMM 'de' yyyy", {
              locale: es,
            })}
          </Text>
          <Text style={styles.list__Item__Text__Title}>
            Hora:
            {format(new Date(alert.registeredAt), 'HH:mm:ss', {locale: es})}
          </Text>
          <Text style={styles.list__Item__Text__Title}>
            Latitud:{alert.latitude.toFixed(10)}
          </Text>
          <Text style={styles.list__Item__Text__Title}>
            Longitud:{alert.longitude.toFixed(10)}
          </Text>
        </>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  //Styles definition
  container: {
    paddingTop: 10,
    flex: 1,
    paddingBottom: 90,
    height: '100%',
    // backgroundColor: "#fff",
    alignItems: 'center',
    // justifyContent: "center",
  },
  map: {
    width: '100%',
    height: '60%',
    flex: 1,
  },
  list__Item: {
    //aspectRatio: 1,
    width: '100%',
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    //alignContent: 'center'
  },
  list__Item__Container: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  list__Item__Icon_Container: {
    width: '20%',
  },
  list__Item__Icon_Container_Icon: {
    width: '100%',
  },
  list__Item__Text: {
    width: '80%',
    flex: 1,
    flexDirection: 'column',
  },
  list__Item__Text__Title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  list__Item__Text__Description: {
    flexShrink: 1,
  },
});

export default AlertDetailsScreen;
