import { View, StyleSheet, Image, ScrollView, Modal, Dimensions, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import soccer from '../../../assets/icon-observacion.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const players = [
    { name: '6 de noviembre 2025', color: '#4CAF50' },
    { name: '14 de noviembre 2025', color: '#F44336' },
    { name: '16 de noviembre 2025', color: '#2196F3' },
    { name: '24 de diciembre 2025', color: '#2196F3' },
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

const AssistancePlayer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const playersData = [
        { name: 'Jueves 18 de abril', status: 'Asistencia', color: '#4CAF50' },
        { name: 'Jueves 8 de abril', status: 'Falta', color: '#F44336' },
        { name: 'Jueves 1 de abril', status: 'Viaje', color: '#2196F3' },
        { name: 'Jueves 25 de mayo', status: 'Viaje', color: '#2196F3' },
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

    return (
        <ScrollView>
            <View style={styles.container}>

                {/*Primeras cartas*/}
                <ScrollView
                    horizontal={true}
                    alwaysBounceHorizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={styles.rowCards}>
                        <Card style={styles.card}>
                            <Card style={styles.cardBlue}>
                                <Text style={styles.textMiniColor}>Asistencias</Text>
                                <Text style={styles.textColor} variant='displayMedium'>5</Text>
                            </Card>
                        </Card>
                        <Card style={styles.card}>
                            <Card style={styles.cardCyan}>
                            <Text style={styles.textMiniColor}>Porcentaje de asistencias</Text>
                                <Text style={styles.textColor} variant='displayMedium'>85%</Text>
                            </Card>
                        </Card>
                        <Card style={styles.card}>
                            <Card style={styles.cardPurple}>
                            <Text style={styles.textMiniColor}>Inasistenicas injustificadas</Text>
                                <Text style={styles.textColor} variant='displayMedium'>21</Text>
                            </Card>
                        </Card>
                        <Card style={styles.card}>
                            <Card style={styles.cardBlue}>
                                <Text style={styles.textMiniColor}>Inasistencias justificadas</Text>
                                <Text style={styles.textColor} variant='displayMedium'>16</Text>
                            </Card>
                        </Card>
                        <Card style={styles.card}>
                            <Card style={styles.cardCyan}>
                            <Text style={styles.textMiniColor}>Inasistencia por enfermedad</Text>
                                <Text style={styles.textColor} variant='displayMedium'>4</Text>
                            </Card>
                        </Card>
                        <Card style={styles.card}>
                            <Card style={styles.cardPurple}>
                            <Text style={styles.textMiniColor}>Inasistencia por lesión</Text>
                                <Text style={styles.textColor} variant='displayMedium'>30</Text>
                            </Card>
                        </Card>
                    </View>
                </ScrollView >
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
                            <Text style={styles.headerTextM}>Fecha</Text>
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
                                <Text style={styles.headerTextM}>Fecha</Text>
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
                                            <Text style={styles.modalTitleM}>Observación</Text>
                                        </View>
                                    </LinearGradient>

                                    <ScrollView>
                                        <View style={styles.contentM}>
                                            <View style={styles.observationBoxM}>
                                                <View style={styles.blueLineM}></View>
                                                <Text style={styles.observationTextM}>
                                                    Juan presentó molestias en su pie derecho por lo que se despachó y se fue a su casa. Dependiendo de cómo siga, si pondrá como lesionado.
                                                </Text>
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
        </ScrollView>
    );
}
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
        backgroundColor: '#F2F7FF',
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: windowWidth * 0.03,
        paddingVertical: 20,
        marginBottom: windowHeight * 0.15
    },
    icon: {
        width: 15,
        height: 15
    },
    scrollView: {
        flexDirection: 'row',
        padding: 10 // Cambia el color de fondo del ScrollView a morado
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 4
    },
    rowCards: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    rowTwo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginVertical: 15
    },
    bold: {
        fontWeight: "bold"
    },
    card: {
        marginHorizontal: 5,
        height: 110,
        backgroundColor: 'white'
    },
    center: {
        textAlign: "center",
    },
    centerName: {
        marginTop: 10,
        textAlign: "center"
    },
    status: {
        backgroundColor: '#5AE107',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    iconTwo: {
        width: 30,
        height: 30
    },
    cardCyan: {
        padding: 20,
        backgroundColor: '#0077B6',
        width: 140
    },
    cardBlue: {
        padding: 20,
        backgroundColor: '#03045E',
        width: 140,
        justifyContent: 'space-between'
    },
    cardPurple: {
        padding: 20,
        backgroundColor: '#7209B7',
        width: 140
    },
    textColor: {
        color: 'white',
        textAlign: "center",
        top: 24,
        marginBottom: 20
    },
    textMiniColor: {
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        top: 0, // Coloca el texto en la parte superior del contenedor
        left: 0, // Opcional: Alinea el texto a la izquierda
        right: 0, // Opcional: Alinea el texto a la derecha
        textAlign: 'center', // Centra el texto horizontalmente
        marginTop: 0
    },
    //Segundas cartas
    healthCard: {
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    rowHealthCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 15
    },
    color: {
        color: 'green'
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
    observationsContainer: {
        padding: 16,
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
    contentM: {
        padding: 20,
        alignItems: 'center',
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
        textAlign: 'center',
        marginLeft: 10,
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

})
export default AssistancePlayer