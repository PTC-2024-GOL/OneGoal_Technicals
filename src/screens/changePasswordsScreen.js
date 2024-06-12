import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

 
const RecoverPasswordScreen = ({ logueado, setLogueado }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const handleRecoverPassword = () => {
    setMessage('¡Revisa tu bandeja de entrada!');
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
      <Image source={require('../../assets/recuperacion.png')} style={styles.image} />
      <Text style={styles.label}>Ingresa tu correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
        <Text style={styles.buttonText}>Recuperar contraseña</Text>
      </TouchableOpacity>
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