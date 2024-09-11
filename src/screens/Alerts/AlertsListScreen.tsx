import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import DeviceMenu from '../../components/ScreenMenuComponent';
import AlertsListComponent from '../../components/AlertsListComponent';
import api from '../../utils/api';
import {TAlert} from '../../types/CustomTypes';
import useAppStoreHook from '../../store/appStore';

export type Props = {
  route: any;
  navigation: any;
};

const AlertsListScreen: React.FC<Props> = ({route, navigation}) => {
  const {appUser} = useAppStoreHook();
  const [alertsData, setAlertsData] = useState<TAlert[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {alertsType} = route.params;

  const getAlerts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await api.post('/alert/byUserId', {
        userId: appUser._id,
        type: alertsType ? alertsType : null,
      });
      setAlertsData(response.data.alerts);
    } catch (error) {
      console.log('Error: ' + error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    getAlerts();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#452ea6" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <AlertsListComponent navigation={navigation} alertsList={alertsData} />
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
    backgroundColor: '#FFF',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AlertsListScreen;
