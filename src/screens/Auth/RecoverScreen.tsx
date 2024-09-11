import React from "react";
import { StyleSheet, SafeAreaView, Dimensions,TextInput,Alert, View,Text} from "react-native";
import { Button, Image } from "@rneui/base";
import { useTranslation } from 'react-i18next';

export type Props = {
    navigation:any
};

const RecoverScreen: React.FC<Props> = ({
    navigation
})=>{

    const navigate = (page: string) => {
        navigation.navigate(page);
    };
    
    const {t,i18n}=useTranslation();

    const [correo, onChangeCorreo] = React.useState('');
    const [contrasenia, onChangeContrasenia] = React.useState('');
    const [mailOk, setMailOk] = React.useState(false);
    const [mailInput, setMailInput] = React.useState(false);

    const validate = (text:string) => {
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

    return (
        <SafeAreaView style={styles.container}>
            
            <TextInput style={styles.input} onChangeText={(text) => validate(text)} value={correo} placeholder={t("MAIL")}
            keyboardType="email-address"
            autoCapitalize={'none'}
            />

            {mailOk==false && mailInput==true && <Text style={{color:'#FF0000'}}>{t("WRONG_MAIL")}</Text>}
   
            <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer} title={t("RECOVER_PASSWORD")} onPress={() => {}} />
            
          
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
        backgroundColor:'#2089dc',

    },
    buttonContainer:{
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

export default RecoverScreen;