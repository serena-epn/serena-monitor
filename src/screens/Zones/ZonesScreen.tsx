import React, {useState, useEffect} from 'react';

import type {PropsWithChildren} from 'react';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import socket from '../../utils/socket';

import {TCoordinate} from '../../types/CustomTypes';

export type Props = {
  navigation: any;
};

const ZonesScreen: React.FC<Props> = ({navigation}) => {
  const [origin, setOrigin] = React.useState<TCoordinate>({
    latitude: -0.22262,
    longitude: -78.511312,
  });

  const [radius, setRadius] = React.useState<number>(100);

  return (
    <SafeAreaProvider>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={direction => {
            console.log('onDragEnd', direction);
            setOrigin(direction.nativeEvent.coordinate);
          }}
          onSelect={e => console.log('onSelect', e)}
          onDrag={e => console.log('onDrag', e)}
          onDragStart={e => console.log('onDragStart', e)}
          //onDragEnd={e => console.log('onDragEnd', e)}
          onPress={e => console.log('onPress', e)}
        />
        <Circle
          center={origin}
          radius={radius}
          strokeWidth={1}
          strokeColor="#FFdd00"
          fillColor="#ff00 "
        />
      </MapView>
      <Text>AAA: Danilo Pilacuán</Text>
      <Text>Latitud: {origin.latitude.toFixed(10)}</Text>
      <Text>Longitud: {origin.longitude.toFixed(10)}</Text>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ZonesScreen;
