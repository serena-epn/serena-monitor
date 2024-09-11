import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
//imports
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Divider} from '@rneui/themed';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {TAlert, TMenuItem} from '../types/CustomTypes';
import {useTranslation} from 'react-i18next';
import useAppStoreHook from '../store/appStore';
import {formatRelative, format} from 'date-fns';
import {es, ru} from 'date-fns/locale';

export type Props = {
  navigation: any;
  alertsList: TAlert[] | null | undefined;
};

const AlertsListComponent: React.FC<Props> = ({navigation, alertsList}) => {
  const navigate = (page: any) => {
    navigation.navigate(page);
  };

  const {t, i18n} = useTranslation();

  const {logoutUser} = useAppStoreHook();

  const logoutMethod = async () => {
    logoutUser();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        data={alertsList}
        style={styles.list}
        numColumns={1}
        keyExtractor={e => e._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.list__Item}
            onPress={() => {
              if (item.type == 1 || item.type == 2) {
                navigation.navigate('AlertDetailsScreen', {alert: item});
              }
            }}>
            <View style={styles.list__Item__Container}>
              <View style={styles.list__Item__Text}>
                {(item.type == 1 || item.type == 2) && (
                  <>
                    <Text style={styles.list__Item__Text__Title}>
                      {item.type == 1
                        ? 'Salida de zona segura: '
                        : 'Emergencia'}
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Fecha:
                      {format(
                        new Date(item.registeredAt),
                        "dd 'de' MMMM 'de' yyyy",
                        {locale: es},
                      )}
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Hora:
                      {format(new Date(item.registeredAt), 'HH:mm:ss', {
                        locale: es,
                      })}
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Latitud:{item.latitude.toFixed(10)}
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Longitud:{item.longitude.toFixed(10)}
                    </Text>
                  </>
                )}

                {item.type == 3 && (
                  <>
                    <Text style={styles.list__Item__Text__Title}>
                      Batería Baja:
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Fecha:
                      {format(
                        new Date(item.registeredAt),
                        "dd 'de' MMMM 'de' yyyy",
                        {locale: es},
                      )}
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Hora:
                      {format(new Date(item.registeredAt), 'HH:mm:ss', {
                        locale: es,
                      })}
                    </Text>
                    <Text style={styles.list__Item__Text__Title}>
                      Restante:{item.description}
                    </Text>
                  </>
                )}

                {/* <Divider
                  style={{marginTop:3,marginBottom:3}}
                /> */}
                {/* {item.itemDescription&&<Text style={styles.list__Item__Text__Description}>{t(item.itemDescription)}</Text>} */}
              </View>
              <View style={styles.list__Item__Icon_Container}>
                {(item.type == 1 || item.type == 2) && (
                  <Icon
                    name={'travel-explore'}
                    type="material"
                    color="#452ea6"
                    size={45}
                    style={styles.list__Item__Icon_Container_Icon}
                  />
                )}

                {item.type == 3 && (
                  <Icon
                    name={'battery-alert'}
                    type="material"
                    color="#452ea6"
                    size={45}
                    style={styles.list__Item__Icon_Container_Icon}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}></FlatList>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#FFF',
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
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
});

export default AlertsListComponent;
