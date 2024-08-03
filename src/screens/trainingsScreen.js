import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchData from '../../api/components';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import soccer from '../../assets/Player-soccer.png';

const TrainingCard = ({ date, time, playersPresent, onPress, idEntrenamiento }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
            <View style={styles.infoRow}>
                <TouchableOpacity style={styles.infoRowTwo}  onPress={() => onPress(idEntrenamiento)}>
                    <View style={styles.iconButton}>
                        <Image source={soccer}></Image>
                    </View>
                    <Text style={styles.linkText}>Ver asistencias</Text>
                </TouchableOpacity>
                <View style={styles.infoRowTwo}>
                    <View style={styles.playersCount}>
                        <Text style={styles.playersCountText}>{playersPresent}</Text>
                    </View>
                    <Text style={styles.linkText}>Jugadores presentes</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const TrainingsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { idEquipo } = route.params;
    console.log('Id del equipo pantalla de mostrar entrenamientos: ' + idEquipo);

    const goToAssistsM = (idEntrenamiento) => {
        navigation.navigate('Modificar asistencia', { idEntrenamiento, idEquipo }); // Pasar idEntrenamiento y idEquipo
    };

    const goToAssists = () => {
        navigation.navigate('Asistencia', { idEquipo });
    };

    const [trainings, setTrainings] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
    const API = 'services/technics/entrenamientos.php';

    const fillCards = async () => {
        const form = new FormData();
        form.append('idEquipo', idEquipo);
        const DATA = await fetchData(API, 'readAllMobile', form);

        if (DATA.status) {
            let data = DATA.dataset;
            setTrainings(data);
        } else {
            console.log(DATA.error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillCards();
        setRefreshing(false);
    }, [idEquipo]);

    useEffect(() => {
        fillCards();
    }, [idEquipo]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Entrenamientos</Text>
            <View style={styles.infoRowTree}>
                <Ionicons name="football" size={35} color="black" />
                <Text style={styles.subHeaderText}>
                    Aquí puedes ver los entrenamientos de los últimos meses. O también puedes pasar asistencia.
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={goToAssists}>
                <Text style={styles.buttonText}>Pasar asistencia</Text>
            </TouchableOpacity>
            <ScrollView
                style={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {trainings.map((item, index) => (
                    <TrainingCard
                        key={index}
                        date={item.FECHA}
                        time={item.HORARIO}
                        playersPresent={item.JUGADORES_PRESENTES}
                        idEntrenamiento={item.IDEN}
                        onPress={goToAssistsM}
                    />
                ))}
                {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
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
    scrollContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRowTwo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoRowTree: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 6,
    },
    linkText: {
        color: '#000000',
        textDecorationLine: 'underline',
        marginHorizontal: 5,
    },
    iconButton: {
        backgroundColor: '#5AE107',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    playersCount: {
        backgroundColor: '#000',
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    playersCountText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TrainingsScreen;
