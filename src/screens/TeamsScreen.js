import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Modal,
  Dimensions
} from 'react-native';
import { Text, Button, Dialog, Paragraph, Portal, PaperProvider,Searchbar } from 'react-native-paper';
import fetchData from '../../api/components';
import {LinearGradient} from "expo-linear-gradient";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import imageData from "../../api/images";
import {SERVER_URL} from "../../api/constantes";

//Toma la altura de la pantalla en la que se este ejecutando
const windowHeight = Dimensions.get('window').height;

const TeamsScreen = ({ logueado, setLogueado}) => {

  const [teams, setTeams] = useState([]);
  const API = 'services/technics/equipos.php';
  //Declaración de variable para manejar el modal.
  const [modalVisible, setModalVisible] = useState(false);
  const [technicals, setTechnicals] = useState([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  const fillCards = async () => {
    let action;
    let form = new FormData();
    if(search){
      form.append('search', search);
      action = 'searchRows';
    }else{
      action = 'readAll';
      form = null
    }

    const data = await fetchData(API, action, form);

    if(data.status){
      let dataTeam = data.dataset;
      setTeams(dataTeam);
    }else{
      console.log(data.error);
    }
  }

  const seeModal = async (id) => {
    setModalVisible(true);
    const form = new FormData();
    form.append('idEquipo', id);
    const data = await fetchData(API, 'readAllStaff', form);

    if(data.status){
      let dataModal = data.dataset;
      setTechnicals(dataModal);
    }else{
      console.log(data.error);
    }

  };

  useFocusEffect(
      useCallback(()=>{
        fillCards();
      },[search])
  )


  //Accedemos al stack navigation(LoginNav) y luego a la screen a la que queremos ir (Jugadores).
  const goToPlayersScreen = (idEquipo, logo, nombreEquipo) => {
    navigation.navigate('LoginNav', {
      screen: 'Jugadores',
      params: {idEquipo, logo, nombreEquipo}
    });
  }

  //Accedemos al stack navigation(LoginNav) y luego a la screen a la que queremos ir (Jugadores).
  const goToTrainingScreen = (idEquipo) => {
    navigation.navigate('LoginNav', {
      screen: 'Entrenamientos',
      params: {idEquipo}
    });
  }

  return (
      <View style={styles.mainContainer}>
        {/*HEADER MORADO*/}
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
                     placeholder="Buscar nombre del equipo..."
                     onChangeText={setSearch}
                     value={search}
          />
        </LinearGradient>

        {/*Contedor para la indicacion y las cartas*/}
        <View style={styles.container}>
          {/*Indicacion*/}
          <View style={styles.row3}>
            <Image style={styles.images2} source={require('../../assets/Soccer Ball.png')}/>
            <Text>Revisa el cuerpo técnico de cada equipo así como los jugadores por equipo.</Text>
          </View>
          {/*Scroll para las cartas*/}
          <ScrollView>
            {/*Cartas*/}

            {teams.map((teams, index) => (
                <View key={teams.id_equipo} style={styles.cardsContainer}>
                  <LinearGradient colors={['#354AC8', '#1A2462']} style={styles.containerTitle}>
                    <Text style={styles.cardTitle}>{teams.nombre_equipo}</Text>
                  </LinearGradient>
                  {/*Fila que tienes tres columnas*/}
                  <View style={styles.rowCard}>
                    {/*Columna 1*/}
                    <View style={styles.imgCard}>
                      <Image style={styles.teamImage} source={{uri: `${SERVER_URL}images/equipos/${teams.logo_equipo}`}}/>
                    </View>
                    {/*Columna 2*/}
                    <View>
                      <Text style={styles.fontWeight}>Categoría</Text>
                      <Text>{teams.nombre_categoria}</Text>
                    </View>
                    {/*Columna 3*/}
                    <View>
                      <Text style={styles.fontWeight}>Genéro</Text>
                      {/*Fila*/}
                      <View style={styles.rowGenero}>
                        <View style={styles.status}></View>
                        <Text>{teams.genero_equipo}</Text>
                      </View>
                    </View>
                  </View>

                  {/*Botones de la carta*/}
                  {/*ABRE EL MODAL DE TECNICO*/}
                  <TouchableOpacity style={styles.buttonOne} onPress={() => seeModal(teams.id_equipo)}>
                    <View style={styles.rowButton}>
                      <Image style={styles.imageCard} source={require('../../assets/soccerBall.png')}/>
                      <Text style={styles.text}>Ver cuerpo técnico</Text>
                    </View>
                  </TouchableOpacity>

                  {/*REDIRIGIR A PANTALLA DE JUGADORES*/}
                  <TouchableOpacity style={styles.buttonSecond} onPress={()=>{goToPlayersScreen(teams.id_equipo, teams.logo_equipo, teams.nombre_equipo)}}>
                    <View style={styles.rowButton}>
                      <Image style={styles.imageCard} source={require('../../assets/soccer.png')}/>
                      <Text style={styles.text}>Ver jugadores</Text>
                    </View>
                  </TouchableOpacity>

                  {/*REDIRIGIR A PANTALLA DE ENTRENAMIENTOS*/}
                  <TouchableOpacity style={styles.buttonThird} onPress={()=>{goToTrainingScreen(teams.id_equipo)}}>
                    <View style={styles.rowButton}>
                      <Image style={styles.imageCard} source={require('../../assets/soccerGoal.png')}/>
                      <Text style={styles.text}>Ver entrenamientos</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            ))}
          </ScrollView>
        </View>

        {/*Modal*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=> {setModalVisible(!modalVisible)}}>

          <View style={styles.modalCenter}>
            <View style={styles.modalContainer}>
              <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModal}>
                <View style={styles.modalRow}>
                  <Image style={styles.images} source={require('../../assets/gol_blanco 2.png')}/>
                  <Text style={styles.modalTitle}>Cuerpo técnico</Text>
                </View>
              </LinearGradient>

              <ScrollView>
                <View style={styles.content}>
                  <View style={styles.modalColumn}>
                    {/*Columna*/}
                    {technicals.map((technicals, index) => (
                      <View key={technicals.id_tecnico} style={styles.card}>
                        <Image style={styles.cardImg} source={{uri:`${SERVER_URL}images/tecnicos/${technicals.foto_tecnico}`}}/>
                        <View style={styles.contentCard}>
                          <Text style={styles.type}>{technicals.nombre_rol_tecnico}</Text>
                          <Text style={styles.name}>{technicals.nombre_tecnico + ' ' + technicals.apellido_tecnico}</Text>

                          <View style={styles.footer}>
                            <Text style={styles.phone}>Telefono:</Text>
                            <Text>{technicals.telefono_tecnico}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/*Botones del modal*/}
                  <View style={styles.justifyContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={()=> {setModalVisible(false)}}>
                      <Text style={styles.text}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: windowHeight * 0.15,
  },
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
    width: 60,
    height: 60,
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
    color: '#fff',
    textAlign: "center"
  },
  container: {
    flex: 1
  },
  rowButton: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignItems:"center",
    justifyContent: "center"
  },
  imageCard: {
    width: 20,
    height: 20
  },
  // Estilos para el modal
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 530
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 20,
    flexDirection: "column",
    alignItems: "center",
    width: 200,
    marginVertical: 15
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#F44262',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
    width: 100
  },
  modalRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center"
  },
  modalColumn: {
    flexDirection: "column",
    alignItems: "center",
  },
  modalTitle: {
    padding:20,
    color: '#fff',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  headerModal: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  justifyContent: {
    flexDirection: "row",
    position: "relative",
    marginLeft: "auto",
    bottom: 0,
    paddingVertical: 5
  },
  content: {
    padding: 25,
  },
  contentCard: {
    padding: 25,
  },
  type: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center"
  },
  name: {
    textAlign: "center",
    fontSize: 15,
  },
  phone: {
    fontWeight: "bold"
  },
  footer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  cardImg: {
    resizeMode: "cover",
    width: 200,
    height: 180,
    borderRadius: 20
  },

});

export default TeamsScreen;
