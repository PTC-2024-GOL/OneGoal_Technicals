import {View, Text, StyleSheet} from "react-native";
import React from 'react';
import LottieView from 'lottie-react-native';
import {LinearGradient} from "expo-linear-gradient";

//En esta pantalla se encuentra la animacion que se muestra al principio de la aplicacion, cuando
//esta iniciando.
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
    }
});

export default LoadingScreen;