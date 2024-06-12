import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import { Text, Button, Modal, Dialog, Paragraph, Portal, PaperProvider,Searchbar } from 'react-native-paper';
import fetchData from '../../api/components';
import {LinearGradient} from "expo-linear-gradient";

const TeamsScreen = ({ logueado, setLogueado }) => {

  // URL de la API para el usuario
  const USER_API = 'services/technics/tecnicos.php';

  // Manejo de cierre de sesión
  const handleLogOut = async () => {
    try {
      const data = await fetchData(USER_API, 'logOut');
      if (data.status) {
        setLogueado(false);
      } else {
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert('Error sesión', error);
    }
  };

  return (
    <View>
        <LinearGradient colors={['#341567', '#6829CD']}  style={styles.titleContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <View style={styles.row2}>
                <Image style={styles.images} source={require('../../assets/gol_blanco 2.png')}/>
                <Text style={styles.title}>Equipos</Text>
              </View>
                <Text style={styles.subtitle}>Lleva el control de tus equipos</Text>
            </View>
            <View style={styles.col}>
                <Image source={require('../../assets/footbalMan.png')}/>
            </View>
          </View>
          <Searchbar style={styles.search}
              placeholder="Buscar..."
          />
        </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: "center",
    marginVertical: 20,
  },
  row2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    marginHorizontal: 10
  },
  images: {
    width: 60,
    height: 60
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "#fff"
  },
  subtitle: {
    color: '#FFF73E',
    marginStart: 25,
    fontSize: 17
  },
  search: {
    marginHorizontal: 20,
    marginBottom: 35
  }
});

export default TeamsScreen;
