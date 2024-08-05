import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView, Image} from "react-native";
import { TextInput, Card, Avatar, Button, Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import fetchData from "../../api/components";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import imageData from "../../api/images";
import foto from "../../assets/chepe.jpg";

const windowHeight = Dimensions.get("window").height;

const ProfileScreen = ({ logueado, setLogueado }) => {
  // URL de la API para el usuario
  const USER_API = "services/technics/tecnicos.php";
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "José Orlando",
    fullname: "Martínez Peña",
    email: "chepe@gmail.com",
    phone: "1212-1212",
    dui: "12345678-9",
    birthday: new Date("2005-09-26"),
    image: Image.resolveAssetSource(foto).uri,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeChip, setActiveChip] = useState("perfil");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSavePress = async () => {
    try {
      const formData = new FormData();
      formData.append("nombrePerfil", profile.name);
      formData.append("apellidoPerfil", profile.fullname);
      formData.append("correoPerfil", profile.email);
      formData.append("duiPerfil", profile.dui);
      if (profile.birthday instanceof Date) {
        formData.append(
          "fechanacimientoPerfil",
          profile.birthday.toISOString().split("T")[0]
        );
      } else {
        Alert.alert("Error", "Fecha de nacimiento no válida");
        return;
      }
      formData.append("telefonoPerfil", profile.phone);
      if (profile.image) {
        const uriParts = profile.image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("imagen", {
          uri: profile.image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetchData(USER_API, "updateRowProfile", formData);

      if (response.status) {
        Alert.alert(response.message);
        setIsEditing(false);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("No se pudo acceder a la API", error.message);
      console.log(error.message);
    }
  };

  const handleChange = (name, value) => {
    if (name === "name" || name === "fullname") {
      if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
        setProfile({ ...profile, [name]: value });
      } else {
        Alert.alert("Error", "Solo se permiten letras y espacios.");
      }
    } else if (name === "dui" || name === "phone") {
      if (/^[\d-]*$/.test(value)) {
        setProfile({ ...profile, [name]: value });
      } else {
        Alert.alert("Error", "Solo se permiten números y guiones.");
      }
    } else if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === "" || emailPattern.test(value)) {
        setProfile({ ...profile, [name]: value });
      } else {
        Alert.alert("Error", "Correo electrónico no válido.");
      }
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };  

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "La confirmación de la contraseña no coincide.");
        return;
      }

      const formData = new FormData();
      formData.append("claveActual", password);
      formData.append("claveCliente", newPassword);
      formData.append("repetirclaveCliente", confirmPassword);

      const response = await fetchData(USER_API, "changePassword", formData);

      if (response.status) {
        Alert.alert("Éxito", response.message);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("No se pudo acceder a la API", error.message);
      console.log(error.message);
    }
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

  const pickImage = async () => {
    if (isEditing) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfile({ ...profile, image: result.assets[0].uri });
      }
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || profile.birthday;
    setShowDatePicker(false);
    handleChange("birthday", currentDate);
  };

  const readProfile = async () => {
    try {
      const data = await fetchData(USER_API, "readProfile");
      const profileData = data.dataset;
      const imageUrl = profileData.IMAGEN
        ? await imageData("tecnicos", profileData.IMAGEN)
        : Image.resolveAssetSource(foto).uri;

      setProfile({
        name: profileData.NOMBRETEC,
        fullname: profileData.APELLIDO,
        email: profileData.CORREO,
        dui: profileData.DUI,
        phone: profileData.TELÉFONO,
        birthday: new Date(profileData.NACIMIENTO),
        image: imageUrl,
      });

      console.log(data.dataset);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Petición hecha");
    }
  };

  useEffect(() => {
    readProfile();
  }, []);

  const changeScreen = (screen) => {
    setActiveChip(screen);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient colors={["#03045E", "#647AA3"]} style={styles.header}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image size={100} source={{ uri: profile.image }} />
          </TouchableOpacity>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          {activeChip !== "password" && (
            <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
              <AntDesign
                name={isEditing ? "leftcircle" : "edit"}
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogOut} style={styles.logoutIcon}>
            <Entypo name="log-out" size={30} color="#FFF" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.rowButton}>
          <Chip
            style={{
              backgroundColor: activeChip === "perfil" ? "#03045E" : "#F2EEEF",
            }}
            onPress={() => changeScreen("perfil")}
            textStyle={{ color: activeChip === "perfil" ? "white" : "#9A9A9A" }}
          >
            Perfil
          </Chip>
          <Chip
            style={{
              backgroundColor:
                activeChip === "password" ? "#03045E" : "#F2EEEF",
            }}
            onPress={() => changeScreen("password")}
            textStyle={{
              color: activeChip === "password" ? "white" : "#9A9A9A",
            }}
          >
            Cambiar Contraseña
          </Chip>
        </View>

        {activeChip === "perfil" ? (
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
                  <Text style={styles.label}>Apellido:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="user" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={profile.fullname}
                      editable={isEditing}
                      onChangeText={(text) => handleChange("fullname", text)}
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
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Fecha de nacimiento:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="calendar" size={24} />
                    <TouchableOpacity
                      onPress={() => isEditing && setShowDatePicker(true)}
                    >
                      <Text style={styles.infoText}>
                        {profile.birthday.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={profile.birthday}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>DUI:</Text>
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
        ) : (
          <Card style={styles.profileCard}>
            <Card.Content>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Contraseña Actual:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="lock-open" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={password}
                      secureTextEntry
                      onChangeText={(text) => setPassword(text)}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Nueva Contraseña:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="lock" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={newPassword}
                      secureTextEntry
                      onChangeText={(text) => setNewPassword(text)}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Confirmar Nueva Contraseña:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="lock" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={confirmPassword}
                      secureTextEntry
                      onChangeText={(text) => setConfirmPassword(text)}
                    />
                  </View>
                </View>
              </View>
            </Card.Content>
            <Button
              mode="contained"
              onPress={handlePasswordChange}
              style={styles.saveButton}
            >
              Guardar
            </Button>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
    marginBottom: windowHeight * 0.15,
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
    backgroundColor: "#334195",
    maxWidth: 150,
    left: 200,
  },
  status: {
    backgroundColor: "#558D32",
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
  },
  email: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
  rowButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingTop: 5,
    width: "80%",
  },
});

export default ProfileScreen;
