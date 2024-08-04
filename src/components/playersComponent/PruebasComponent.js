import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import edit from '../../../assets/iconPlayersScreen/Edit.png';
import fetchData from '../../../api/components';

const PruebasComponent = ({ idEntrenamiento }) => {
    const navigation = useNavigation();
    const [players, setPlayers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
    const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
    const API = 'services/technics/caracteristicas_analisis.php';

    const fillCards = async () => {
        try {
            const form = new FormData();
            form.append('idEntrenamiento', idEntrenamiento);
            const DATA = await fetchData(API, 'readAll', form);

            if (DATA.status) {
                let data = DATA.dataset;
                setPlayers(data);
            } else {
                console.log(DATA.error);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const goToTest = () => {
        navigation.navigate('Pruebas');
    };

    const goToPlayersDetails = (id_jugador) => {
        navigation.navigate('PlayersDetails', { id_jugador });
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillCards();
    }, [idEntrenamiento]);

    useEffect(() => {
        fillCards();
    }, [idEntrenamiento]);


    const getColorByPromedio = (promedio) => {
        if (promedio <= 3) return '#FF0000'; // Rojo
        if (promedio <= 5) return '#FF69B4'; // Rosado
        if (promedio <= 6) return '#FFFF00'; // Amarillo
        if (promedio <= 8) return '#90EE90'; // Verde claro
        if (promedio <= 9) return '#008000'; // Verde oscuro
        return '#0000FF'; // Azul
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
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
                    <View style={styles.row}>
                        <Text style={styles.leftText}>El promedio global del equipo es: </Text>
                        <Text style={styles.rightText}>8.4</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Jugador</Text>
                        <Text style={styles.headerText}>Promedio</Text>
                        <Text style={styles.headerText}>Pruebas</Text>
                    </View>
                    {players.map((player, index) => (
                        <TouchableOpacity key={index} style={[styles.playerCard, { borderLeftColor: getColorByPromedio(player.PROMEDIO) }]} onPress={() => goToPlayersDetails(player.IDJ)}>
                            <Text style={styles.playerName}>{player.JUGADOR}</Text>
                            <Text style={styles.playerTextPromedio}>{player.PROMEDIO}</Text>
                            <TouchableOpacity
                                style={styles.observationButton}
                                onPress={() => goToTest()}
                            >
                                <Image source={edit} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                    {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
                </ScrollView>
            )}
        </View>
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
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 10, // Añade algo de padding para centrar mejor el texto
        borderRadius: 50, // Un valor alto para hacerlo circular, ajusta según el tamaño
        textAlign: 'center', // Centra el texto
        overflow: 'hidden', // Asegura que el texto se mantenga dentro del círculo
        width: 45, // Ajusta el ancho para que sea un círculo perfecto
        height: 45, // Ajusta la altura para que sea un círculo perfecto
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