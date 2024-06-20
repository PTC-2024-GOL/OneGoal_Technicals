import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import soccer from '../../assets/Player-soccer.png';

const TrainingCard = ({ date, time, playersPresent, onPress }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
            <View style={styles.infoRow}>
                <TouchableOpacity style={styles.infoRowTwo} onPress={onPress}>
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

    const goToAssists = () => {
        navigation.navigate('Asistencia');
    };

    const trainingData = [
        { date: '24 de agosto', time: 'Horario de 9:00 am a 13:00 pm', playersPresent: 21 },
        { date: '19 de agosto', time: 'Horario de 9:00 am a 13:00 pm', playersPresent: 10 },
        { date: '18 de agosto', time: 'Horario de 15:00 pm a 17:00 pm', playersPresent: 15 },
        { date: '17 de agosto', time: 'Horario de 15:00 pm a 17:00 pm', playersPresent: 21 },
        { date: '15 de agosto', time: 'Horario de 13:00 pm a 15:00 pm', playersPresent: 21 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Entrenamientos</Text>
            <View style={styles.infoRowTree}>
            <Ionicons name="football" size={35} color="black"/>
            <Text style={styles.subHeaderText}>
                Aquí puedes ver los entrenamientos de los últimos meses. O también puedes pasar asistencia.
            </Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Pasar asistencia</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollContainer}>
                {trainingData.map((item, index) => (
                    <TrainingCard
                        key={index}
                        date={item.date}
                        time={item.time}
                        playersPresent={item.playersPresent}
                        onPress={goToAssists}
                    />
                ))}
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
        margin:6,
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
