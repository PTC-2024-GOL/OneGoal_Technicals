import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AlertComponent from '../../src/components/AlertComponent';
import { PopulationPyramid, LineChart } from 'react-native-gifted-charts';

import fetchData from '../../api/components';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerAnalysis = () => {
    const route = useRoute();
    const { id_jugador, jugador, idEntrenamiento } = route.params;

    // Datos estáticos para pruebas
    const staticLineData = [
        { NOMBRE: 'Velocidad', NOTA: '8' },
        { NOMBRE: 'Resistencia', NOTA: '7' },
        { NOMBRE: 'Técnica', NOTA: '9' },
        { NOMBRE: 'Estrategia', NOTA: '6' },
        { NOMBRE: 'Trabajo en equipo', NOTA: '8' },
    ];
    const [dataPyramid, setDataPyramid] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [response, setResponse] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCallback, setAlertCallback] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null); // Estado para manejar la nota seleccionada

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const API = 'services/technics/caracteristicas_analisis.php';

    const linealData = staticLineData.map((status, index) => ({
        value: parseInt(status.NOTA, 10),
        label: `Semana ${index + 1}`,
    }));

    const fillGraphicPyramid = async () => {
        try {
            const FORM = new FormData();
            FORM.append('idJugador', id_jugador);
            FORM.append('idEntrenamiento', idEntrenamiento);
            const response = await fetchData(API, 'graphic', FORM);
            if (response.status) {
                let data = response.dataset.map(item => ({
                    left: parseInt(item.NOTA, 10),
                    right: parseInt(item.NOTA, 10),
                    label: item.CARACTERISTICA,
                    color: getRandomColor()
                }));
                setDataPyramid(data);
                setResponse(true);
            } else {
                setDataPyramid([]);
                setResponse(false);
            }
        } catch (error) {
            console.error("Error fetching caracteristicas:", error);
            return [];
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fillGraphicPyramid();
            // Aquí podrías llenar los datos para la gráfica lineal
            setLineData(linealData); // Asumiendo que tienes los datos estáticos para la gráfica lineal
            setLoading(false);
        }, 1000);
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setLineData(linealData); // Simula el refresco de datos para la gráfica lineal
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleDataPointClick = (data) => {
        setSelectedNote(data.value);
    };

    const renderLegendComponent = () => {
        return (
            <View style={styles.legendContainer}>
                {dataPyramid.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.label}: {item.left}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const handleAlertClose = () => {
        setAlertVisible(false);
        if (alertCallback) alertCallback();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Análisis del jugador</Text>
            <Text style={styles.subHeaderText}>
                Aquí podrás ver gráficas que muestran el rendimiento del jugador según las notas que has evaluado, además de su promedio histórico.
            </Text>
            <Text style={styles.textHorario}>
                <Text style={styles.horariotext}>Estás evaluando a {jugador}</Text>
            </Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <ScrollView
                    style={styles.scrollContainer}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Gráfico de notas obtenidas en el entrenamiento</Text>
                        <View style={styles.chartWrapper}>
                            <PopulationPyramid
                                data={dataPyramid}
                                showMidAxis
                                midAxisThickness={2}
                                leftLabelStyle={{ color: 'blue' }}
                                rightLabelStyle={{ color: 'red' }}
                                leftBarColor="blue"
                                rightBarColor="red"
                                barHeight={30}
                                barGap={10}
                                animationDuration={500}
                                barColor={data => data.color} // Asignar color a la barra
                            />
                        </View>
                        {renderLegendComponent()}
                    </View>
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Gráfico Lineal</Text>
                        <LineChart
                            areaChart
                            hideDataPoints={false}
                            isAnimated
                            animationDuration={1200}
                            startFillColor="#03045E"
                            startOpacity={1}
                            endOpacity={0.3}
                            initialSpacing={0}
                            data={lineData} // Datos para la gráfica lineal
                            spacing={30}
                            thickness={5}
                            hideRules
                            showYAxis
                            showXAxis
                            yAxisColor="#03045E"
                            xAxisColor="#03045E"
                            color="#03045E"
                            width={windowWidth * 0.8}
                            xAxisTextStyle={{ color: '#03045E', fontSize: 12 }}
                            yAxisTextStyle={{ color: '#03045E', fontSize: 12 }}
                            pointerConfig={{
                                pointerStripHeight: 160,
                                pointerStripColor: 'lightgray',
                                pointerStripWidth: 2,
                                pointerColor: 'lightgray',
                                radius: 10,
                                pointerLabelWidth: 100,
                                pointerLabelHeight: 90,
                                activatePointersOnLongPress: true,
                                autoAdjustPointerLabelPosition: false,
                                pointerLabelComponent: (items) => {
                                    if (items.length === 0) return null;
                                    const item = items[0];
                                    return (
                                        <View
                                            style={{
                                                height: 90,
                                                width: 100,
                                                justifyContent: 'center',
                                                marginTop: -30,
                                                marginLeft: -40,
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                                                {item.date}
                                            </Text>
                                            <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                    {item.value}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                },
                            }}
                        />
                    </View>
                </ScrollView>
            )}
            <Modal
                transparent={true}
                visible={selectedNote !== null}
                onRequestClose={() => setSelectedNote(null)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Nota: {selectedNote}</Text>
                        <Text
                            style={styles.modalCloseButton}
                            onPress={() => setSelectedNote(null)}
                        >
                            Cerrar
                        </Text>
                    </View>
                </View>
            </Modal>
            {alertVisible && (
                <AlertComponent
                    type={alertType}
                    message={alertMessage}
                    onClose={handleAlertClose}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subHeaderText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    textHorario: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    horariotext: {
        color: '#30A2FF',
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    chartContainer: {
        marginBottom: 32,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    chartWrapper: {
        alignItems: 'center',
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 8,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 4,
    },
    legendText: {
        fontSize: 12,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalCloseButton: {
        fontSize: 16,
        color: 'blue',
        marginTop: 10,
    },
});

export default PlayerAnalysis;
