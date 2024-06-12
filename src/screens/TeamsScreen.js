import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from 'react-native';
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


          <View style={styles.container}>
            <View style={styles.row3}>
              <Image style={styles.images2} source={require('../../assets/Soccer Ball.png')}/>
              <Text>Revisa el cuerpo técnico de cada equipo así como los jugadores por equipo.</Text>
            </View>
            <ScrollView>
              {/*Estilo para las cartas*/}
              <View style={styles.cardsContainer}>
                <LinearGradient colors={['#354AC8', '#1A2462']} style={styles.containerTitle}>
                  <Text style={styles.cardTitle}>GOL</Text>
                </LinearGradient>
                {/*Fila que tienes tres columnas*/}
                <View style={styles.rowCard}>
                  {/*Columna 1*/}
                  <View style={styles.imgCard}>
                    <Image style={styles.teamImage} source={require('../../assets/equipo.png')}/>
                  </View>
                  {/*Columna 2*/}
                  <View>
                    <Text style={styles.fontWeight}>Categoría</Text>
                    <Text>Sub 18</Text>
                  </View>
                  {/*Columna 3*/}
                  <View>
                    <Text style={styles.fontWeight}>Genéro</Text>
                    {/*Fila*/}
                    <View style={styles.rowGenero}>
                      <View style={styles.status}></View>
                      <Text>Masculino</Text>
                    </View>
                  </View>
                </View>
                {/*Botones de la carta*/}
                <TouchableOpacity style={styles.buttonOne} onPress={() => (navigation.navigate('LoginScreen'))}>
                  <View style={styles.rowButton}>
                    <Image style={styles.imageCard} source={require('../../assets/soccerBall.png')}/>
                    <Text style={styles.text}>Ver cuerpo técnico</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSecond} onPress={() => (navigation.navigate('LoginScreen'))}>
                  <View style={styles.rowButton}>
                    <Image style={styles.imageCard} source={require('../../assets/soccer.png')}/>
                    <Text style={styles.text}>Ver jugadores</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonThird} onPress={() => (navigation.navigate('LoginScreen'))}>
                  <View style={styles.rowButton}>
                    <Image style={styles.imageCard} source={require('../../assets/soccerGoal.png')}/>
                    <Text style={styles.text}>Ver entrenamientos</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
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
    marginBottom: 35,
  },
  row3: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 30,
    paddingStart: 20,
    marginTop: 20,
    marginBottom: 10
  },
  images2: {
    width: 30,
    height: 30
  },
  //Estilo para la cartas
  cardsContainer: {
    marginTop: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 10
  },
  status: {
    backgroundColor: '#354AC8',
    width: 10,
    height: 10,
    borderRadius: 100/2
  },
  teamImage: {
    borderRadius: 100/2
  },
  rowCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 15
  },
  containerTitle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  rowGenero: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  fontWeight: {
    fontWeight: "bold",
    fontSize: 15
  },
  buttonOne: {
    backgroundColor: '#F44262',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  buttonSecond: {
    backgroundColor: '#334195',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  buttonThird: {
    backgroundColor: '#6829CD',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    marginVertical: 5
  },
  text: {
    color: '#fff'
  },
  container: {
    height: 330
  },
  rowButton: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignItems:"center"
  },
  imageCard: {
    width: 20,
    height: 20
  }
});

export default TeamsScreen;
