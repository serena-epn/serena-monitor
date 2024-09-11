import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//imports
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { Icon,Divider } from '@rneui/themed';

import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { TMenuItem } from "../types/CustomTypes";
import { useTranslation } from 'react-i18next';
import useAppStoreHook from "../store/appStore";

export type Props = {
  navigation:any,
  menuList:TMenuItem[]
};

const ScreenMenuComponent: React.FC<Props> = ({
  navigation,
  menuList
  })=>{


  const navigate = (page: any) => {
      navigation.navigate(page);
  };

  const { t, i18n } = useTranslation();

  const {logoutUser} = useAppStoreHook();

  const logoutMethod=async()=>{
    logoutUser();
  }

  return (
    <SafeAreaProvider style={styles.container}>

      <FlatList
        data={menuList}
        style={styles.list}
        numColumns={1}
        keyExtractor={(e) => e.itemTitle}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.list__Item} onPress={()=>{
            if(item.itemOnClick)
            {
              if(item.itemMethodType && item.itemMethodType=="logout")
              {
                logoutMethod();
              }
              else
              {
                navigation.navigate(item.itemOnClick)
              }
            }
          }}>
            <View style={styles.list__Item__Container}>
              <View style={styles.list__Item__Icon_Container}>
                <Icon
                  name={item.itemIcon}
                  type='material'
                  color="#452ea6"
                  size={45}
                  style={styles.list__Item__Icon_Container_Icon}
                />
              </View>
              
              <View style={styles.list__Item__Text}>
                <Text style={styles.list__Item__Text__Title}>{t(item.itemTitle)}</Text>
                {/* <Divider
                  style={{marginTop:3,marginBottom:3}}
                /> */}
                {item.itemDescription&&<Text style={styles.list__Item__Text__Description}>{t(item.itemDescription)}</Text>}
              </View>
            </View>
          </TouchableOpacity>

        )}
      >


      </FlatList>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#FFF',
    flex:1
  },
  list__Item: {
    //aspectRatio: 1,
    width: '100%',
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight:15,
    //alignContent: 'center'
  },
  list__Item__Container:
  {
    width:'100%',
    borderWidth: 1,
    borderColor: "#C0C0C0",
    padding:10,
    flex:1,
    flexDirection:"row",
    alignContent:"center",
    alignItems:"center"
  },
  list__Item__Icon_Container:
  {
    width:'20%',
    
  },
  list__Item__Icon_Container_Icon:{
    width: '100%'
  },
  list__Item__Text:
  {
    width:'80%',
    flex:1,
    flexDirection:'column'
  },
  list__Item__Text__Title:
  {
    fontWeight: "bold",
    fontSize: 18
  },
  list__Item__Text__Description:
  {
    flexShrink: 1
  },
  container: {
    flex: 1,
    paddingBottom: 90,
    paddingTop:8,
    backgroundColor:'#FFFFFF'
  },
});

export default ScreenMenuComponent;
