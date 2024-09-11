import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import { useSafeAreaInsets } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { Icon } from '@rneui/themed';
import {THeaderComponentProps} from "./../types/CustomTypes"
import { useTranslation } from "react-i18next";
export type Props = {
  //navigation:any
  headerComponentProps:THeaderComponentProps
};

const ScreenHeaderComponent: React.FC<Props> = ({
  //navigation
  headerComponentProps
  })=>{
  //useStates and useEffects
  const {t}=useTranslation();

  //const insets = useSafeAreaInsets();

  

  return (
    //<SafeAreaProvider style={[styles.container,{paddingTop:insets.top}]}>
    <SafeAreaProvider style={[styles.container,{paddingTop:30}]}>

    <View style={styles.headerContainer}>
        <View style={styles.headerLogo}>
            <View style={styles.logoCircle}>
            <Icon
                  name={headerComponentProps.headerLogo}
                  type='material'
                  color="#FFFFFF"
                  size={54}
                />
            </View>
        </View>
        
        <Text style={styles.headerText}>{t(headerComponentProps.headerText)}</Text>
        
    </View>
            
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Styles definition
  container: {
    flex: 0,
    minHeight:145,
    padding:10,
    //paddingTop:insets.top,
    backgroundColor:'#452ea6',
    borderBottomColor:'#FFFFFF',
    borderBottomWidth:1,
    marginBottom:0,
    borderTopWidth:1,
    marginTop:0
   },
  headerContainer:{
    width:'100%',
    //padding:1,
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    
  },
  headerLogo:{
    width:68,
    flex:0,
    paddingLeft:10,
    alignItems:'flex-start',
    alignContent:'center'
  },
  logoCircle:{
    flex:0,
    paddingTop:1,
    alignItems:'center',
    width:60,
    height:60,
    borderWidth:2,
    borderColor: '#FFFFFF',
    borderRadius:100
  },
  headerText:{
    flex:1,
    width:'auto',
    marginLeft:15,
    flexShrink: 0,
    color:'#FFFFFF',
    textAlign:'justify'
  }
});

export default ScreenHeaderComponent;
