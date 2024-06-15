import {View,StyleSheet, Dimensions, ScrollView, Image} from "react-native";
import {Card, Text} from "react-native-paper";
import PieChart from "react-native-pie-chart";
import React from "react";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const widthAndHeight = 180;
const series = [8, 5, 10, 10];
const sliceColor = ['#AE99FA', '#FF8DAD', '#4AFDF3', '#354AC8'];


const TrainingPlayer = () => {
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.rowCards}>
                    <View style={styles.col}>
                        <View style={styles.rowContent}>
                            <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/table.png')}/>
                            <Text variant='titleMedium'>Nota global</Text>
                        </View>
                        <Card style={styles.cardCyan}>
                            <Text style={styles.textColor} variant='displayMedium'>9.5</Text>
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
                            <Text style={styles.textColor} variant='displayMedium'>5</Text>
                        </Card>
                    </View>
                </View>

                <Text style={styles.title}>Promedio de las áreas evaluadas</Text>
                <Text style={styles.subtitle}>En la gráfica podrás observar el promedio de notas por cada una de las áreas que se le han evaluado</Text>

                <View style={styles.rowGraphics}>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                    />
                </View>
                <View style={styles.rowContentGraphic}>
                    <View style={styles.rowTextGraphic}>
                        <View style={styles.status1}></View>
                        <Text style={styles.bold}>Físicos:</Text>
                        <Text>50%</Text>
                    </View>
                    <View style={styles.rowTextGraphic}>
                        <View style={styles.status3}></View>
                        <Text style={styles.bold}>Tácticos:</Text>
                        <Text>40%</Text>
                    </View>
                </View>
                <View style={styles.rowContentGraphic}>
                    <View style={styles.rowTextGraphic}>
                        <View style={styles.status2}></View>
                        <Text style={styles.bold}>Técnicos::</Text>
                        <Text>50%</Text>
                    </View>
                    <View style={styles.rowTextGraphic}>
                        <View style={styles.status4}></View>
                        <Text style={styles.bold}>Psicológicos: </Text>
                        <Text>45%</Text>
                    </View>
                </View>
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
        width: 15,
        height: 15
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
        fontSize: 9,
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
    },
    //ESTILO PARA LAS GRAFICAS
    rowGraphics: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 15
    },
    status1: {
        backgroundColor: '#354AC8',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    status2: {
        backgroundColor: '#4AFDF3',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    status3: {
        backgroundColor: '#FF8DAD',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    status4: {
        backgroundColor: '#AE99FA',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    rowTextGraphic: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    rowContentGraphic: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});
export default TrainingPlayer;