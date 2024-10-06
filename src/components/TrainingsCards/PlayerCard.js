import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Componente para mostrar una tarjeta de jugador con su estado
const PlayerCard = ({ name, status, color, onStatusChange }) => {
    return (
        <View style={[styles.textHorario]}>
            <Text style={[styles.headTest, { backgroundColor: color }]}>{name}</Text>
            <TextInput
                style={styles.infoText}
                value={status}
                keyboardType='numeric'
                onChangeText={(text) => onStatusChange(name, text)}
            />
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
        backgroundColor: '#5AE107', 
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
        borderWidth: 1, 
        borderColor: '#D3D3D3', 
        borderRadius: 8, 
        textAlign: 'center',
        textAlignVertical: 'center',  
        flex: 1,
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
        backgroundColor: '#334195',
        alignItems: 'center',
        borderRadius: 8,
    },
    tabInactive: {
        flex: 1,
        padding: 12,
        backgroundColor: '#9A9A9A',
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

export default PlayerCard;