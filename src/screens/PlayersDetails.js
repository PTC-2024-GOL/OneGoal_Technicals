import {StyleSheet, View, Text, SafeAreaView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Avatar, Chip} from "react-native-paper";
import {useCallback, useState} from "react";
import {useFocusEffect, useRoute} from "@react-navigation/native"; // Importa useRoute
import InfoPlayers from "../components/playersComponent/InfoPlayer";
import TrainingPlayer from "../components/playersComponent/TrainingPlayer";
import AssistancePlayer from "../components/playersComponent/assistancePlayer";
import fetchData from "../../api/components";
import {SERVER_URL} from "../../api/constantes";

const PlayersDetails = () => {
    // Manejo del cambio de pantallas.
    const [activeSection, setActiveSection] = useState('informacion');
    // Manejo para el estilo de los botones.
    const [activeChip, setActiveChip] = useState('informacion');
    const [players, setPlayers] = useState([]);
    const API_PLAYERS = 'services/technics/jugadores.php';
    const API_ESTADO_FISICO = 'services/technics/estado_fisico_jugador.php';
    const [estadoFisico, setEstadoFisico] = useState([]);

    // Obtén el parámetro de la ruta
    const route = useRoute();
    const { id_jugador } = route.params;

    // Función que permite el cambio de pantallas, recibe un parámetro (opciones de los botones (informacion, rendimiento o asistencias))
    const changeScreen = (section) => {
        // Manejo para el cambio de pantalla
        setActiveSection(section);
        // Manejo para el estilo de los chips
        setActiveChip(section);
    };

    //Peticion a la api para traerme informacion sobre el estado fisico del jugador
    const fillEstadoFisico = async () => {
        const form = new FormData();
        form.append('idJugador', id_jugador);

        const data = await fetchData(API_ESTADO_FISICO, 'readAllMobile', form)
        if(data.status){
            let dataEstate = data.dataset;
            setEstadoFisico(dataEstate);
            console.log(estadoFisico);
        }else {
            console.log(data.error);
        }
    }

    //Peticion a la api para traerme informacion sobre el jugador
    const fillPlayers = async (idJugador) => {
        const form = new FormData();
        form.append('idJugador', idJugador);
        const data = await fetchData(API_PLAYERS, 'readOne', form);
        if(data.status){
            let dataPlayers = data.dataset;
            setPlayers(dataPlayers)
        }else{
            console.log(data.error)
        }
    }

    // Permite que se llame a la funcion cada vez que cambie el idEquipo, filter o el search
    useFocusEffect(
        useCallback(()=>{
            fillPlayers(id_jugador);
            fillEstadoFisico();
        },[id_jugador, activeSection])
    )

    // Variable que guardará el contenido que se mostrará en la pantalla
    let contentComponent;
    // Evaluamos la opción que se ha elegido y dependiendo de ello inyectará el componente de la información requerida a contentComponent.
    switch (activeSection) {
        case 'informacion':
            contentComponent = <InfoPlayers informationPlayer={players} estadoFisico={estadoFisico}/>;
            break;
        case 'rendimiento':
            contentComponent = <TrainingPlayer idJugador={id_jugador}/>;
            break;
            case 'asistencias':
                contentComponent = <AssistancePlayer idJugador={id_jugador} />;
                break;
        default:
            contentComponent = null;
    }

    return (
        <View style={styles.container}>
            {/*HEADER*/}

            <LinearGradient style={styles.linearGradient} colors={['#03045E', '#0608C4']}>
                <Avatar.Image size={120} source={{uri: `${SERVER_URL}images/jugadores/${players.foto_jugador}`}}/>
                <Text style={styles.namePlayer}>{players.nombre_jugador + ' ' + players.apellido_jugador}</Text>
                <Text style={styles.positionPlayer}>{players.posicionPrincipal}</Text>
            </LinearGradient>

            {/*BUTTONS*/}
            <View style={styles.rowButton}>
                <Chip
                    style={{backgroundColor: activeChip === 'informacion' ? '#03045E' : '#F2EEEF',}}
                    onPress={() => changeScreen('informacion')}
                    textStyle={{color: activeChip === 'informacion' ? 'white' : '#9A9A9A'}}>Información
                </Chip>
                <Chip
                    style={{backgroundColor: activeChip === 'rendimiento' ? '#03045E' : '#F2EEEF',}}
                    onPress={() => changeScreen('rendimiento')}
                    textStyle={{color: activeChip === 'rendimiento' ? 'white' : '#9A9A9A'}}>Rendimiento
                </Chip>
                <Chip
                    style={{backgroundColor: activeChip === 'asistencias' ? '#03045E' : '#F2EEEF',}}
                    onPress={() => changeScreen('asistencias')}
                    textStyle={{color: activeChip === 'asistencias' ? 'white' : '#9A9A9A'}}>Asistencias
                </Chip>
            </View>

            {/*INFORMACION SELECCIONADA*/}
            {contentComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    linearGradient: {
        paddingTop: 50,
        paddingBottom: 25,
        flexDirection: "column",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    namePlayer: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center"
    },
    positionPlayer: {
        color: 'white',
        fontSize: 20
    },
    rowButton: {
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

export default PlayersDetails;
