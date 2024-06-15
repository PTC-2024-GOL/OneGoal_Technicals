import {View, StyleSheet, Image, ScrollView, Dimensions} from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const InfoPlayers = () => {
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Edit.png')}/>
                    <Text style={styles.bold}>Nombre:</Text>
                    <Text>José Daniel López Alfaro</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Soccer Ball.png')}/>
                    <Text style={styles.bold}>Alias:</Text>
                    <Text>Chepe López</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require('../../../assets/iconPlayersScreen/Schedule.png')}/>
                    <Text style={styles.bold}>Fecha de nacimiento:</Text>
                    <Text>25 de diciembre de 2005</Text>
                </View>

                {/*Primeras cartas*/}
                <View style={styles.rowCard}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.center}  variant="bodySmall">Posición</Text>
                            <Text style={styles.center}  variant="bodySmall">principal</Text>
                            <Text style={styles.centerName} variant="titleMedium">Delantero</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.center}  variant="bodySmall">Posición</Text>
                            <Text style={styles.center}  variant="bodySmall">secundaria</Text>
                            <Text style={styles.centerName} variant="titleMedium">Defensa</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.center}  variant="bodySmall">Dorsal</Text>
                            <Text style={styles.centerName} variant="headlineMedium">10</Text>
                        </Card.Content>
                    </Card>
                </View>

                <Text style={styles.bold}>Activo desde</Text>
                <View style={styles.row}>
                    <View style={styles.status}></View>
                    <Text>18 de mayo de 2019</Text>
                </View>

                {/*Titulo de estado fisico*/}
                <View style={styles.rowTwo}>
                    <Image style={styles.iconTwo} source={require('../../../assets/iconPlayersScreen/Dumbbell.png')}></Image>
                    <Text variant="titleMedium" style={styles.bold}>Estado físico</Text>
                </View>

                {/*Segundas cartas*/}
                <Card style={styles.healthCard}>
                    <View style={styles.rowHealthCard}>
                        <View style={styles.col}>
                            <Text style={styles.bold}>Altura</Text>
                            <Text>1.60 mts</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.bold}>Peso</Text>
                            <Text>120 lbs</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.bold}>Masa corporal</Text>
                            <Text>18.5</Text>
                            <Text style={styles.color} variant='bodySmall'>Saludable</Text>
                        </View>
                    </View>
                </Card>
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
        paddingVertical: 20,
        marginBottom: windowHeight * 0.15
    },
    icon: {
        width: 15,
        height: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 4
    },
    rowCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 20,
        marginTop: 15
    },
    rowTwo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginVertical: 15
    },
    bold: {
        fontWeight: "bold"
    },
    card: {
        height: 100,
        backgroundColor: 'white'
    },
    center: {
        textAlign: "center",
    },
    centerName: {
        marginTop: 10,
        textAlign: "center"
    },
    status: {
        backgroundColor: '#5AE107',
        width: 10,
        height: 10,
        borderRadius: 100.2
    },
    iconTwo: {
        width: 30,
        height: 30
    },
    //Segundas cartas
    healthCard:{
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    col: {
        flexDirection: "column",
        alignItems: "center"
    },
    rowHealthCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 15
    },
    color: {
        color: 'green'
    }
})
export default InfoPlayers;