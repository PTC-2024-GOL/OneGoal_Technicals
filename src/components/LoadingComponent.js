import {View, Text, StyleSheet} from "react-native";
import React from 'react';
import LottieView from 'lottie-react-native';
import {LinearGradient} from "expo-linear-gradient";

//En este componente se encuentra la animacion de carga (Circulo de carga)
const LoadingComponent = ()=> {

    //Carga la animacion
    return(
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animations/loading.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
            <Text style={styles.text}>Cargando...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 110,
        height: 110,
    },
    text: {
        color: '#19037e',
        marginTop: -15
    }
});

export default LoadingComponent;