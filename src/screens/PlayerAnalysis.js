import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AlertComponent from '../../src/components/AlertComponent';
import { PieChart, LineChart } from 'react-native-gifted-charts'; // Cambia PieChart a DonutChart

import fetchData from '../../api/components';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerAnalysis = () => {
    const route = useRoute();
    const { id_jugador, jugador, idEntrenamiento } = route.params;

    console.log(id_jugador);
    console.log(idEntrenamiento);

    const [dataLine, setDataLine] = useState([]);
    const [dataPie, setDataPie] = useState([]);
    const [playerStatuses, setPlayerStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [response, setResponse] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCallback, setAlertCallback] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null); // Estado para manejar la nota seleccionada
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    // Datos estáticos para pruebas
    const staticCaracteristicas = [
        { NOMBRE: 'Velocidad', NOTA: '8' },
        { NOMBRE: 'Resistencia', NOTA: '7' },
        { NOMBRE: 'Técnica', NOTA: '9' },
        { NOMBRE: 'Estrategia', NOTA: '6' },
        { NOMBRE: 'Trabajo en equipo', NOTA: '8' },
    ];

    const getRandomColor = () => {
        // Genera un color hexadecimal aleatorio
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Genera datos para las gráficas
    const radarData = staticCaracteristicas.map((status, index) => ({
        value: parseInt(status.NOTA, 10),
        color: colors[getRandomColor()], // Asigna colores de forma cíclica
        gradientCenterColor: colors[getRandomColor()],
        label: status.NOMBRE,
    }));

    const lineData = staticCaracteristicas.map((status, index) => ({
        value: parseInt(status.NOTA, 10),
        label: `Semana ${index + 1}`,
    }));

    const API = 'services/technics/caracteristicas_analisis.php';

    const fillGraphicDoughnut = async () => {
        try {
            const FORM = new FormData();
            FORM.append('idJugador', id_jugador);
            FORM.append('idEntrenamiento', idEntrenamiento);
            const response = await fetchData(API, 'graphic', FORM);
            if (response.status) {
                let data = response.dataset.map(item => ({
                    value: parseInt(item.NOTA, 10), // Asegúrate de que los valores sean enteros
                    color: getRandomColor(), // Asigna colores aleatorios
                    label: item.CARACTERISTICA,
                }));
                setDataPie(data);
                setResponse(true);
                // RETORNA "CARACTERISTICA Y LA NOTA"
            } else {
                setDataPie([]);
                setResponse(false);
            }
        } catch (error) {
            console.error("Error fetching caracteristicas:", error);
            return [];
        }
    };

    useEffect(() => {
        // Simula un retraso para la carga de datos
        setTimeout(() => {
            fillGraphicDoughnut();
            setPlayerStatuses(staticCaracteristicas);
            setLoading(false);
        }, 1000);
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // Simula el refresco de datos
        setTimeout(() => {
            setPlayerStatuses(staticCaracteristicas);
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleDataPointClick = (data) => {
        // Maneja el clic en un punto de datos
        setSelectedNote(data.value);
    };

    const renderLegendComponent = () => {
        return (
            <View style={styles.legendContainer}>
                {dataPie.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: getRandomColor() }]} />
                        <Text style={styles.legendText}>{item.label}: {item.value}</Text>
                    </View>
                ))}
            </View>
        );
    };

    // Maneja el cierre del alert
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
                            <PieChart
                                data={dataPie}
                                donut
                                showGradient
                                sectionAutoFocus
                                radius={90}
                                innerRadius={60}
                                innerCircleColor={'#03045E'}
                                centerLabelComponent={() => {
                                    return (
                                        <View>
                                            <Text style={{ color: 'white', fontSize: 36 }}>90</Text>
                                            <Text style={{ color: 'white', fontSize: 18 }}>Total</Text>
                                        </View>
                                    );
                                }}
                                onDataPointClick={handleDataPointClick} // Agrega el manejador de clic
                            />
                        </View>
                        {renderLegendComponent()}
                    </View>
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Gráfico Lineal</Text>
                        <LineChart
                            areaChart
                            hideDataPoints={false}  // Asegúrate de mostrar los puntos
                            isAnimated
                            animationDuration={1200}
                            startFillColor="#03045E"
                            startOpacity={1}
                            endOpacity={0.3}
                            initialSpacing={0}
                            data={lineData}  // Utiliza el arreglo de datos lineData
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
                                radius: 10,  // Tamaño del punto
                                pointerLabelWidth: 100,
                                pointerLabelHeight: 90,
                                activatePointersOnLongPress: true,
                                autoAdjustPointerLabelPosition: false,
                                pointerLabelComponent: (items) => {
                                    if (items.length === 0) return null; // Evita errores si no hay datos
                                    const item = items[0]; // Utiliza el primer item
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
            {/* Modal para mostrar la nota seleccionada */}
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
    textHorario: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 16,
        shadowColor: '#D3D3D3',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRightColor: '#D3D3D3',
        borderRightWidth: 3,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
    },
    horariotext: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
    },
    chartContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartStyle: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        color: 'white',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartWrapper: {
        backgroundColor: '#03045E',
        padding: 20,
        borderRadius: 20,
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLabelText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    centerLabelSubtitle: {
        fontSize: 14,
        color: 'white',
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 10,
    },
    legendDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    legendText: {
        color: 'black',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#03045E',
        marginBottom: 20,
    },
    modalCloseButton: {
        fontSize: 16,
        color: '#0077b6',
        fontWeight: 'bold',
    },
});

export default PlayerAnalysis;
