import React, { useState } from 'react';
import {View, Text, StyleSheet, Modal, Image, Dimensions, TouchableOpacity, ScrollView, TextInput} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation,useRoute } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import soccer from '../../assets/icon-observacion.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const players = [
    { name: 'Juan Perez', color: '#4CAF50' },
    { name: 'José Morán', color: '#F44336' },
    { name: 'Maicol Leandro', color: '#2196F3' },
    { name: 'Eduardo Cubias', color: '#2196F3' },
];



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
                    return <Ionicons name="chevron-up" size={16} color="#5AE107" />;
                }}
            />
        </View>
    );
};

const AssistsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { idEquipo } = route.params;
    console.log('Id del equipo pantalla de crear: ' + idEquipo);

    const playersData = [
        { name: 'Juan Perez', status: 'Asistencia', color: '#4CAF50' },
        { name: 'José Morán', status: 'Asistencia', color: '#F44336' },
        { name: 'Maicol Leandro', status: 'Asistencia', color: '#2196F3' },
        { name: 'Eduardo Cubias', status: 'Asistencia', color: '#2196F3' },
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
                <RNPickerSelect
                    onValueChange={(value) => setSelectedSchedule(value)}
                    items={scheduleOptions}
                    style={pickerSelectScheduleStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                        label: 'Selecciona un horario...',
                        value: null,
                    }}
                    Icon={() => {
                        return <Ionicons name="chevron-up" size={32} color="#5AE107" />;
                    }}
                />
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
                    
                    <View>
                        <View style={styles.headerM}>
                            <Text style={styles.headerTextM}>Jugadores</Text>
                            <Text style={styles.headerTextM}>Asistencias</Text>
                        </View>
                        {playerStatuses.map((player, index) => (
                            <PlayerCard
                                key={index}
                                name={player.name}
                                status={player.status}
                                color={player.color}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </View>
                ) : (
                    // Aquí va el contenido de Observaciones
                    <View>
                        <ScrollView>
                            {/* Encabezado */}
                            <View style={styles.headerM}>
                                <Text style={styles.headerTextM}>Jugadores</Text>
                                <Text style={styles.headerTextM}>Observación</Text>
                            </View>

                            {/* Lista de jugadores */}
                            {players.map((player, index) => (
                                <View key={index} style={[styles.playerCard, { borderLeftColor: player.color }]}>
                                    <Text style={styles.playerName}>{player.name}</Text>
                                    <TouchableOpacity
                                        style={styles.observationButtonM}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Image source={soccer}></Image>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => { setModalVisible(!modalVisible); }}
                        >
                            <View style={styles.modalCenterM}>
                                <View style={styles.modalContainerM}>
                                    <LinearGradient colors={['#020887', '#13071E']} style={styles.headerModalM}>
                                        <View style={styles.modalRowM}>
                                            <Image style={styles.imagesM} source={require('../../assets/gol_blanco 2.png')} />
                                            <Text style={styles.modalTitleM}>Observación</Text>
                                        </View>
                                    </LinearGradient>

                                    <ScrollView>
                                        <View style={styles.contentM}>
                                            <Text style={styles.fw}>Escribe la observación del jugador</Text>
                                            <View style={styles.observationBoxM}>
                                                <View style={styles.blueLineM}></View>
                                                <TextInput style={styles.observationTextM} multiline={true}/>
                                            </View>
                                            <View style={styles.justifyContentM}>
                                                <TouchableOpacity style={styles.saveButtonM} onPress={() => setModalVisible(false)}>
                                                    <Text style={styles.buttonTextM}>Guardar</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.closeButtonM} onPress={() => setModalVisible(false)}>
                                                    <Text style={styles.buttonTextM}>Cerrar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const pickerSelectScheduleStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderTopWidth:5,
        borderTopColor: '#5209B0',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
        elevation: 2,
        width: '100%',
        marginBottom: 12,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth:5,
        borderTopColor: '#5209B0',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
        elevation: 2,
        width: '100%',
        marginBottom: 12,
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
});

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
    //MODAL
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
        padding: 20
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
    contentM: {
        padding: 20,
    },
    observationBoxM: {
        backgroundColor: '#f0f4f8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        position: 'relative',
    },
    blueLineM: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        backgroundColor: '#2196F3',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    observationTextM: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
        height: 50
    },
    closeButtonM: {
        padding: 10,
        backgroundColor: '#F44262',
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        marginLeft: 10,
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
    fw: {
        fontWeight: "bold",
        marginBottom: 10
    }

    
});

export default AssistsScreen;
