import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, Modal, Dialog, Paragraph, Portal, PaperProvider } from 'react-native-paper';
import fetchData from '../../api/components';

const ProfileScreen = ({ logueado, setLogueado }) => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button mode="contained" style={styles.button}>
          Cerrar Sesión
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    margin: 20,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
  containerInput: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
  botonAgregar: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    maxHeight: 70,
    marginTop: 10,
  },
  buttonActualizar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  buttonEliminar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  buttonClose: {
    marginStart: 15,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  botonAgregarTexto: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 }, // Para iOS
    shadowOpacity: 0.8, // Para iOS
    shadowRadius: 2, // Para iOS
  },
  cardText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  }, tittle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
