import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import { Chip } from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayersScreen = ({}) => {
    //Estilos para los chips
    const [style, setStyle] = useState({ borderColor: `#FBA200`, backgroundColor: `#0078B7`});

    const navigation = useNavigation();

    const goToPlayersDetails = () => {
        navigation.navigate('PlayersDetails');
    }

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Image style={styles.img} source={require('../../assets/gol.png')}/>
                <View style={styles.col}>
                    <Text style={styles.title}>Gol</Text>
                    <Text style={styles.content}>Haz clíc en la tarjeta para obtener más información del jugador. </Text>
                </View>
            </View>
            <View style={styles.row}>
                <Chip mode='outlined' selectedColor='#9A9595' onPress={() => console.log('Pressed')}>Baja temporal</Chip>
                <Chip style={style} selectedColor ='white' onPress={() => console.log('Pressed')}>Activo</Chip>
                <Chip mode='outlined' selectedColor='#9A9595' onPress={() => console.log('Pressed')}>Baja definitiva</Chip>
            </View>
            {/*Codigo para las cards*/}
            <ScrollView>
                <TouchableOpacity onPress={goToPlayersDetails} style={styles.card}>
                    <View style={styles.rowCard}>
                        <View style={styles.dorsal}>
                            <Text style={styles.subtitleDorsal}>Dorsal</Text>
                            <Text style={styles.titleDorsal}>10</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <View style={styles.status}>
                                <Text style={styles.statusText}>Activo</Text>
                            </View>

                            <Text style={styles.subtitleCard}>Defensa</Text>
                            <Text style={styles.titleCard}>José Daniel López Alfaro</Text>
                        </View>
                        <Image style={styles.imgCard}  source={require('../../assets/man.png')}></Image>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToPlayersDetails} style={styles.card}>
                    <View style={styles.rowCard}>
                        <View style={styles.dorsal}>
                            <Text style={styles.subtitleDorsal}>Dorsal</Text>
                            <Text style={styles.titleDorsal}>10</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <View style={styles.status}>
                                <Text style={styles.statusText}>Activo</Text>
                            </View>

                            <Text style={styles.subtitleCard}>Defensa</Text>
                            <Text style={styles.titleCard}>José Daniel López Alfaro</Text>
                        </View>
                        <Image style={styles.imgCard}  source={require('../../assets/man.png')}></Image>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth * 0.05,
        marginVertical: 25,
        marginBottom: windowHeight * 0.15,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 25
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 100/2
    },
    col: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    content: {
        fontWeight: '300',
    },
    //ESTILOS PARA LAS CARDS
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20
    },
    dorsal: {
        backgroundColor: '#f2f7ff',
        padding: 5,
        paddingTop: 20,
        paddingEnd: 10
    },
    rowCard: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    infoCard: {
        padding: 20
    },
    imgCard: {
        marginTop: 25,
        marginRight: 20,
        width: 50,
        height: 50,
        borderRadius: 100/2
    },
    status: {
        borderColor: '#3E8F0C',
        borderWidth: 1,
        width: 70,
        borderRadius: 10,
        marginBottom: 10
    },
    statusText: {
        color: '#3E8F0C',
        textAlign: 'center',
        fontSize: 10
    },
    titleCard: {
        fontWeight: 'bold',
        fontSize: 15
    },
    subtitleCard: {
        fontSize: 12,
        fontWeight: '400'
    },
    titleDorsal: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        color: '#020887',
        marginStart: 15
    },
    subtitleDorsal: {
        fontSize: 12,
        textAlign: 'center',
        marginStart: 15
    }
});
export default PlayersScreen;