import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AlertComponent from '../../src/components/AlertComponent';
import { PieChart, LineChart } from 'react-native-gifted-charts'; // Cambia PieChart a DonutChart

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerAnalysis = () => {
    const route = useRoute();
    const { jugador } = route.params;

    const [playerStatuses, setPlayerStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCallback, setAlertCallback] = useState(null);

    // Datos estáticos para pruebas
    const staticCaracteristicas = [
        { NOMBRE: 'Velocidad', NOTA: '8' },
        { NOMBRE: 'Resistencia', NOTA: '7' },
        { NOMBRE: 'Técnica', NOTA: '9' },
        { NOMBRE: 'Estrategia', NOTA: '6' },
        { NOMBRE: 'Trabajo en equipo', NOTA: '8' },
    ];

    const staticNotas = [
        { CARACTERISTICA: 'Velocidad', NOTA: '8' },
        { CARACTERISTICA: 'Resistencia', NOTA: '7' },
        { CARACTERISTICA: 'Técnica', NOTA: '9' },
        { CARACTERISTICA: 'Estrategia', NOTA: '6' },
        { CARACTERISTICA: 'Trabajo en equipo', NOTA: '8' },
    ];

    // Maneja el cierre del alert
    const handleAlertClose = () => {
        setAlertVisible(false);
        if (alertCallback) alertCallback();
    };

    // Genera datos para las gráficas
    const radarData = staticCaracteristicas.map(status => ({
        value: parseInt(status.NOTA, 10),
        label: status.NOMBRE,
    }));

    const lineData = staticCaracteristicas.map((status, index) => ({
        value: parseInt(status.NOTA, 10),
        label: `Semana ${index + 1}`,
    }));

    useEffect(() => {
        // Simula un retraso para la carga de datos
        setTimeout(() => {
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
                        <Text style={styles.chartTitle}>Gráfico de Dona</Text>
                        <PieChart
                            data={radarData}
                            labels={radarData.map(item => item.label)}
                            size={windowWidth - 40}
                            containerStyle={styles.chartStyle}
                        />
                    </View>
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Gráfico Lineal</Text>
                        <LineChart
                            data={lineData}
                            width={windowWidth - 40}
                            height={300}
                            containerStyle={styles.chartStyle}
                        />
                    </View>
                </ScrollView>
            )}
            <AlertComponent
                visible={alertVisible}
                type={alertType}
                message={alertMessage}
                onClose={handleAlertClose}
            />
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
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlayerAnalysis;
