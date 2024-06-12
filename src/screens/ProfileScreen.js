import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = ({ logueado, setLogueado }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#03045E', '#647AA3']} style={styles.header}>
        <Avatar.Image size={100} source={{ uri: 'https://via.placeholder.com/150' }} />
        <Text style={styles.name}>José Martínez</Text>
        <Text style={styles.title}>Técnico</Text>
      </LinearGradient>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Mi perfil</Text>
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
        </Card.Content>
      </Card>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40,
    width: '100%'
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
  button: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  profileCard: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F2F7FF',
    paddingTop: 40,
    paddingBottom: 40
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
  }
});

export default ProfileScreen;