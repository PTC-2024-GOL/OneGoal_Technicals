import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput } from "react-native";

import { useRoute } from "@react-navigation/native"; // Importa useRoute
import fetchData from '../../api/components';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerCard = ({ name, status, color, onStatusChange }) => {
    return (
        <View style={[styles.textHorario, { borderLeftColor: color }]}>
            <Text style={styles.headTest}>{name}</Text>
            <TextInput
                style={styles.infoText}
                value={status}
                keyboardType='numeric'
                onChangeText={(text) => onStatusChange(name, text)}
            />
        </View>
    );
};

const TestPlayerScreen = () => {
    const playersData = [
        { name: 'Resistencia', nota: '8', color: '#000' },
        { name: 'Coordinación', nota: '4', color: '#000' },
        { name: 'Trabajo en equipo', nota: '7', color: '#000' },
        { name: 'Control del balón', nota: '9', color: '#000' },
    ];

    const route = useRoute();
    const { id_jugador, jugador, idEntrenamiento } = route.params;

    const [playerStatuses, setPlayerStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const CARACTERISTICAS_API = 'services/technics/caracteristicas.php';
    const NOTAS_API = 'services/technics/caracteristicas_analisis.php';

    const fetchCaracteristicas = async () => {
        try {
            const response = await fetchData(CARACTERISTICAS_API, 'readAll');
            if (response.status) {
                return response.dataset;
            } else {
                console.log(response.error);
                return [];
            }
        } catch (error) {
            console.error("Error fetching caracteristicas:", error);
            return [];
        }
    };

    const fetchNotas = async () => {
        try {
            const FORM = new FormData();
            FORM.append('idJugador', id_jugador);
            FORM.append('idEntrenamiento', idEntrenamiento);
            const response = await fetchData(NOTAS_API, 'readOne', FORM);
            if (response.status) {
                return response.dataset;
            } else {
                console.log(response.error);
                return [];
            }
        } catch (error) {
            console.error("Error fetching notas:", error);
            return [];
        }
    };

    const fillCards = async () => {
        try {
            const caracteristicas = await fetchCaracteristicas();
            const notas = await fetchNotas();
    
            if (caracteristicas.length > 0) {
                // Crear un objeto para las características usando su nombre como clave
                const caracteristicasMap = caracteristicas.reduce((acc, caracteristica) => {
                    acc[caracteristica.NOMBRE] = caracteristica;
                    return acc;
                }, {});
    
                // Actualizar las características con las notas correspondientes
                const updatedPlayerStatuses = caracteristicas.map(caracteristica => {
                    const nota = notas.find(nota => nota.CARACTERISTICA === caracteristica.NOMBRE);
                    return nota ? { ...caracteristica, nota: nota.NOTA } : { ...caracteristica };
                });
    
                setPlayerStatuses(updatedPlayerStatuses);
            }
        } catch (error) {
            console.error("Error filling cards:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillCards();
    }, []);

    useEffect(() => {
        fillCards();
    }, []);

    const handleStatusChange = (name, status) => {
        setPlayerStatuses((prevStatuses) =>
            prevStatuses.map((player) =>
                player.NOMBRE === name ? { ...player, nota: status } : player
            )
        );
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Pruebas</Text>
            <Text style={styles.subHeaderText}>
                Aquí podrás modificar o agregar calificaciones de este entrenamiento en especifico, ¡Recuerda guardar antes de salir!
            </Text>
            <Text style={styles.textHorario}>
                <Text style={styles.horariotext}>Estas evaluando a {jugador}</Text>
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Guardar prueba</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollContainer} refreshing={refreshing} onRefresh={onRefresh}>
                <View>
                    {playerStatuses.map((player, index) => (
                        <PlayerCard
                            key={index}
                            name={player.NOMBRE}
                            status={player.nota}
                            color={player.color}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: windowHeight * 0.12,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeaderText: {
        fontSize: 16,
        marginBottom: 16,
        marginStart: 10,
        maxWidth: windowWidth,
    },
    button: {
        backgroundColor: '#5AE107', // Green color
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: "transparent",
        height: 40,
        borderWidth: 1, // Añadimos el borde
        borderColor: '#D3D3D3', // Color gris claro para el borde
        borderRadius: 8, // Bordes redondeados
        textAlign: 'center', // Texto centrado
        flex: 1,
        justifyContent: 'center', // Alineación vertical centrada para TextInput
    },
    selectScheduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'center',
        borderWidth: 0.1,
        elevation: 2,
        borderRadius: 20,
    },
    selectScheduleText: {
        fontSize: 16,
        marginEnd: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingStart: 25,
        paddingEnd: 25,
    },
    tabActive: {
        flex: 1,
        padding: 12,
        backgroundColor: '#334195', // Active tab color
        alignItems: 'center',
        borderRadius: 8,
    },
    tabInactive: {
        flex: 1,
        padding: 12,
        backgroundColor: '#9A9A9A', // Inactive tab color
        alignItems: 'center',
        borderRadius: 8,
    },
    tabText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
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
    },
    observationsContainer: {
        padding: 16,
    },
    //MODAL
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
    playerContainerM: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        borderLeftWidth: 10,
    },
    playerTextM: {
        fontSize: 16,
    },
    observationButtonM: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    observationIconM: {
        width: 24,
        height: 24,
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
    textHorario: {
        backgroundColor: '#fff', // White color
        padding: 12,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 16,
        // Shadow properties for iOS
        shadowColor: '#D3D3D3',
        shadowOffset: { width: 4, height: 4 }, // Shadow towards right and bottom
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 5,
        // Additional border to enhance 3D effect
        borderRightColor: '#D3D3D3',
        borderRightWidth: 3,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
    },
    horariotext: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headTest: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#FFF', // Blanco
        backgroundColor: '#000', // Negro
        borderTopLeftRadius: 8, // Bordes redondeados en las esquinas superiores
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0, // Sin bordes redondeados en las esquinas inferiores
        borderBottomRightRadius: 0,
        padding: 10, // Espacio interior
    },

});

export default TestPlayerScreen;
