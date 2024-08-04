import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import {Card, Chip, Searchbar} from 'react-native-paper';
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import fetchData from "../../api/components";
import {SERVER_URL} from "../../api/constantes";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayersScreen = () => {
    //Estilos para los chips
    const [selectedChip, setSelectedChip] = useState('');
    const API = 'services/technics/participaciones_partidos.php';
    const [players, setPlayers] = useState([]);
    const navigation = useNavigation();

    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [data, setData] = useState(false);

    const goToPlayersDetails = (id_jugador) => {
        navigation.navigate('PlayersDetails', { id_jugador });
    }

    //Recibimos los parametros que se envian desde la pantalla de TeamScreen
    const route = useRoute();
    const { idEquipo, logo, nombreEquipo } = route.params;

    const fillByFilter = (area) => {
        setFilter(area)
        setSelectedChip(area)
        console.log(area)
    }

    //Funcion para traer los jugadores de la api
    const fillPlayers = async () => {
        setPlayers([]);
        const FORM = new FormData();
        FORM.append('idEquipo', idEquipo);
        let action;

        if(filter){
            action = 'readAllByAreaJuego';
            FORM.append('areaJuego', filter);
        }else if(search){
            action = 'searchRows';
            FORM.append('search', search)
        }
        else{
            action = 'readAllByIdEquipo';
        }

        //Peticion a la API
        const DATA = await fetchData(API, action, FORM);
        if(DATA.status){
            let data = DATA.dataset;
            setPlayers(data);
            setData(true)
        }else {
            console.log(DATA.error);
            setPlayers([]);
            setData(false)
        }
    }

    // Permite que se llame a la funcion cada vez que cambie el idEquipo, filter o el search
    useFocusEffect(
        useCallback(()=>{
            fillPlayers();
        },[idEquipo, filter, search])
    )

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Image style={styles.img} source={{uri: `${SERVER_URL}images/equipos/${logo}`}}/>
                <View style={styles.col}>
                    <Text style={styles.title}>{nombreEquipo}</Text>
                    <Text style={styles.content}>Haz clíc en la tarjeta para obtener más información del jugador. </Text>
                </View>
            </View>
            <Searchbar
                placeholder='Buscar por nombre o apellido...'
                style={{marginBottom: 15, backgroundColor: '#fff'}}
                value={search}
                onChangeText={setSearch}
            />
            <View style={{height: 35, marginBottom: 20}}>
                <ScrollView horizontal={true}>
                    <Chip mode={selectedChip === '' ? 'flat' : 'outlined'}
                          selectedColor={selectedChip === '' ? 'white' : '#9A9595'}
                          style={selectedChip === '' ? styles.selectedChip : styles.defaultChip}
                          onPress={() => fillByFilter('')}>Todos</Chip>

                    <Chip mode={selectedChip === 'Ofensiva' ? 'flat' : 'outlined'}
                          selectedColor={selectedChip === 'Ofensiva' ? 'white' : '#9A9595'}
                          style={selectedChip === 'Ofensiva' ? styles.selectedChip : styles.defaultChip}
                          onPress={() => fillByFilter('Ofensiva')}>Ofensiva</Chip>

                    <Chip mode={selectedChip === 'Defensiva' ? 'flat' : 'outlined'}
                          selectedColor={selectedChip === 'Defensiva' ? 'white' : '#9A9595'}
                          style={selectedChip === 'Defensiva' ? styles.selectedChip : styles.defaultChip}
                          onPress={() => fillByFilter('Defensiva')}>Defensiva</Chip>

                    <Chip mode={selectedChip === 'Ofensiva y defensiva' ? 'flat' : 'outlined'}
                          selectedColor={selectedChip === 'Ofensiva y defensiva' ? 'white' : '#9A9595'}
                          style={selectedChip === 'Ofensiva y defensiva' ? styles.selectedChip : styles.defaultChip}
                          onPress={() => fillByFilter('Ofensiva y defensiva')}>Ofensiva y defensiva</Chip>
                </ScrollView>
            </View>
            {/*Codigo para las cards*/}
            {/*Si viene data de la api, entonces se mostraran los jugadores pero si no, mostrara un mensaje de error/advertencia*/}
            {data ? (
                <ScrollView>
                    <View style={styles.rowCards}>
                        {players.map((player, index)=> {
                            let name = player.nombre_jugador.split(' ', 1);
                            let apellido = player.apellido_jugador.split(' ', 1);

                            let styleEstatus;

                            //Dependiendo del estado del jugador, asi se coloca el color del estilo
                            if(player.estatus_jugador === 'Baja temporal') {
                                styleEstatus = styles.estatusText1;
                            } else if (player.estatus_jugador === 'Baja definitiva') {
                                styleEstatus = styles.estatusText2;
                            } else {
                                styleEstatus = styles.estatusText3
                            }

                            return (
                                <TouchableOpacity onPress={() => goToPlayersDetails(player.id_jugador)}>
                                    <View>
                                        <View>
                                            <Image style={styles.imageCard}
                                                   source={{uri: `${SERVER_URL}images/jugadores/${player.foto_jugador}`}}></Image>
                                        </View>
                                        <View style={styles.textCard}>
                                            <Text
                                                style={styles.nameText}>{name + ' ' + apellido}</Text>
                                            <View style={styles.rowPosition}>
                                                <Image source={require('../../assets/Soccer Ball.png')}
                                                       style={{width: 15, height: 15}}></Image>
                                                <Text style={styles.positionText}>{player.area_de_juego}</Text>
                                            </View>
                                            <Text style={styleEstatus}>{player.estatus_jugador}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            ) : (
                <View style={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{height: 80, width: 80, marginBottom: 10}} source={require('../../assets/find.png')}/>
                    <Text style={{backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15 }}>No se encontraron jugadores</Text>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth * 0.05,
        marginVertical: 25,
        marginBottom: windowHeight * 0.15,
        flex: 1,
    },
     row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 25
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 100/2
    },
    col: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    content: {
        fontWeight: '300',
    },
    rowCards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    ////////////////////
    textCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 10,
        marginTop: -15,
        width: 150,
        marginBottom: 15
    },
    imageCard: {
        height: 140,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: "cover"
    },
    estatusText1: {
        padding: 5,
        color: '#cda705',
        backgroundColor: '#fdfae2',
        marginTop: 10,
        fontSize: 12,
        borderRadius: 10,
        width: 100,
        textAlign: "center"
    },
    estatusText2: {
        padding: 5,
        color: '#e60404',
        backgroundColor: '#fae8e8',
        marginTop: 10,
        fontSize: 12,
        borderRadius: 10,
        width: 100,
        textAlign: "center"
    },
    estatusText3: {
        padding: 5,
        color: '#08c50c',
        backgroundColor: '#e7fbe2',
        marginTop: 10,
        fontSize: 12,
        borderRadius: 10,
        width: 100,
        textAlign: "center"
    },
    nameText: {
        fontWeight: "bold",
        fontSize: 15
    },
    positionText: {
        marginTop: 3,
        fontSize: 13
    },
    rowPosition: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    selectedChip: {
        backgroundColor: '#0078B7',
        marginHorizontal: 5,
    },
    defaultChip: {
        marginHorizontal: 5,
    },
});
export default PlayersScreen;
