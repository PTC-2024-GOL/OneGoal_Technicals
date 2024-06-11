import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Image } from 'react-native';
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import fetchData from '../../api/components';

// Importa la imagen de fondo y el logo
import background from '../../assets/background.png';
import logo from '../../assets/gol_blanco 2.png'; 

// Define un tema personalizado
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'white',
    primary: 'white',
    placeholder: 'white',
    background: 'transparent',
  },
};

const LoginScreen = () => {
  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.overlay}>
          <Image source={logo} style={styles.logo} />
          <TextInput
            label="Usuario"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{ colors: { text: 'white', primary: 'white', placeholder: 'white' } }}
            underlineColor="transparent"
            mode="flat"
            selectionColor="white"
            placeholderTextColor="white"
            inputStyle={{ color: 'white' }}  // Asegura que el texto escrito sea blanco
          />
          <TextInput
            label="Clave"
            style={styles.input}
            secureTextEntry
            theme={{ colors: { text: 'white', primary: 'white', placeholder: 'white' } }}
            underlineColor="transparent"
            mode="flat"
            selectionColor="white"
            placeholderTextColor="white"
            inputStyle={{ color: 'white' }}  // Asegura que el texto escrito sea blanco
          />
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={['#354AC8', '#1A2462']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Desea recuperar contraseña?</Text>
        </View>
      </ImageBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay con transparencia
  },
  logo: {
    width: 150, // Ajusta el tamaño del logo según tus necesidades
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent', // Hace el fondo del input transparente
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
