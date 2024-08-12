import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, Image, Dimensions, TouchableOpacity, RefreshControl, ScrollView, TextInput, ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import soccer from '../../assets/icon-observacion.png';
import edit from '../../assets/iconPlayersScreen/Edit.png';
import PruebasComponent from '../components/playersComponent/PruebasComponent'; // Importa el nuevo componente
import fetchData from '../../api/components';  // Importa función para realizar peticiones API
import AlertComponent from '../components/AlertComponent'; 
import LoadingComponent from "../components/LoadingComponent"; 

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Este componente es el encargado de mostrar la tarjeta de cada jugador con su respectivo estado de asistencia, se le pasan las siguientes cosas:
// name: Nombre del jugador
// status: Estado de asistencia del jugador
// color: Color de la tarjeta
// id: Identificador del jugador
// updateStatus: Función para actualizar el estado de asistencia del jugador
const PlayerCard = ({ name, status, color, id, updateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        updateStatus(id, value);
    };

     // Opciones de estado de asistencia
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

    const borderColor = asistenciaColors(selectedStatus);

    // Este componente es el encargado de mostrar la tarjeta de cada jugador con su respectivo estado de asistencia, se le pasan las siguientes cosas:
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
                    return <Ionicons name="chevron-up" size={16} color="fff" />;
                }}
            />
        </View>
    );
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



