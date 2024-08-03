import {StyleSheet, View, Text, SafeAreaView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Avatar, Chip} from "react-native-paper";
import {useState} from "react";
import {useRoute} from "@react-navigation/native"; // Importa useRoute
import InfoPlayers from "../components/playersComponent/InfoPlayer";
import TrainingPlayer from "../components/playersComponent/TrainingPlayer";
import AssistancePlayer from "../components/playersComponent/assistancePlayer";

const PlayersDetails = () => {
    // Manejo del cambio de pantallas.
    const [activeSection, setActiveSection] = useState('informacion');
    // Manejo para el estilo de los botones.
    const [activeChip, setActiveChip] = useState('informacion');

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

    // Variable que guardará el contenido que se mostrará en la pantalla
    let contentComponent;
    // Evaluamos la opción que se ha elegido y dependiendo de ello inyectará el componente de la información requerida a contentComponent.
    switch (activeSection) {
        case 'informacion':
            contentComponent = <InfoPlayers/>;
            break;
        case 'rendimiento':
            contentComponent = <TrainingPlayer/>;
            break;
        case 'asistencias':
            contentComponent = <AssistancePlayer/>;
            break;
        default:
            contentComponent = null;
    }

    return (
        <View style={styles.container}>
            {/*HEADER*/}
            <LinearGradient style={styles.linearGradient} colors={['#03045E', '#0608C4']}>
                <Avatar.Image size={120} source={require('../../assets/man.png')}/>
                <Text style={styles.namePlayer}>José López</Text>
                <Text style={styles.positionPlayer}>Delantero</Text>
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
        color: 'white'
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
