import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const PlayerCard = ({ name, status, id, updateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        updateStatus(id, value);
    };

    const asistenciaColors = (asistencia) => {
        switch (asistencia) {
            case 'Asistencia':
                return '#4CAF50'; // Verde
            case 'Ausencia injustificada':
                return '#F44336'; // Rojo
            case 'Enfermedad':
                return '#FF9800'; // Naranja
            case 'Estudio':
                return '#2196F3'; // Azul
            case 'Trabajo':
                return '#009688'; // Teal
            case 'Viaje':
                return '#3F51B5'; // Índigo
            case 'Permiso':
                return '#FFC107'; // Amarillo
            case 'Falta':
                return '#9E9E9E'; // Gris
            case 'Lesion':
                return '#E91E63'; // Rosa
            case 'Otro':
                return '#673AB7'; // Púrpura
            default:
                return '#B0BEC5'; // Color por defecto
        }
    };

    const borderColor = asistenciaColors(status);
    const statusOptions = [
        { label: 'Asistencia', value: 'Asistencia' },
        { label: 'Ausencia injustificada', value: 'Ausencia injustificada' },
        { label: 'Enfermedad', value: 'Enfermedad' },
        { label: 'Estudio', value: 'Estudio' },
        { label: 'Trabajo', value: 'Trabajo' },
        { label: 'Viaje', value: 'Viaje' },
        { label: 'Permiso', value: 'Permiso' },
        { label: 'Falta', value: 'Falta' },
        { label: 'Lesion', value: 'Lesion' },
        { label: 'Otro', value: 'Otro' },
    ];

    return (
        <View style={[styles.playerCard, { borderLeftColor: borderColor }]}>
            <Text style={styles.playerName}>{name}</Text>
            <RNPickerSelect
                onValueChange={handleStatusChange}
                items={statusOptions}
                style={pickerSelectCardStyles}
                value={selectedStatus}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                    label: 'Selecciona un estado...',
                    value: null,
                }}
                Icon={() => {
                    return <Ionicons name="chevron-up" size={16} color="#5AE107" />;
                }}
            />
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
        textAlign: 'center',
        elevation: 2,
        width: windowWidth * 0.95,
        height: windowHeight * 0.13,
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        width: windowWidth * 0.35,
    }
});

const pickerSelectCardStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#5AE107',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#5AE107',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 15,
        right: 12,
    },
});

export default PlayerCard;