// Este componente es el encargado de mostrar la tarjeta de cada jugador con su respectiva observación, se le pasan las siguientes cosas:
// name: Nombre del jugador
// color: Color de la tarjeta
// id: Identificador del jugador
// openObservationModal: Función para abrir el modal de observación
const PlayerCardObservation = ({ index, name, color, id, openObservationModal }) => {
    //const hola = asistenciaColors(asistencia);
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

// Este componente es el encargado de mostrar la pantalla de asistencias, se encarga de mostrar los horarios disponibles y los jugadores que asistieron a cada horario.
const AssistsScreenM = () => {
    const API = 'services/technics/asistencias.php'; //Url de la api
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco
    const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial
    const [modalVisible, setModalVisible] = useState(false);
    const [jugadores, setJugadores] = useState([]);
    // Esta variable contiene el IDENTRENAMIENTO seleccionado
    const [hora, setHora] = useState([]);
    const [boolAsistance, setBoolAsistance] = useState(1);
    const [idHorario, setIdHorario] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const [observationText, setObservationText] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [response, setResponse] = useState(false);
    const [alertCallback, setAlertCallback] = useState(null);
    const [alertType, setAlertType] = useState(1);

    const navigation = useNavigation();
    const route = useRoute();
    const { idEntrenamiento, idEquipo } = route.params;
    console.log('Id del entrenamiento pantalla de modificar: ' + idEntrenamiento);
    console.log('Id del equipo pantalla de modificar: ' + idEquipo);

    // Función que se encarga de guardar la asistencia de los jugadores, esta función se ejecuta al presionar el botón de guardar.
    // Esta función se puede usar para crear y actualizar la asistencia de los jugadores, debido a que es compatible con todo.

    const guardarAsistencia = async () => {
        const formHora = new FormData();
        const form = new FormData();
        formHora.append('idEntrenamiento', idEntrenamiento);
        const dataHora = await fetchData(API, 'readOne', formHora);

        if (dataHora.status) {
            
            let IdHorarioNew = dataHora.dataset.id_horario;

            form.append('idHorario', IdHorarioNew);
            //El boolAsistance es un booleano que inidica si vas a agregar o actualizar la asistencia, en mi caso lo manejo con un 0 por defecto.
            //En caso de que se quiera usar para actualizar solo se le da el valor de 1 o true
            form.append('idAsistenciaBool', boolAsistance);
            //El arreglo de jugadores es el arreglo de objetos que se obtiene de readAll o readAllDefault, en mi caso lo manejo con el arreglo de jugadores.
            //Recuerda pasarlo a JSON.stringify para que se pueda enviar por POST.
            form.append('arregloAsistencia', JSON.stringify(jugadores));
            console.log('FORM:', IdHorarioNew, boolAsistance, jugadores);
            //Se usa el action de createRow para guardar la asistencia de los jugadores, independientemente que se agregue o se actualice.
            const data = await fetchData(API, 'createRow', form);
            if (data.status) {
                setAlertCallback(null);
                setAlertMessage('Asistencia guardada correctamente.');
                setAlertVisible(true);
                setAlertType(1);
                navigation.goBack();
            } else {
                console.log(data.error);
            }
        }
        else {
            console.log(data.error);
        }
        


    };

     //Metodo para refrescar
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fillJugadores();
    }, [idEntrenamiento]);

    // Función para cargar los horarios disponibles, esta función se ejecuta al cargar la pantalla. en el caso de actualizar no se cargan los horarios, de un solo los jugadores.
    useEffect(() => {
        fillJugadores();
        fillHorario();
    }, [idEntrenamiento]);

    //Cargar los datos si se regresa a la pantalla
    useFocusEffect(
        useCallback(()=>{
            fillJugadores();
        },[idEntrenamiento])
    );

    // Función que se encarga de manejar el cierre de la alerta, esta función se ejecuta al presionar el botón de cerrar.
    const handleAlertClose = () => {
        setAlertVisible(false);
        if (alertCallback) alertCallback();
    };

    // Función que se encarga de llenar los jugadores que asistieron a un entrenamiento, esta función se ejecuta al seleccionar un horario.
    // Esta función se puede usar para llenar update, el único detalle es que se debe cambiar el action de la petición. a "readAll" en vez del que esta "readAlldefault".
    // A esta función solo se le pasa el id_entrenamiento, en mi caso para llenar fillJugadores necesito primero el entrenamiento seleccionado.
    // Pero en casois como actualizar se puede pasar directamente el id_entrenamiento debido a que viene como parametro de la pantalla.
    const fillJugadores = async () => {
        try {
            const formData = new FormData();
            formData.append('idEntrenamiento', idEntrenamiento);
            const data = await fetchData(API, 'readAll', formData);
            if (data.status) {
                const registros = data.dataset.map((item) => ({
                    id_asistencia: item.id_asistencia,
                    observacion: item.observacion,
                    id: item.id,
                    jugador: item.jugador,
                    asistencia: item.asistencia,
                    id_entrenamiento: item.id_entrenamiento,
                    //En mi caso el color es #4CAF50 porque todos tienen asistencia por defecto, en caso de que se quiera cambiar ese color se puede manejar dependiendo de item.asistencia.
                    color: asistenciaColors(item.asistencia),
                }));
                setJugadores(registros);
                setResponse(true);
            } else {
                console.log(data.error);
                setResponse(false);
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
            setRefreshing(false);
        }

    };

    //Funcion que se encarga de mostrar el horario seleccionado
    const fillHorario = async () => {
        try {
            const formData = new FormData();
            formData.append('idEntrenamiento', idEntrenamiento);
            const data = await fetchData(API, 'readOneHorarioMostrar', formData);
            console.log(data);
            if (data.status) {
                let dataSet = data.dataset;
                console.log('Horario recibido: ', dataSet);
                setHora(dataSet);
            } else {
                console.log(data.error);
                setHora('');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


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

    const [activeTab, setActiveTab] = useState('historial'); // Estado para rastrear la pestaña activa

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>Entrenamientos</Text>
            <Text style={styles.subHeaderText}>
                Aquí podrás realizar pruebas a cada jugador (tú decides si haces pruebas o no).
                Y ver información de este entrenamiento
            </Text>
            <Text style={styles.textHorario}>
                {hora.map((hora, index) => (
                    <View key={index}>
                        <Text style={styles.horariotext}>{hora.horario}</Text>
                    </View>
                ))}
            </Text>
            <TouchableOpacity style={styles.button} onPress={guardarAsistencia}>
                <Text style={styles.buttonText}>Modificar asistencia</Text>
            </TouchableOpacity>
            <AlertComponent
                visible={alertVisible}
                type={alertType}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <View style={styles.tabContainer}>
               <ScrollView horizontal={true}>
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
               </ScrollView>
            </View>
            {activeTab === 'historial' ? (
                <ScrollView style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />

                    }>
                    {loading ? (
                        <LoadingComponent/>
                    ) : (
                        response ? (
                            < ScrollView
                                style={styles.scrollContainer}
                            >
                                <View style={styles.headerM}>
                                    <Text style={styles.headerTextM}>Jugadores</Text>
                                    <Text style={styles.headerTextM}>Asistencias</Text>
                                </View>
                                {jugadores.map((player, index) => (
                                    <PlayerCard
                                        key={index}
                                        name={player.jugador}
                                        status={player.asistencia}
                                        color={player.color}
                                        id={player.id}
                                        updateStatus={updateStatus}
                                    />
                                ))}
                                {refreshing && <ActivityIndicator size="large" color="#0000ff" />}

                            </ScrollView>
                        ) : (
                            <ScrollView
                                style={styles.scrollContainer}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                            >
                                <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                    <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15 }}>No se encontraron jugadores</Text>
                                </View>
                            </ScrollView>
                        )
                    )}
                </ScrollView>
            ) : activeTab === 'observaciones' ? (
                // Aquí va el contenido de Observaciones

                <ScrollView style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />

                    }>
                    <View>
                        {loading ? (
                            <LoadingComponent/>
                        ) : (
                            response ? (
                                < ScrollView
                                    style={styles.scrollContainer}
                                >
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
                                    {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
                                </ScrollView>
                            ) : (
                                <ScrollView
                                    style={styles.scrollContainer}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                >
                                    <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
                                        <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15 }}>No se encontraron jugadores</Text>
                                    </View>
                                </ScrollView>
                            )
                        )}
                    </View>
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
                </ScrollView>


            ) : (
                // Aquí va el contenido de Pruebas
                // Aquí va el contenido de Observaciones
                <PruebasComponent idEntrenamiento={idEntrenamiento} />
            )}
        </View >

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
        borderColor: 'black',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'black',
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
        marginBottom: 18,
    },
    tabActive: {
        flex: 1,
        padding: 10,
        margin: 3,
        width: 110,
        backgroundColor: '#334195', // Active tab color
        alignItems: 'center',
        borderRadius: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    tabInactive: {
        flex: 1,
        padding: 10,
        margin: 3,
        width: 110,
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
        maxWidth: 100,
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
