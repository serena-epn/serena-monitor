import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { navigate } from './../navigation/NavigationService';

async function onMessageReceived(message:any) {
    // Do something

}

export async function requestUserPermission() {

    if (Platform.OS == 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            
            getFCMToken()
        }
        else {
            console.log('Permission denied')
        }

        const grantedLocation = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Authorization status on 33:');
            
        }
        else {
            console.log('Location permission denied')
        }

    }
    else {
        const authStatus = await messaging().requestPermission();

        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Requesting permissions')

        if (enabled) {
            console.log('Authorization status:', authStatus);
            getFCMToken();
        }

    }


}


const getFCMToken = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log("Token=> ", token)
        return token;
    }
    catch (error) {
        console.log("error on token")
    }
}

export const NotificationListener = async () => {
    
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state', remoteMessage.notification)
        navigate('MapScreen');
        

    });

    messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notificacion caused app to open from quit state: ',
                    remoteMessage.notification
                )

            }
        })


        messaging().onMessage(async (remoteMessage) => {
            onMessageReceived('ok')
            console.log('Notification received in foreground:', remoteMessage);
    
            // Aquí puedes manejar cómo deseas mostrar la notificación en la pantalla
            if (remoteMessage.notification) {
                // Ejemplo de cómo mostrar una alerta con el contenido de la notificación
                Alert.alert(remoteMessage.notification.title?remoteMessage.notification.title:'Alerta' , remoteMessage.notification.body, [
                    {
                      text: 'Aceptar',
                      onPress:()=>{
                        console.log('No Ver mapa........')
                      },
                      style: 'cancel',
                    },
                    {text: 'Ver Mapa', onPress: () => {
                        console.log('Ver mapa........')
                        navigate('MapScreen')}},
                  ]);
            }
        });
    messaging().setBackgroundMessageHandler(async ()=>{
        console.log('BackgroundMessageHandler')
    })

    return await messaging().getToken();

}