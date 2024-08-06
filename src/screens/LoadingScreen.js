import {View, Text, StyleSheet} from "react-native";
import React from 'react';
import LottieView from 'lottie-react-native';
import {LinearGradient} from "expo-linear-gradient";

const LoadingScreen = ()=> {

    return(
        <LinearGradient colors={['#090BA0', '#03043A']} style={styles.container}>
            {/*Cargamos la animacion*/}
            <LottieView
                source={require('../../assets/animations/loadScreen.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 230,
        height: 230,
    },
    lottie2: {
        marginTop: -60,
        width: 150,
        height: 150,
    },
    loadingText: {
        backgroundColor: '#f4d86f',
        padding: 10,
        borderRadius: 10,
        marginTop: -30,
        fontSize: 18,
        color: '#482F24',
        fontFamily: 'Jost_500Medium',
    },
});

export default LoadingScreen;