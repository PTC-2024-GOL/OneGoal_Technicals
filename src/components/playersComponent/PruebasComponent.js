// PruebasComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import edit from '../../../assets/iconPlayersScreen/Edit.png';

const players = [
    { name: 'Juan Perez', promedio: '8', color: '#4CAF50' },
    { name: 'José Morán', promedio: '6', color: '#F44336' },
    { name: 'Maicol Leandro', promedio: '9', color: '#2196F3' },
    { name: 'Eduardo Cubias', promedio: '7', color: '#2196F3' },
];

const PruebasComponent = ({idEntrenamiento}) => {
    const navigation = useNavigation();
    console.log('Identificador del entrenamiento en el componente ' + idEntrenamiento)
    const goToTest = () => {
        navigation.navigate('Pruebas');
    };

    return (
        <View>
            <ScrollView>
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
                    <View key={index} style={[styles.playerCard, { borderLeftColor: player.color }]}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <Text style={styles.playerTextPromedio}>{player.promedio}</Text>
                        <TouchableOpacity
                            style={styles.observationButton}
                            onPress={() => goToTest()}
                        >
                            <Image source={edit} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    leftText: {
        fontSize: 16,
    },
    rightText: {
        fontSize: 16,
        fontWeight: 'bold',
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
    },
    playerTextPromedio: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 50,
        textAlign: 'center',
        overflow: 'hidden',
        width: 45,
        height: 45,
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
