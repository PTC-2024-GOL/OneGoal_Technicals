import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import soccer from '../../../assets/icon-observacion.png'; // Asegúrate de ajustar la ruta de la imagen según sea necesario


// Este componente es el encargado de mostrar la tarjeta de cada jugador con su respectiva observación, se le pasan las siguientes cosas:
// name: Nombre del jugador
// color: Color de la tarjeta
// id: Identificador del jugador
// openObservationModal: Función para abrir el modal de observación
const PlayerCardObservation = ({ index, name, color, id, openObservationModal }) => {
    return (
        <View key={index} style={[styles.playerCard, { borderLeftColor: color }]}>
            <Text style={styles.playerName}>{name}</Text>
            <TouchableOpacity
                style={styles.observationButtonM}
                onPress={() => openObservationModal(id)}
            >
                <Image source={soccer} style={styles.observationIconM} />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
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
    observationButtonM: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    observationIconM: {
        width: 24,
        height: 24,
    },
});
export default PlayerCardObservation;
