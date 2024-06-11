import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Image,Alert } from 'react-native';
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

const LoginScreen = ({ logueado, setLogueado }) => {

  // Estados para los campos de alias y clave
  const [alias, setAlias] = useState('');
  const [clave, setClave] = useState('');


  // URL de la API para el usuario
  const USER_API = 'services/technics/tecnicos.php';


  // Manejo de inicio de sesión
  const handleLogin = async () => {
    // Creación del formulario para la petición
    const formData = new FormData();
    formData.append('correo', alias);
    formData.append('clave', clave);

    try {
      // Realización de la petición de inicio de sesión
      const data = await fetchData(USER_API, 'logIn', formData);
      if (data.status) {
        setLogueado(!logueado);
      } else {
        console.log(data);
        Alert.alert('Error sesion', data.error);
      }
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert('Error sesion',error);
    }
  };


  // Manejo de cierre de sesión
  const handleLogOut = async () => {
    try {
      const data = await fetchData(USER_API, 'logOut');
      if (data.status) {
        setLogueado(false);
      } else {
        Alert.alert('Error sesion', data.error);
      }
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert('Error sesion',error);
    }
  };

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
            textColor='#ffffff'
            inputStyle={{ color: 'white' }}  // Asegura que el texto escrito sea blanco
            value={alias}
            onChangeText={setAlias}
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
            textColor='#ffffff'
            inputStyle={{ color: 'white' }}  // Asegura que el texto escrito sea blanco
            value={clave}
            onChangeText={setClave}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={['#354AC8', '#1A2462']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Desea recuperar contraseña?</Text>
          <TouchableOpacity mode="contained" onPress={handleLogOut} style={styles.button}>
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
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
