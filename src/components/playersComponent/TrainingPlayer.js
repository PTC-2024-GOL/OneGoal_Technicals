import {View, StyleSheet, Dimensions, ScrollView, Image, ActivityIndicator} from "react-native";
import {Card, Text} from "react-native-paper";
import React, {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import fetchData from "../../../api/components";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import LoadingComponent from "../LoadingComponent";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

//Recibimos el parametro de idJugador.
const TrainingPlayer = ({idJugador}) => {

    //Declaracion de variables
    const API_PLAYERS = 'services/technics/jugadores.php';
    const [prom, setProm] = useState(0.0);
    const [matches, setMatches] = useState(0);
    const [notes, setNotes] = useState([]);
    const [load, setLoading] = useState(true); // Estado de carga inicializado en true

    //Obtiene el promedio del jugador de acuerdo a las notas registradas
    const getProm = async () => {
        const FORM = new FormData();
        FORM.append('idJugador', idJugador);

        const DATA = await fetchData(API_PLAYERS, 'promByPlayer', FORM);

        //Si la peticion viene bien entonces le asigna la data a la variable setProm.
        if(DATA.status){
            setProm(DATA.dataset);
        }else{
            console.log(DATA.error)
        }
    };

    //Funcion que devuelve la cantidad de partidos jugados por el jugador
    const getMatches = async () => {
        const FORM = new FormData();
        FORM.append('idJugador', idJugador);

        const DATA = await fetchData(API_PLAYERS, 'matchesByPlayer', FORM);

        //Si la peticion viene correcta entonces se le asigana la data a la varibale setMatches.
        if(DATA.status){
            setMatches(DATA.dataset);
        }else{
            console.log(DATA.error)
        }
    };

    //Funcion que devuelve cada una de las notas que el jugador ha tenido en sus areas de entrenamiento
    const getNotes = async ()=>{
        const FORM = new FormData();
        FORM.append('idJugador', idJugador);

        const DATA = await fetchData(API_PLAYERS, 'notesByPlayer', FORM);

        //Si la peticion viene correcta entonces se asignan las notas a la varibale notes.
        if(DATA.status){
            setNotes(DATA.dataset);
        }else{
            console.log(DATA.error)
        }
    }

    //Cada vez que haya un cambio las peticiones se ejecutan nuevamente.
    useFocusEffect(
        useCallback(() => {
            //Espera a que todas las peticiones se terminen.
            const fetchData = async () => {
                //Empieza a mostrarse el icono de carga
                setLoading(true);
                await getMatches();
                await getNotes();
                await getProm();
                //Termina de mostrarse el icono de carga
                setLoading(false);
            };
            fetchData();
        }, [idJugador])
    );

    //en la variable data le asignamos todas la notas traidas de la api asi como su area.
    const data = notes.map(note => ({
        value: parseFloat(note.nota_por_area, 10),
        label: note.clasificacion_caracteristica_jugador
    }));

    return (
        <ScrollView>
            <View style={styles.container}>
                {load ? (
                    <LoadingComponent/>
                ) : (
                    <>
                        <View style={styles.rowCards}>
                            <View style={styles.col}>
                                <View style={styles.rowContent}>
                                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/table.png')}/>
                                    <Text variant='titleMedium'>Nota global</Text>
                                </View>
                                <Card style={styles.cardCyan}>
                                    <Text style={styles.textColor} variant='displayMedium'>{prom.notaGlobal}</Text>
                                </Card>
                                <View style={styles.rowContent}>
                                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Info.png')}/>
                                    <Text style={styles.info}>Incluye todas las áreas evaluadas (Físicas, técnicas, tácticos y psicológicas)</Text>
                                </View>
                            </View>

                            <View style={styles.col}>
                                <View style={styles.rowContent}>
                                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Soccer Ball.png')}/>
                                    <Text variant='titleMedium'>Partidos jugados</Text>
                                </View>
                                <Card style={styles.cardBlue}>
                                    <Text style={styles.textColor} variant='displayMedium'>{matches.partidos}</Text>
                                </Card>
                            </View>
                        </View>

                        <Text style={styles.title}>Promedio de las áreas evaluadas</Text>
                        <Text style={styles.subtitle}>En la gráfica podrás observar el promedio de notas por cada una de las áreas que se le han evaluado</Text>

                        {/*Grafica de barras */}
                        <ScrollView horizontal={true}>
                            <BarChart
                                barWidth={50}
                                noOfSections={3}
                                barBorderRadius={4}
                                frontColor="#46317e"
                                data={data}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                isAnimated
                            />
                        </ScrollView>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F7FF',
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: windowWidth * 0.03,
        paddingVertical: 15,
        marginBottom: windowHeight * 0.15
    },
    rowCards: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginVertical: 10
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    icon: {
        width: 20,
        height: 20
    },
    bold: {
        fontWeight: "bold"
    },
    cardCyan: {
        padding: 20,
        backgroundColor: '#0077B6',
        width: 140
    },
    cardBlue: {
        padding: 20,
        backgroundColor: '#03045E',
        width: 140
    },
    textColor: {
        color: 'white',
        textAlign: "center"
    },
    info: {
        fontSize: 12,
        fontWeight: "100",
        width: 160,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 15
    },
    subtitle: {
        justifyContent: "center",
        marginBottom: 20,
        fontSize: 12,
        marginHorizontal: 15
    }
});
export default TrainingPlayer;
