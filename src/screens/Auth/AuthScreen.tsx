import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Button, Image } from "@rneui/base";
import { useTranslation } from 'react-i18next';


var width = Dimensions.get('window').width;

export type Props = {
    navigation:any
};

const AuthScreen: React.FC<Props> = ({
    navigation
    })=>{


    const navigate = (page: string) => {
        navigation.navigate(page);
    };
    
    const getContext=async()=>{
        console.log("userToken");
        // console.log(typeof userToken);
        // console.log(userToken);
        
      }

    const {t,i18n}=useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../../assets/serenaLogo.png")}
                style={styles.logo}
            />

            <Button
                buttonStyle={styles.button}
                onPress={() => {
                    navigate("LoginScreen");
                }}
                title={t("LOGIN")}
            />
            {/* <Button
                buttonStyle={styles.button}
                onPress={() => {
                    navigate("RegisterScreen");
                }}
                title={t("REGISTER")}
            />  */}
            <Button
                buttonStyle={styles.button}
                onPress={() => {
                    navigate("HelpAuthScreen");
                }}
                // onPress={()=>{
                //     getContext()
                // }}
                title={t("HELP")}
            /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", justifyContent: "flex-end", flex: 1, flexDirection: "column", width: "100%" },
    button: {
        flexDirection: "row",
        marginBottom: 20,
        width: width - 40,
        borderRadius: 10,
        backgroundColor:'#452ea6',

    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 100,
    },
});

export default AuthScreen;
