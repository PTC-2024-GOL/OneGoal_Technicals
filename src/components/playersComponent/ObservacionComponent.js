import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Image, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect,  } from "@react-navigation/native";
import edit from '../../../assets/icon-observacion.png';
import fetchData from '../../../api/components';

const ObservacionComponent = ({ idEquipo }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [players, setPlayers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
    const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
    const [response, setResponse] = useState(false);
    const API_ASISTENCIA = 'services/technics/asistencias.php';

    const fillCards = async () => {
        try {
            const form = new FormData();
            form.append('idEquipo', idEquipo);
            const DATA = await fetchData(API_ASISTENCIA, 'readAllMovil', form);

            if (DATA.status) {
                let data = DATA.dataset;
                setPlayers(data);
                setResponse(true);
            } else {
                console.log(DATA.error);
                setPlayers([]);
                setResponse(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillCards();
    }, [idEquipo]);

    useEffect(() => {
        fillCards();
    }, [idEquipo]);

    useFocusEffect(
        useCallback(()=>{
          fillCards();
        },[idEquipo])
    )
  
    const colors = ['#90EE90', '#008000', '#0000FF'];
    let colorIndex = 0;

    const getColor = () => {
        const color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        return color;
    };

    return (
        <ScrollView style={{ flex: 1 }}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                response ? (
                    <ScrollView
                        style={styles.scrollContainer}
                    >
                        <View style={styles.headerM}>
                            <Text style={styles.headerTextM}>Jugadores</Text>
                            <Text style={styles.headerTextM}>Observación</Text>
                        </View>
                        {players.map((player, index) => (
                            <View key={index} style={[styles.playerCard, { borderLeftColor: getColor() }]}>
                                <Text style={styles.playerName}>{player.jugador}</Text>
                                <TouchableOpacity
                                    style={styles.observationButton}
                                >
                                    <Image source={edit} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
                    </ScrollView>
                ) : (
                    <ScrollView
                        style={styles.scrollContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                    <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../../assets/find.png')} />
                        <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15 }}>No se encontraron jugadores</Text>
                    </View>
                    </ScrollView>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%', // Ajusta esto según sea necesario
        padding: 10, // Añade algo de padding para que no se vea tan pegado a los bordes
    },
    leftText: {
        fontSize: 16,
        color: 'black',
    },
    rightText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#5AE107', // Green color
        padding: 10, // Añade algo de padding para centrar mejor el texto
        borderRadius: 50, // Un valor alto para hacerlo circular, ajusta según el tamaño
        textAlign: 'center', // Centra el texto
        overflow: 'hidden', // Asegura que el texto se mantenga dentro del círculo
        width: 45, // Ajusta el ancho para que sea un círculo perfecto
        height: 45, // Ajusta la altura para que sea un círculo perfecto
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#3F51B5',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    playerCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderLeftWidth: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: 100,
    },
    playerTextPromedio: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 5, // Añade algo de padding para centrar mejor el texto
        paddingTop: 15, // Añade algo de padding para centrar mejor el texto
        borderRadius: 50, // Un valor alto para hacerlo circular, ajusta según el tamaño
        textAlign: 'center', // Centra el texto
        overflow: 'hidden', // Asegura que el texto se mantenga dentro del círculo
        width: 50, // Ajusta el ancho para que sea un círculo perfecto
        height: 50, // Ajusta la altura para que sea un círculo perfecto
        justifyContent: 'center',
        alignItems: 'center',
    },
    observationButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    headerM: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#3F51B5',
        padding: 15,
        borderRadius: 30,
        marginBottom: 20,
    },
    headerTextM: {
        color: '#fff',
        fontWeight: 'bold', 
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    modalCenterM: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainerM: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350,
    },
    headerModalM: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
    },
    modalRowM: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitleM: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
    },
    imagesM: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    contentM: {
        padding: 20,
        alignItems: 'center',
    },
    observationBoxM: {
        backgroundColor: '#f0f4f8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        position: 'relative',
    },
    blueLineM: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        backgroundColor: '#2196F3',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    observationTextM: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginLeft: 10,
    },
    closeButtonM: {
        padding: 10,
        backgroundColor: '#F44262',
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonTextM: {
        color: '#fff',
        fontSize: 16,
    },
    justifyContentM: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginLeft: 90,
    },
    saveButtonM: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
    },
});

export default ObservacionComponent;
