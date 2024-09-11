import React from "react";
import { StyleSheet, SafeAreaView, Dimensions,TextInput,Alert, View,Text} from "react-native";
import { Button, Image } from "@rneui/base";


export type Props = {
    navigation:any
};

const RegisterScreen: React.FC<Props> = ({
    navigation
})=>{

    const navigate = (page: string) => {
        navigation.navigate(page);
    };
    


    const [correo, onChangeCorreo] = React.useState('');
    const [contrasenia, onChangeContrasenia] = React.useState('');
    const [correoCorrecto, setCorreoCorrecto] = React.useState(false);
    const [correoIngresado, setCorreoIngresado] = React.useState(false);

    const validate = (text:string) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          onChangeCorreo(text)
          setCorreoCorrecto(false)
          setCorreoIngresado(true)
          return false;
        }
        else {
          onChangeCorreo(text)
          console.log("Email is Correct");
          setCorreoCorrecto(true)
          setCorreoIngresado(true)
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            
            <TextInput style={styles.input} onChangeText={(text) => validate(text)} value={correo} placeholder={'Correo'}
            keyboardType="email-address"
            autoCapitalize={'none'}
            />

            {correoCorrecto==false && correoIngresado==true && <Text style={{color:'#FF0000'}}>Correo Incorrecto</Text>}
   
            <TextInput
            value={contrasenia}
            onChangeText={onChangeContrasenia}
            placeholder={'Contraseña'}
            secureTextEntry={true}
            style={styles.input}
            />
            
            
            
            <TextInput
            value={contrasenia}
            onChangeText={onChangeContrasenia}
            placeholder={'Contraseña'}
            secureTextEntry={true}
            style={styles.input}
            />

            <TextInput
            value={contrasenia}
            onChangeText={onChangeContrasenia}
            placeholder={'Repetir Contraseña'}
            secureTextEntry={true}
            style={styles.input}
            />

            <Button disabled={!(correoCorrecto && correoIngresado)} buttonStyle={styles.button} containerStyle={styles.buttonContainer} title="Iniciar Sesión" onPress={() => {}} />
            <Button buttonStyle={styles.button} containerStyle={styles.buttonContainer} title="Olvidó su Contraseña" onPress={() => navigate("RecoverForm")} />
            
          
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

export default RegisterScreen;