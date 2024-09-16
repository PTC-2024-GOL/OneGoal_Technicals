import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect, } from "@react-navigation/native";
import edit from '../../../assets/iconPlayersScreen/Edit.png';
import fetchData from '../../../api/components';
import AlertComponent from "../../../src/components/AlertComponent";
import LoadingComponent from "../LoadingComponent";

const PruebasComponent = ({ idEntrenamiento }) => {
    const navigation = useNavigation();
    const [players, setPlayers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
    const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
    const [globalAverage, setGlobalAverage] = useState(0); // Estado para el promedio global
    const [response, setResponse] = useState(false);
    const API = 'services/technics/caracteristicas_analisis.php';
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCallback, setAlertCallback] = useState(null);
    const [url, setUrl] = useState('');

    // Función para cargar las cartas de las pruebas
    const fillCards = async () => {
        try {
            const form = new FormData();
            form.append('idEntrenamiento', idEntrenamiento);
            const dataResponse = await fetchData(API, 'readAll', form);

            if (dataResponse.status) {
                let data = dataResponse.dataset;
                setPlayers(data);
                calculateGlobalAverage(data);
                setResponse(true);
            } else {
                console.log(DATA.error);
                setPlayers([]);
                setResponse(false);
            }
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    // Metodo para calcular el promedio del equipo entero.
    const calculateGlobalAverage = (playersData) => {
        if (playersData.length === 0) return 0;

        const total = playersData.reduce((sum, player) => sum + parseFloat(player.PROMEDIO), 0);
        const average = total / playersData.length;
        setGlobalAverage(average.toFixed(1));
    };

    // Metodo para ir a evaluar notas
    const goToTest = (id_jugador, jugador) => {
        navigation.navigate('Pruebas', { id_jugador, jugador, idEntrenamiento });
    };

    // Metodo para ir a detalle de jugadores
    const goToPlayersDetails = (id_jugador) => {
        navigation.navigate('PlayersDetails', { id_jugador });
    };

    //Metodo para refrescar
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillCards();
    }, [idEntrenamiento]);

    //Cargar los datos
    useEffect(() => {
        fillCards();
    }, [idEntrenamiento]);

    //Cargar los datos si se regresa a la pantalla
    useFocusEffect(
        useCallback(() => {
            fillCards();
        }, [idEntrenamiento])
    )

    // Función para cerrar la alerta
    const handleAlertClose = () => {
        setAlertVisible(false);
        if (alertCallback) alertCallback();
        if (url) {
            // Extraer parámetros de la URL
            const params = new URLSearchParams(url.split('?')[1]);
            const id_jugador = params.get('id_jugador');
            const jugador = params.get('jugador');
            const idEntrenamiento = params.get('idEntrenamiento');

            // Navegar a la pantalla con los parámetros
            navigation.navigate('Analisis del jugador', { id_jugador, jugador, idEntrenamiento });
        }
    };

    //Función para ir a pantalla analisis del jugador
    const showPlayerAverage = (id_jugador, average, jugador) => {
        setAlertMessage(`Promedio del jugador: ${average}`);
        setAlertVisible(true);
        setAlertType(4);
        setUrl(`Analisis del jugador?id_jugador=${id_jugador}&jugador=${jugador}&idEntrenamiento=${idEntrenamiento}`);
    };

    //Función para cambiar el color según el promedio
    const getColorByPromedio = (promedio) => {
        if (promedio <= 3) return '#FF0000'; // Rojo
        if (promedio <= 5) return '#FF69B4'; // Rosado
        if (promedio <= 6) return '#FFFF00'; // Amarillo
        if (promedio <= 8) return '#90EE90'; // Verde claro
        if (promedio <= 9) return '#008000'; // Verde oscuro
        return '#0000FF'; // Azul
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
                <LoadingComponent />
            ) : (
                response ? (
                    <ScrollView
                        style={styles.scrollContainer}
                    >
                        <View style={styles.row}>
                            <Text style={styles.leftText}>El promedio global del equipo es: </Text>
                            <Text style={[styles.rightText, { backgroundColor: getColorByPromedio(globalAverage) }]}>{globalAverage}</Text>
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Jugador</Text>
                            <Text style={styles.headerText}>Promedio</Text>
                            <Text style={styles.headerText}>Pruebas</Text>
                        </View>
                        {players.map((player, index) => (
                            <TouchableOpacity key={index} style={[styles.playerCard, { borderLeftColor: getColorByPromedio(player.PROMEDIO) }]} onPress={() => goToPlayersDetails(player.IDJ)}>
                                <Text style={styles.playerName}>{player.JUGADOR}</Text>
                                <TouchableOpacity onPress={() => showPlayerAverage(player.IDJ, player.PROMEDIO, player.JUGADOR)}>
                                    <Text style={styles.playerTextPromedio}>{player.PROMEDIO}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.observationButton}
                                    onPress={() => goToTest(player.IDJ, player.JUGADOR)}
                                >
                                    <Image source={edit} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                            </TouchableOpacity>
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
                            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron entrenamientos</Text>
                        </View>
                    </ScrollView>
                )
            )}
            <AlertComponent
                visible={alertVisible}
                type={alertType}
                message={alertMessage}
                onClose={handleAlertClose}
            />
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
        maxWidth: 325
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
});

export default PruebasComponent;
