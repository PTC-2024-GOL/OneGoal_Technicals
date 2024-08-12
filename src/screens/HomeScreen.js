import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl
} from "react-native";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { PieChart } from "react-native-gifted-charts";
import Ionicons from "@expo/vector-icons/Ionicons";
import fetchData from "../../api/components";
import RNPickerSelect from "react-native-picker-select";
import imageData from "../../api/images";
import gol from "../../assets/gol.png";
import monaco from "../../assets/image 56.png";
import { useFocusEffect } from "@react-navigation/native";

//Obtiene las dimensiones de la pantalla
const screenWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const HomeScreen = ({ logueado, setLogueado }) => {
  // URL de las API que se utilizarán
  const USER_API = "services/technics/tecnicos.php";
  const MATCHES_API = "services/technics/partidos.php";
  const API_SOCCER = "services/technics/equipos.php";
  //Estados para almacenar los datos
  const [results, setResults] = useState({
    ganados: " ",
    perdidos: " ",
    empatados: " ",
    contra: " ",
    favor: " ",
    diferencia: " ",
  });
  const [images, setImages] = useState({
    equipo: Image.resolveAssetSource(gol).uri,
    rival: Image.resolveAssetSource(monaco).uri,
  });
  const [username, setUsername] = useState("");
  const [selectedTeam, setSelectedTeam] = useState();
  const [playerStatuses, setPlayerStatuses] = useState([]);
  const widthAndHeight = 150;
  const series = [5, 2, 1, 3];
  const sliceColor = ["#4CAF50", "#F44336", "#FFC107", "#00BCD4"];
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const [dataPie, setDataPie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [response, setResponse] = useState(false);
  const [idEquipo, setIdEquipo] = useState(0);
  const [lastMatchData, setLastMatchData] = useState(null);
  const [teamsOptions, setTeamsOptions] = useState([]);
  const [alertMessage2, setAlertMessage2] = useState("");

  //Función para obtener y llenar las opciones de equipos en el Picker
  const fillTeams = async () => {
    const data = await fetchData(API_SOCCER, "readAll");
    if (data.status) {
      setAlertMessage2("Elige un equipo");
      console.log("Equipos :", data.dataset);
      const equipos = data.dataset.map((item) => ({
        label: item.nombre_equipo,
        value: item.id_equipo,
      }));
      setTeamsOptions(equipos);
    } else {
      console.log(data.error);
      setAlertMessage2("No hay opciones disponibles.");
    }
  };

  //Maneja el cambio de equipo seleccionado
  const handleTeamsChange = (value) => {
    console.log("Equipo seleccionado:", value);
    setIdEquipo(value);
  };

  //Efecto para recargar datos cuando cambia el equipo seleccionado
  useEffect(() => {
    if (idEquipo >= 0) {
      rechargeFetch();
    }
  }, [idEquipo]);

  //Función para recargar la gráfica y el readProfile
  const rechargeFetch = async () => {
    await fillGraphicDoughnut();
    await readProfile();
  };

  // Genera un color hexadecimal aleatorio
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //Llena la gráfica con los datos obtenidos de la API
  const fillGraphicDoughnut = async () => {
    try {
      const FORM = new FormData();
      FORM.append("idEquipo", idEquipo);
      const response = await fetchData(MATCHES_API, "trainingAnylsis", FORM);

      if (response.status) {
        let data = response.dataset.map((item) => ({
          value: parseInt(item.promedio, 10), // Asegúrate de que los valores sean enteros
          color: getRandomColor(), // Asigna colores aleatorios
          label: item.caracteristica,
          text: `${item.caracteristica}: ${parseInt(item.promedio, 10)}`,
        }));
        setDataPie(data);
        setResponse(true);
        // RETORNA "CARACTERISTICA Y LA NOTA"
      } else {
        setDataPie([]);
        setResponse(false);
        console.log("La respuesta no contiene datos válidos:", response);
      }
    } catch (error) {
      console.log("Error fetching datos de la gráfica:", error);
      setDataPie([]);
      setResponse(false);
    }
  };

  //Obtiene la información del usuario desde la API
  const getUser = async () => {
    try {
      const data = await fetchData(USER_API, "getUserMobile");
      if (data.status) {
        const [firstName] = data.username.split(" ");
        const [firstSurname] = data.apellido.split(" ");
        setUsername(`${firstName} ${firstSurname}`);
      } else {
        console.log("Error: Nombre de Tecnico indefinido");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Leer el perfil del equipo y establece los resultados obtenidos
  const readProfile = async () => {
    try {
      const FORM = new FormData();
      FORM.append("idEquipo", idEquipo);
      const data = await fetchData(MATCHES_API, "matchesResult", FORM);
      const profileData = data.dataset;
      setResults({
        ganados: profileData.victorias,
        perdidos: profileData.derrotas,
        empatados: profileData.empates,
        contra: profileData.golesEnContra,
        favor: profileData.golesAFavor,
        diferencia: profileData.diferencia,
      });

      console.log(data.dataset);
    } catch (error) {
      console.log(error);
      setResults({
        ganados: " ",
        perdidos: " ",
        empatados: " ",
        contra: " ",
        favor: " ",
        diferencia: " ",
      });
    } finally {
      console.log("Petición hecha");
    }
  };

  //Obtiene los datos del último partido
  const lastMatch = async () => {
    try {
      const data = await fetchData(MATCHES_API, "lastMatch");
      if (data.status) {
        setLastMatchData(data.dataset);
      } else {
        console.log("No se encontraron datos del último partido:", data);
      }
    } catch (error) {
      console.log("Error fetching datos del último partido:", error);
    }
  };

  //Lee y establece las imágenes correspondientes al equipo y al rival del último partido
  const readImageMatch = async () => {
    try {
      const data = await fetchData(MATCHES_API, "lastMatch");
      const profileData = data.dataset;
      const teamImageUrl = profileData.logo_equipo
        ? await imageData("equipos", profileData.logo_equipo)
        : Image.resolveAssetSource(gol).uri;
      const rivalImageUrl = profileData.logo_rival
        ? await imageData("rivales", profileData.logo_rival)
        : Image.resolveAssetSource(gol).uri;

      setImages({
        equipo: teamImageUrl,
        rival: rivalImageUrl,
      });

      console.log(data.dataset);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Petición hecha");
    }
  };

  //Efecto que se ejecuta al montar el componente para inicializar la aplicación
  useEffect(() => {
    const initializeApp = async () => {
      await getUser();
      await fillTeams();
      await fillGraphicDoughnut();
      await readProfile();
      await lastMatch();
      await readImageMatch();
    };
    initializeApp();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const initializeApp = async () => {
        await getUser();
        await fillTeams();
        await fillGraphicDoughnut();
        await readProfile();
        await lastMatch();
        await readImageMatch();
      };
      initializeApp();
    }, [])
  );
  
  //Función de refresco manual
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getUser();
    await fillTeams();
    await fillGraphicDoughnut();
    await readProfile();
    await lastMatch();
    await readImageMatch();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido {username}</Text>
        <Text style={styles.subText}>
          Ponte al día sobre las nuevas actualizaciones
        </Text>
        {/*Muestra los resultados del equipo */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{results.ganados}</Text>
            <Text style={styles.statLabel}>Partidos ganados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{results.perdidos}</Text>
            <Text style={styles.statLabel}>Partidos perdidos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{results.empatados}</Text>
            <Text style={styles.statLabel}>Partidos empatados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{results.contra}</Text>
            <Text style={styles.statLabel}>Goles en contra</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{results.favor}</Text>
            <Text style={styles.statLabel}>Goles a favor</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{results.diferencia}</Text>
            <Text style={styles.statLabel}>Diferencia</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartTextContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.chartTitle}>
            Estadísticas generales del equipo
          </Text>
          <Text style={styles.chartDescription}>
          Revisa el promedio que el equipo tiene en las áreas técnicas, tácticas, físicas y psicológicas en las pruebas de entrenamiento
          </Text>
          {/*Muestra el picker */}
          <RNPickerSelect
            onValueChange={handleTeamsChange}
            items={teamsOptions}
            style={styles.picker}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Seleccione un equipo:",
              value: 0,
            }}
            Icon={() => {
              return <Ionicons name="chevron-up" size={32} color="black" />;
          }}
          />
        </View>
        {/*Muestra la gráfica de dona */}
        {response && Array.isArray(dataPie) && dataPie.length > 0 ? (
          <View style={styles.chartContainer}>
            <PieChart
              data={dataPie}
              donut
              showGradient
              sectionAutoFocus
              showText
              textColor="black"
              radius={130}
              innerRadius={45}
              textSize={10}
              showTextBackground
              textBackgroundRadius={0.1}
            />
          </View>
        ) : (
          <View
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: "#e6ecf1",
                color: "#043998",
                padding: 15,
                borderRadius: 15,
                maxWidth: 150,
              }}
            >
              No se encontraron datos para la gráfica
            </Text>
          </View>
        )}
      </View>
      {/*Muestra el último partido jugado */}
      {lastMatchData ? (
        <View style={styles.matchContainer}>
          <Text style={styles.matchDate}>{lastMatchData.fecha}</Text>
          <Text style={styles.matchCategory}>
            {lastMatchData.localidad_partido}
          </Text>
          <View style={styles.matchResult}>
            <View style={styles.teamContainer}>
              <Image source={{ uri: images.equipo }} style={styles.teamLogo} />
              <View style={styles.ancho}>
                <Text style={styles.teamName}>
                  {lastMatchData.nombre_equipo}
                </Text>
              </View>
            </View>
            <Text style={styles.score}>{lastMatchData.resultado_partido}</Text>
            <View style={styles.teamContainer}>
              <Image source={{ uri: images.rival }} style={styles.teamLogo} />
              <View style={styles.ancho}>
                <Text style={styles.teamName}>
                  {lastMatchData.nombre_rival}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#e6ecf1",
              color: "#043998",
              padding: 15,
              borderRadius: 15,
              maxWidth: 150,
            }}
          >
            No se encontraron datos para el último partido
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: windowWidth * 0.02,
    marginBottom: windowHeight * 0.16,
  },
  header: {
    backgroundColor: "#007bff",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
  },
  welcomeContainer: {
    padding: 20,
    margin: 10,
    elevation: 10,
    borderRadius: 11,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statBox: {
    width: "30%",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  chartTextContainer: {
    padding: 20,
    margin: 10,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 5,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartDescription: {
    textAlign: "justify",
    marginBottom: 20,
    color: "#888",
  },
  picker: {
    inputAndroid: {
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
    },
  },
  matchContainer: {
    padding: 20,
    alignItems: "center",
    margin: 10,
    elevation: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  matchDate: {
    fontSize: 14,
    color: "#888",
  },
  matchCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  matchResult: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamContainer: {
    alignItems: "center",
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginBottom: 5,
    borderRadius: 50,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
  ancho: {
    maxWidth: 100,
  },
  chartContainer: {
    flex: 1,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartStyle: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartWrapper: {
    backgroundColor: "#03045E",
    padding: 20,
    borderRadius: 20,
  },
});

export default HomeScreen;
