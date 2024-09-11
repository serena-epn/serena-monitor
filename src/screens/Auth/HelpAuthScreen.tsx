import React from "react";
import { StyleSheet, SafeAreaView, Dimensions, TextInput, Alert, View, Text } from "react-native";
import { useTranslation } from 'react-i18next';

export type Props = {
  navigation: any
};

const HelpAuthScreen: React.FC<Props> = ({
  navigation
}) => {

  const navigate = (page: string) => {
    navigation.navigate(page);
  };

  const {t,i18n}=useTranslation();




  return (
    <SafeAreaView style={styles.container}>

       <Text>HELP AUTH SCREEN</Text>

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
    backgroundColor: '#2089dc',

  },
  buttonContainer: {
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

export default HelpAuthScreen;