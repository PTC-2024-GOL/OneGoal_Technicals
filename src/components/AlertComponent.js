import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Animated, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AlertComponent = ({ visible, type, message, onClose, url = null }) => {
  let title, icon, buttonColor;

  switch (type) {
    case 1:
      title = 'Éxito';
      icon = require('../../assets/exito.png');
      buttonColor = '#28a745';
      break;
    case 2:
      title = 'Error';
      icon = require('../../assets/fallo.png');
      buttonColor = '#dc3545';
      break;
    case 3:
      title = 'Advertencia';
      icon = require('../../assets/advertencia.png');
      buttonColor = '#ffc107';
      break;
    case 4:
      title = 'Aviso';
      icon = require('../../assets/aviso.png');
      buttonColor = '#17a2b8';
      break;
    default:
      title = '';
      icon = null;
      buttonColor = '#007bff';
  }

  const handleAccept = () => {
    onClose();
    if (url) {
      // Navegar a la pantalla especificada
      navigation.navigate(url);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <Animated.View style={styles.modalContainer}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={handleAccept} style={[styles.button, { backgroundColor: buttonColor }]}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Más opacidad para el fondo
  },
  modalContainer: {
    width: 320,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10, // Añade sombra para dispositivos Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#555',
    width: windowWidth * 0.8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AlertComponent;
