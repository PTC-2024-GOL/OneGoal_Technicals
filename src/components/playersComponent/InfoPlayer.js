import {View, StyleSheet, Image, ScrollView, Dimensions} from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import LoadingComponent from "../LoadingComponent";
import React, {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const InfoPlayers = ({informationPlayer, estadoFisico}) => {

    //Declaracion de variables.
    const [load, setLoading] = useState(true); // Estado de carga inicializado en true

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            };
            fetchData();
        }, [informationPlayer, estadoFisico])
    );


    //Variables para guardar el imc del jugador, asignacion de color y estado
    let imc = estadoFisico.indice_masa_corporal;
    let color;
    let estado;

    //If que de acuerdo al imc que tenga el jugador, asi sera el color que le sera asignado.
    if(imc <= 18.5) {
        estado = 'Peso bajo';
        color = '#1141a8';
    } else if (imc >= 18.5 && imc <=24.9) {
        estado = 'Saludabe';
        color = '#10d1a1'
    } else if (imc >= 25.0 && imc <= 29.9) {
        estado = 'Sobrepeso';
        color = '#0acc31'
    } else if (imc >= 30.0 && imc <= 34.9) {
        estado = 'Obesidad grado 1';
        color = '#c0ea2e'
    }else if (imc >= 35.0 && imc <= 39.9) {
        estado = 'Obesidad grado 2';
        color = '#ed8812'
    }else if (imc >= 40) {
        estado = 'Obesidad grado 3';
        color = '#e60404'
    }


    return(
        <ScrollView>
            {load ? (
                <LoadingComponent/>
            ) : (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Edit.png')}/>
                    <Text style={styles.bold}>Nombre:</Text>
                    <Text>{informationPlayer.NOMBRE_COMPLETO}</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Soccer Ball.png')}/>
                    <Text style={styles.bold}>Alias:</Text>
                    <Text>{informationPlayer.alias_jugador}</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Schedule.png')}/>
                    <Text style={styles.bold}>Fecha de nacimiento:</Text>
                    <Text>{informationPlayer.fecha_nacimiento_jugador}</Text>
                </View>

                {/*Primeras cartas*/}
                <ScrollView horizontal={true}>
                    <View style={styles.rowCard}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.center}  variant="bodySmall">Posición</Text>
                                <Text style={styles.center}  variant="bodySmall">principal</Text>
                                <Text style={styles.centerName} variant="titleMedium">{informationPlayer.posicionPrincipal}</Text>
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.center}  variant="bodySmall">Posición</Text>
                                <Text style={styles.center}  variant="bodySmall">secundaria</Text>
                                <Text style={styles.centerName} variant="titleMedium">{informationPlayer.posicionSecundaria}</Text>
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.center}  variant="bodySmall">Dorsal</Text>
                                <Text style={styles.centerName} variant="headlineMedium">{informationPlayer.dorsal_jugador}</Text>
                            </Card.Content>
                        </Card>
                    </View>
                </ScrollView>

                <Text style={styles.bold}>Activo desde</Text>
                <View style={styles.row}>
                    <View style={styles.status}></View>
                    <Text>{informationPlayer.registoJugador}</Text>
                </View>

                {/*Titulo de estado fisico*/}
                <View style={styles.rowTwo}>
                    <Image style={styles.iconTwo} source={require('../../../assets/iconPlayersScreen/Dumbbell.png')}></Image>
                    <Text variant="titleMedium" style={styles.bold}>Estado físico</Text>
                </View>

                {/*Segundas cartas*/}
                    <Card style={styles.healthCard}>
                        <View style={styles.rowHealthCard}>
                            <View style={styles.col}>
                                <Text style={styles.bold}>Altura</Text>
                                <Text>{estadoFisico.altura_jugador} cm</Text>
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.bold}>Peso</Text>
                                <Text>{estadoFisico.peso_jugador} lbs</Text>
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.bold}>Masa corporal</Text>
                                <Text style={{color: color}}>{estadoFisico.indice_masa_corporal}</Text>
                                <Text style={{color: color, fontWeight: 'bold'}} variant='bodySmall'>{estado}</Text>
                            </View>
                        </View>
                        <Text style={{fontWeight: 'bold', marginTop: -8, marginBottom: 2}}>Último registro:</Text>
                        <Text style={{marginBottom: 12}}>{estadoFisico.fecha_creacion_format}</Text>
                    </Card>
            </View>
                )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F7FF',
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: windowWidth * 0.03,
        paddingVertical: 20,
        marginBottom: windowHeight * 0.15
    },
    icon: {
        width: 15,
        height: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 4
    },
    rowCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 20,
        marginTop: 15
    },
    rowTwo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginVertical: 15
    },
    bold: {
        fontWeight: "bold"
    },
    card: {
        height: 100,
        backgroundColor: 'white',
        marginRight: 10,
        width: 150
    },
    center: {
        textAlign: "center",
    },
    centerName: {
        marginTop: 10,
        textAlign: "center"
    },
    status: {
        backgroundColor: '#5AE107',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    iconTwo: {
        width: 30,
        height: 30
    },
    //Segundas cartas
    healthCard:{
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    rowHealthCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 15
    }
})
export default InfoPlayers;