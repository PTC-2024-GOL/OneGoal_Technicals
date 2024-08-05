import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import fetchData from '../../api/components';
import AlertComponent from '../components/AlertComponent';

 
const RecoverPasswordScreen = ({ logueado, setLogueado }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCallback, setAlertCallback] = useState(null);
  const API = 'services/recuperacion/recuperacion.php';
  
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const handleRecoverPassword = async () => {
    if (email === '') {
        setAlertType(3);
        setAlertMessage(`El campo no puede estar vacio`);
        setAlertCallback(null);
        setAlertVisible(true);
      return;
    }

    const fechaActualUTC = new Date();
    const form = new FormData();
    form.append('correo', email);
    form.append('nivel', 2);
    form.append('fecha', fechaActualUTC.toISOString());

    console.log('Esto contiene el correo: ' + email);
    console.log('Esto contiene la fecha actual en UTC: ' + fechaActualUTC.toISOString());

    try {
      const data = await fetchData(API, 'envioCorreo', form);
      if (data.status) {
        setAlertType(1);
        setAlertMessage(`${data.message}`);
        setAlertCallback(null);
        setAlertVisible(true);
      } else {
        setAlertType(2);
        setAlertMessage(`${data.error}`);
        setAlertCallback(null);
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertType(2);
      setAlertMessage(`Error: ${error}`);
      setAlertCallback(null);
      setAlertVisible(true);
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertCallback) alertCallback();
  };
 
  
  const handleForgotLogin = () => {
    // Navegar a la pantalla de recuperación de contraseña
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleForgotLogin}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/password.png')} style={styles.image} />
      <Text style={styles.label}>Ingresa tu correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
        <Text style={styles.buttonText}>Recuperar contraseña</Text>
      </TouchableOpacity>
      <AlertComponent
        visible={alertVisible}
        type={alertType}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  backText: {
    fontSize: 35,
    color: '#000',
  },
  image: {
    width: 300,
    height: 300, 
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  message: {
    color: 'green',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    padding: 16,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
}); 

export default RecoverPasswordScreen;