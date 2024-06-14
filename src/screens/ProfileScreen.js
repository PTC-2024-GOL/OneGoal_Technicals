import React from 'react';
import {Dimensions, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph, Avatar, PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import fetchData from '../../api/components';

//Toma la altura de la pantalla en la que se este ejecutando
const windowHeight = Dimensions.get('window').height;
const ProfileScreen = ({ logueado, setLogueado }) => {

  // URL de la API para el usuario
  const USER_API = 'services/technics/tecnicos.php';

  // Manejo de cierre de sesión
  const handleLogOut = async () => {
    try {
      const data = await fetchData(USER_API, 'logOut');
      if (data.status) {
        setLogueado(false);
      } else {
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert('Error sesión', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#03045E', '#647AA3']} style={styles.header}>
        <Avatar.Image size={100} source={{ uri: 'https://via.placeholder.com/150' }} />
        <Text style={styles.name}>José Martínez</Text>
        <Text style={styles.title}>Técnico</Text>
      </LinearGradient>

      <ScrollView>
        <View style={styles.row}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Mi perfil</Text>
          </View>
        </View>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={24} />
              <TextInput style={styles.infoText}
                         editable={false}
              >José Orlando Martínez Peña</TextInput>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={24} />
              <TextInput style={styles.infoText}
                         editable={false}>chepe@gmail.com</TextInput>
            </View>
            <View style={styles.fila}>
              <View style={styles.infoRow2}>
                <MaterialIcons name="credit-card" size={24} />
                <Text style={styles.infoText}>12345678-9</Text>
              </View>
              <View style={styles.infoRow2}>
                <MaterialIcons name="phone" size={24} />
                <Text style={styles.infoText}>1212-1212</Text>
              </View>
            </View>
            <Text style={styles.infoText}>Activo desde</Text>
            <View style={styles.activeSinceRow}>
              <MaterialIcons name="check-circle" size={24} color="green" />
              <Text style={styles.dateText}>30 de septiembre de 2023</Text>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.buttonLogOut} onPress={handleLogOut}>
                <Text style={styles.content}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: windowHeight * 0.1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40,
    width: '100%',
    marginBottom: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginVertical: 5,
  },
  content: {
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: 150
  },
  buttonLogOut: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: 150
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  profileCard: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F2F7FF',
    paddingTop: 15,
    paddingBottom: 50,
    flex: 1
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    height: 50,
    padding: 5,
    margin: 2,
    marginBottom: 20,
    elevation: 2,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10.01,
    width: '100%',
  },
  infoRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 20,
    height: 50,
    padding: 5,
    elevation: 2,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10.01,
    width: '50%',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: 'transparent',
    height: 40,
    borderWidth: 1,
    borderColor: '#F2F7FF'
  },
  activeSinceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'gray',
  },
  tecto: {
    width: '1000',
  },
});

export default ProfileScreen;