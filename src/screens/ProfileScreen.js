import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput, Card, Avatar, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import fetchData from "../../api/components";
import { AntDesign } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';

import foto from '../../assets/chepe.jpg';

const ProfileScreen = ({ logueado, setLogueado }) => {
  // URL de la API para el usuario
  const USER_API = "services/technics/tecnicos.php";

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "José Orlando Martínez Peña",
    email: "chepe@gmail.com",
    dui: "12345678-9",
    phone: "1212-1212",
  });

  const handleEditPress = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleSavePress = () => {
    setIsEditing(false);
  };

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  // Manejo de cierre de sesión
  const handleLogOut = async () => {
    try {
      const data = await fetchData(USER_API, "logOut");
      if (data.status) {
        setLogueado(false);
      } else {
        Alert.alert("Error sesión", data.error);
      }
    } catch (error) {
      console.log("Error: ", error);
      Alert.alert("Error sesión", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#03045E", "#647AA3"]} style={styles.header}>
        <Avatar.Image
          size={100}
          source={foto}
        />
        <Text style={styles.name}>José Martínez</Text>
        <Text style={styles.title}>Técnico</Text>
        <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
          <AntDesign name={isEditing ? "leftcircle" : "edit"} size={30} color="#FFF"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutIcon}>
          <Entypo name="log-out" size={30} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.inputContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nombre:</Text>
              <View style={styles.rowContent}>
                <AntDesign name="user" size={24} />
                <TextInput
                  style={styles.infoText}
                  value={profile.name}
                  editable={isEditing}
                  onChangeText={(text) => handleChange("name", text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Correo:</Text>
              <View style={styles.rowContent}>
                <AntDesign name="mail" size={24} />
                <TextInput
                  style={styles.infoText}
                  value={profile.email}
                  editable={isEditing}
                  onChangeText={(text) => handleChange("email", text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.fila}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>DUI</Text>
                <View style={styles.rowContent}>
                  <AntDesign name="idcard" size={24} />
                  <TextInput
                    style={styles.infoText}
                    value={profile.dui}
                    editable={isEditing}
                    onChangeText={(text) => handleChange("dui", text)}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Teléfono</Text>
                <View style={styles.rowContent}>
                  <AntDesign name="phone" size={24} />
                  <TextInput
                    style={styles.infoText}
                    value={profile.phone}
                    editable={isEditing}
                    onChangeText={(text) => handleChange("phone", text)}
                  />
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.activeSinceRow}>
          <View style={styles.status}></View>
            <Text style={styles.infoText2}>Activo desde</Text>
          </View>
          <Text style={styles.dateText}>30 de septiembre de 2023</Text>
        </Card.Content>
        {isEditing && (
          <Button
            mode="contained"
            onPress={handleSavePress}
            style={styles.saveButton}
          >
            Guardar
          </Button>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: 40,
    width: "100%",
    position: "relative",
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: "white",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  profileCard: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F2F7FF",
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  infoRow: {
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 2,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 0,
    flex: 1,
  },
  infoText2: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    borderWidth: 0,
    flex: 1,
  },
  activeSinceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 5,
    fontSize: 16,
    color: "gray",
  },
  editIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  logoutIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#003366",
    maxWidth: 150,
    left: 200,
  },
  status: {
    backgroundColor: '#558D32',
    width: 10,
    height: 10,
    borderRadius: 100/2
  },
});

export default ProfileScreen;
