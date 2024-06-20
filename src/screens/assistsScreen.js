import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerCard = ({ name, status, color }) => {
    return (
        <View style={[styles.playerCard, { borderColor: color }]}>
            <Text style={styles.playerName}>{name}</Text>
            <TouchableOpacity style={styles.assistButton}>
                <Text style={styles.assistButtonText}>{status}</Text>
                <Ionicons name="chevron-down" size={16} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const AssistsScreen = () => {
    const navigation = useNavigation();

    const playersData = [
        { name: 'Juan Perez', status: 'Asistencia', color: '#5AE107' },
        { name: 'José Morán', status: 'Asistencia', color: '#FF0000' },
        { name: 'Maicol Leandro', status: 'Asistencia', color: '#007AFF' },
        { name: 'Eduardo Cubias', status: 'Asistencia', color: '#007AFF' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Entrenamientos</Text>
            <Text style={styles.subHeaderText}>
                Aquí puedes pasar asistencia, cuando guardes la asistencia, podrás realizar pruebas a cada jugador (tú decides si haces pruebas o no).
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Guardar asistencia</Text>
            </TouchableOpacity>
            <View style={styles.selectScheduleContainer}>
                <Text style={styles.selectScheduleText}>Elige un horario</Text>
                <Ionicons name="chevron-up" size={16} color="black" />
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tabActive}>
                    <Text style={styles.tabText}>Historial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabInactive}>
                    <Text style={styles.tabText}>Observaciones</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {playersData.map((player, index) => (
                    <PlayerCard
                        key={index}
                        name={player.name}
                        status={player.status}
                        color={player.color}
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
    selectScheduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    selectScheduleText: {
        fontSize: 16,
        marginEnd: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tabActive: {
        flex: 1,
        padding: 12,
        backgroundColor: '#0000FF', // Active tab color
        alignItems: 'center',
        borderRadius: 8,
    },
    tabInactive: {
        flex: 1,
        padding: 12,
        backgroundColor: '#E0E0E0', // Inactive tab color
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
        borderWidth: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    assistButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5AE107',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    assistButtonText: {
        fontSize: 16,
        marginRight: 8,
    },
});

export default AssistsScreen;
