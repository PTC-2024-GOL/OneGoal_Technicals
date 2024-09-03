import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, RefreshControl, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import soccer from '../../assets/icon-observacion.png';
import fetchData from '../../api/components';
import AlertComponent from '../components/AlertComponent';
import PlayerCardObservation from '../components/asistenciasComponents/PlayerCardObservation';
import PlayerCard from '../components/asistenciasComponents/PlayerCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Este componente es el encargado de mostrar la pantalla de asistencias, se encarga de mostrar los horarios disponibles y los jugadores que asistieron a cada horario.
const AssistsScreen = () => {
    const API = 'services/technics/asistencias.php';
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false); 
    const [scheduleOptions, setScheduleOptions] = useState([]);
    const [jugadores, setJugadores] = useState([]);
    // Esta variable contiene el IDENTRENAMIENTO seleccionado
    const [boolAsistance, setBoolAsistance] = useState(0);
    const [idHorario, setIdHorario] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [observationText, setObservationText] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessage2, setAlertMessage2] = useState('');
    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertCallback, setAlertCallback] = useState(null);
  const [alertType, setAlertType] = useState(1);
    const route = useRoute();
    const { idEquipo } = route.params;

    // Función que se encarga de llenar los horarios disponibles, esta función se ejecuta al cargar la pantalla.
    // Esta función tiene más de una función, aunque en este caso solo se utiliza para llenar los horarios.
    const fillHorarios = async () => {
        const FORM = new FormData();
        FORM.append('idEquipo', idEquipo);
        const DATA = await fetchData(API, 'readOneHorarioMovil', FORM);
        if (DATA.status) {
            setAlertMessage2('Selecciona un horario para iniciar.');
            console.log('Horarios :', DATA.dataset);
            const horarios = DATA.dataset.map((item) => ({
                label: item.horario,
                value: item.id_entrenamiento,
                id_horario: item.id_horario,
            }));
            setScheduleOptions(horarios);
        } else {
            console.log(DATA.error);
            setAlertMessage2('No hay entrenamientos disponibles.');
        }
    };

    // Función que se encarga de guardar la asistencia de los jugadores, esta función se ejecuta al presionar el botón de guardar.
    // Esta función se puede usar para crear y actualizar la asistencia de los jugadores, debido a que es compatible con todo.
    const guardarAsistencia = async () => {
        if (!idHorario) {
            setAlertCallback(null);
            setAlertMessage('Selecciona un horario antes de guardar.');
        setAlertVisible(true);
        setAlertType(3);
            return;
        }
        const FORM = new FormData();
        //El idHorario en mi caso lo saco desde el inicio del combobox de horarios, 
        //pero en caso de que se quiera usar para actualizar se puede obtener de esta forma:
        /*
        const FORM = new FormData();
        FORM.append('idEntrenamiento', ID_ENTRENAMIENTO_url);
        Petición para guardar los datos del formulario.
        const DATA = await fetchData(ASISTENCIAS_API_2, 'readOne', FORM);
        if (DATA.status) {
        idHorario = DATA.dataset.id_horario;
        }   
        */
        FORM.append('idHorario', idHorario);
       //El boolAsistance es un booleano que inidica si vas a agregar o actualizar la asistencia, en mi caso lo manejo con un 0 por defecto.
       //En caso de que se quiera usar para actualizar solo se le da el valor de 1 o true
        FORM.append('idAsistenciaBool', boolAsistance);
        //El arreglo de jugadores es el arreglo de objetos que se obtiene de readAll o readAllDefault, en mi caso lo manejo con el arreglo de jugadores.
        //Recuerda pasarlo a JSON.stringify para que se pueda enviar por POST.
        FORM.append('arregloAsistencia', JSON.stringify(jugadores));
        console.log('FORM:', idHorario, boolAsistance, jugadores);
        //Se usa el action de createRow para guardar la asistencia de los jugadores, independientemente que se agregue o se actualice.
        const DATA = await fetchData(API, 'createRow', FORM);
        if (DATA.status) {
            setAlertCallback(null);
            setAlertMessage('Asistencia guardada correctamente.');
        setAlertVisible(true);
        setAlertType(1);
            navigation.goBack();
        } else {
            console.log(DATA.error);
        }
    };

    // Función que se encarga de manejar el cierre de la alerta, esta función se ejecuta al presionar el botón de cerrar.
    const handleAlertClose = () => {
        setAlertVisible(false);
        if (alertCallback) alertCallback();
      };

    // Función que se encarga de llenar los jugadores que asistieron a un entrenamiento, esta función se ejecuta al seleccionar un horario.
    // Esta función se puede usar para llenar update, el único detalle es que se debe cambiar el action de la petición. a "readAll" en vez del que esta "readAlldefault".
    // A esta función solo se le pasa el id_entrenamiento, en mi caso para llenar fillJugadores necesito primero el entrenamiento seleccionado.
    // Pero en casois como actualizar se puede pasar directamente el id_entrenamiento debido a que viene como parametro de la pantalla.
    const fillJugadores = async (id_entrenamiento) => {
        const FORM = new FormData();
        FORM.append('idEntrenamiento', id_entrenamiento);
        const DATA = await fetchData(API, 'readAlldefault', FORM);
        if (DATA.status) {
            const registros = DATA.dataset.map((item) => ({
                id_asistencia: item.id_asistencia,
                observacion: item.observacion,
                id: item.id,
                jugador: item.jugador,
                asistencia: item.asistencia,
                id_entrenamiento: item.id_entrenamiento,
                //En mi caso el color es #4CAF50 porque todos tienen asistencia por defecto, en caso de que se quiera cambiar ese color se puede manejar dependiendo de item.asistencia.
                color: '#4CAF50',
            }));
            setJugadores(registros);
        } else {
            console.log(DATA.error);
        }
    };

    // Función para cargar los horarios disponibles, esta función se ejecuta al cargar la pantalla. en el caso de actualizar no se cargan los horarios, de un solo los jugadores.
    useEffect(() => {
        fillHorarios();
    }, []);

    // Función que se encarga de manejar el cambio de horario, esta función se ejecuta al seleccionar un horario.
    const handleScheduleChange = (value) => {
        const selectedOption = scheduleOptions.find(option => option.value === value);
        const id_horario = selectedOption ? selectedOption.id_horario : null;
    
        fillJugadores(value);
        setSelectedSchedule(value);
        setIdHorario(id_horario);
        console.log('Entrenamiento seleccionado:', value, ' Horario: ', id_horario);
    };

    // Función que se encarga de decidir qué página se mostrará primero
    const [activeTab, setActiveTab] = useState('historial');

    // Función que se encarga de actualizar el arreglo de objetos obtenido de readAll o readAllDefault, esta función se ejecuta al cambiar el estado de asistencia de un jugador.
    // Esta función espera el id del jugador y el nuevo estado de asistencia.
    // Esta función mapea el arreglo de objetos para actulizar registros en base a los id de los jugadores.
    const updateStatus = (id, newStatus) => {
        setJugadores((prevJugadores) => {
            const updatedJugadores = prevJugadores.map((jugador) => {
                if (jugador.id === id) {
                    return { ...jugador, asistencia: newStatus };
                }
                return jugador;
            });
            console.log('Jugadores actualizados:', jugadores);
            return updatedJugadores;
        });
    };

    // Función que se encarga de abrir el modal de observación, esta función se ejecuta al presionar el botón de observación.
    // Esta función espera el id del jugador.
    // Esta función busca el jugador en el arreglo de jugadores y obtiene la observación del jugador.
    const openObservationModal = (id) => {
        const jugador = jugadores.find((jugador) => jugador.id === id);
        setObservationText(jugador.observacion);
        setSelectedPlayerId(id);
        setModalVisible(true);
    };

    // Función que se encarga de actualizar el arreglo de objetos obtenido de readAll o readAllDefault, esta función se ejecuta al cambiar la observación de un jugador.
    // Esta función mapea el arreglo de objetos para actulizar registros en base a los id de los jugadores.
    // Esta función obtiene el id del jugador y la nueva observación solito (la verdad no sé ni cómo funciona lol, pero funciona).
    const saveObservation = () => {
        setJugadores((prevJugadores) => {
            const updatedJugadores = prevJugadores.map((jugador) => {
                if (jugador.id === selectedPlayerId) {
                    return { ...jugador, observacion: observationText };
                }
                return jugador;
            });
            console.log('Jugadores actualizados observacion:', jugadores);
            return updatedJugadores;
        });
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Entrenamientos</Text>
            <Text style={styles.subHeaderText}>
                Aquí puedes pasar asistencia, cuando guardes la asistencia, podrás realizar pruebas a cada jugador (tú decides si haces pruebas o no).
            </Text>
            <TouchableOpacity style={styles.button} onPress={guardarAsistencia}>
                <Text style={styles.buttonText}>Guardar asistencia</Text>
            </TouchableOpacity>
            <AlertComponent
        visible={alertVisible}
        type={alertType}
        message={alertMessage}
        onClose={handleAlertClose}
      />
      <AlertComponent
        visible={alertVisible}
        type={alertType}
        message={alertMessage2}
        onClose={handleAlertClose}
      />
            <RNPickerSelect
                onValueChange={handleScheduleChange}
                items={scheduleOptions}
                style={pickerSelectScheduleStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                    label: 'Selecciona un horario...',
                    value: 0,
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
                {(selectedSchedule == 0 || selectedSchedule == null) ? (
                    <ScrollView
                        style={styles.scrollContainer}
                    >
                    <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                        <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15 }}>{alertMessage2}</Text>
                    </View>
                    </ScrollView>
                ) : (
                    activeTab === 'historial' ? (
                        <View>
                            <View style={styles.headerM}>
                                <Text style={styles.headerTextM}>Jugadores</Text>
                                <Text style={styles.headerTextM}>Asistencias</Text>
                            </View>
                            {jugadores.map((player, index) => (
                                <PlayerCard
                                    key={index}
                                    name={player.jugador}
                                    status={player.asistencia}
                                    id={player.id}
                                    updateStatus={updateStatus}
                                />
                            ))}
                        </View>
                    ) : (
                        <View>
                            <View style={styles.headerM}>
                                <Text style={styles.headerTextM}>Jugadores</Text>
                                <Text style={styles.headerTextM}>Observaciones</Text>
                            </View>
                            {jugadores.map((player, index) => (
                                <PlayerCardObservation
                                    key={index}
                                    name={player.jugador}
                                    color={player.color}
                                    id={player.id}
                                    openObservationModal={openObservationModal}
                                />
                            ))}
                        </View>
                    )
                )}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
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
                                    <TextInput
                                        style={styles.textInput}
                                        multiline
                                        numberOfLines={4}
                                        onChangeText={setObservationText}
                                        value={observationText}
                                    />
                                </View>
                                <View style={styles.justifyContentM}>
                                    <TouchableOpacity style={styles.saveButtonM} onPress={saveObservation}>
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
    observationTextM: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginLeft: 10,
    },
    noScheduleText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
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
