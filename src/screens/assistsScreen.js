import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerCard = ({ name, status, color, onStatusChange }) => {
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        onStatusChange(name, value);
    };

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
        <View style={[styles.playerCard, { borderLeftColor: color }]}>
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
                    return <Ionicons name="chevron-down" size={16} color="#5AE107" />;
                }}
            />
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

    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [activeTab, setActiveTab] = useState('historial'); // Estado para rastrear la pestaña activa
    const [playerStatuses, setPlayerStatuses] = useState(playersData);

    const handleStatusChange = (name, status) => {
        setPlayerStatuses((prevStatuses) =>
            prevStatuses.map((player) =>
                player.name === name ? { ...player, status } : player
            )
        );
    };

    const scheduleOptions = [
        { label: '8:00 AM - 10:00 AM', value: '8-10' },
        { label: '10:00 AM - 12:00 PM', value: '10-12' },
        { label: '2:00 PM - 4:00 PM', value: '2-4' },
        { label: '4:00 PM - 6:00 PM', value: '4-6' },
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
                <RNPickerSelect
                    onValueChange={(value) => setSelectedSchedule(value)}
                    items={scheduleOptions}
                    style={pickerSelectStyles}
                    placeholder={{
                        label: 'Selecciona un horario...',
                        value: null,
                    }}
                />
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={activeTab === 'historial' ? styles.tabActive : styles.tabInactive}
                    onPress={() => setActiveTab('historial')}
                >
                    <Text style={styles.tabText}>Historial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={activeTab === 'observaciones' ? styles.tabActive : styles.tabInactive}
                    onPress={() => setActiveTab('observaciones')}
                >
                    <Text style={styles.tabText}>Observaciones</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {activeTab === 'historial' ? (
                    playerStatuses.map((player, index) => (
                        <PlayerCard
                            key={index}
                            name={player.name}
                            status={player.status}
                            color={player.color}
                            onStatusChange={handleStatusChange}
                        />
                    ))
                ) : (
                    // Aquí va el contenido de Observaciones
                    <View style={styles.observationsContainer}>
                        <Text>Observaciones de los jugadores</Text>
                        {/* Agregar contenido específico para observaciones */}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
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
        justifyContent: 'center',
        borderWidth: 0.1,
        elevation: 2,
        borderRadius:20,
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
});

export default AssistsScreen;
