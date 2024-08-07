import {View, StyleSheet, Dimensions, ScrollView, Image, ActivityIndicator} from "react-native";
import {Card, Text} from "react-native-paper";
import React, {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import fetchData from "../../../api/components";
import {BarChart} from "react-native-chart-kit";
import LoadingComponent from "../LoadingComponent";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const TrainingPlayer = ({idJugador}) => {

    const API_PLAYERS = 'services/technics/jugadores.php';
    const [prom, setProm] = useState(0.0);
    const [matches, setMatches] = useState(0);
    const [notes, setNotes] = useState([]);
    const [load, setLoading] = useState(true); // Estado de carga inicializado en true

    const getProm = async () => {
        const FORM = new FormData();
        FORM.append('idJugador', idJugador);

        const DATA = await fetchData(API_PLAYERS, 'promByPlayer', FORM);

        if(DATA.status){
            setProm(DATA.dataset);
        }else{
            console.log(DATA.error)
        }
    };

    const getMatches = async () => {
        const FORM = new FormData();
        FORM.append('idJugador', idJugador);

        const DATA = await fetchData(API_PLAYERS, 'matchesByPlayer', FORM);

        if(DATA.status){
            setMatches(DATA.dataset);
        }else{
            console.log(DATA.error)
        }
    };

    const getNotes = async ()=>{
        const FORM = new FormData();
        FORM.append('idJugador', idJugador);

        const DATA = await fetchData(API_PLAYERS, 'notesByPlayer', FORM);

        if(DATA.status){
            setNotes(DATA.dataset);
        }else{
            console.log(DATA.error)
        }
    }

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

    const data = {
        labels: notes.map(note => note.clasificacion_caracteristica_jugador),
        datasets: [
            {
                data: notes.map(note => note.nota_por_area)
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#F2F7FF",
        backgroundGradientTo: "#F2F7FF",
        color: (opacity = 1) => `rgba(56, 0, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1.5,
        useShadowColorFromDataset: false // optional
    };

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

                        <ScrollView horizontal={true}>
                            <BarChart
                                data={data}
                                width={windowWidth}
                                height={220}
                                chartConfig={chartConfig}
                                verticalLabelRotation={20}
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
        marginBottom: 15,
        fontSize: 12,
        marginHorizontal: 15
    }
});
export default TrainingPlayer;
