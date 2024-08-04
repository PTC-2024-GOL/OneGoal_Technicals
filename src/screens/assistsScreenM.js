import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation,useRoute } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import soccer from '../../assets/icon-observacion.png';
import edit from '../../assets/iconPlayersScreen/Edit.png';
import PruebasComponent from '../components/playersComponent/PruebasComponent'; // Importa el nuevo componente
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const players = [
    { name: 'Juan Perez', promedio: '8', color: '#4CAF50' },
    { name: 'José Morán', promedio: '6', color: '#F44336' },
    { name: 'Maicol Leandro', promedio: '9', color: '#2196F3' },
    { name: 'Eduardo Cubias', promedio: '7', color: '#2196F3' },
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

const AssistsScreenM = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { idEntrenamiento, idEquipo } = route.params;
    console.log('Id del entrenamiento pantalla de modificar: ' + idEntrenamiento);
    console.log('Id del equipo pantalla de modificar: ' + idEquipo);

    const goToTest = () => {
        navigation.navigate('Pruebas');
    };

    const playersData = [
        { name: 'Tía paola', status: 'Asistencia', color: '#4CAF50' },
        { name: 'José Morán', status: 'Falta', color: '#F44336' },
        { name: 'Maicol Leandro', status: 'Otro', color: '#2196F3' },
        { name: 'Eduardo Cubias', status: 'Otro', color: '#2196F3' },
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
                Aquí podrás realizar pruebas a cada jugador (tú decides si haces pruebas o no).
                Y ver información de este entrenamiento
            </Text>
            <Text style={styles.textHorario}>
                <Text style={styles.horariotext}>Horario de 13:00 pm a 15:00 pm</Text>
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Guardar asistencia</Text>
            </TouchableOpacity>
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
                    <TouchableOpacity
                        style={activeTab === 'pruebas' ? styles.tabActive : styles.tabInactive}
                        onPress={() => setActiveTab('pruebas')}
                    >
                        <Text style={styles.tabText}>pruebas</Text>
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
                ) : activeTab === 'observaciones' ? (
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
                ) : (
                    // Aquí va el contenido de Pruebas
                    // Aquí va el contenido de Observaciones
                    <PruebasComponent idEntrenamiento={idEntrenamiento} />
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
        borderTopWidth: 5,
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
        borderTopWidth: 5,
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
    scrollView: {
        flexDirection: 'row', // Cambia el color de fondo del ScrollView a morado
        alignContent: 'center',
    },
    button: {
        backgroundColor: '#5AE107', // Green color
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    textHorario: {
        backgroundColor: '#000', // black color
        padding: 12,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 16,
    },
    horariotext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        paddingStart: 0,
        paddingEnd: 0,
        justifyContent: 'space-between'
    },
    tabActive: {
        flex: 1,
        padding: 10,
        margin: 3,
        backgroundColor: '#334195', // Active tab color
        alignItems: 'center',
        borderRadius: 8,
    },
    tabInactive: {
        flex: 1,
        padding: 10,
        margin: 3,
        backgroundColor: '#9A9A9A', // Inactive tab color
        alignItems: 'center',
        borderRadius: 8,
    },
    tabText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
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
    playerTextPromedio: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 10, // Añade algo de padding para centrar mejor el texto
        borderRadius: 50, // Un valor alto para hacerlo circular, ajusta según el tamaño
        textAlign: 'center', // Centra el texto
        overflow: 'hidden', // Asegura que el texto se mantenga dentro del círculo
        width: 45, // Ajusta el ancho para que sea un círculo perfecto
        height: 45, // Ajusta la altura para que sea un círculo perfecto
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%', // Ajusta esto según sea necesario
        padding: 10, // Añade algo de padding para que no se vea tan pegado a los bordes
    },
    leftText: {
        fontSize: 16,
        color: 'black',
    },
    rightText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#5AE107', // Green color
        padding: 10, // Añade algo de padding para centrar mejor el texto
        borderRadius: 50, // Un valor alto para hacerlo circular, ajusta según el tamaño
        textAlign: 'center', // Centra el texto
        overflow: 'hidden', // Asegura que el texto se mantenga dentro del círculo
        width: 45, // Ajusta el ancho para que sea un círculo perfecto
        height: 45, // Ajusta la altura para que sea un círculo perfecto
    },


});

export default AssistsScreenM;
