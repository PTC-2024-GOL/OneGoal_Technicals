import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import PieChart from 'react-native-pie-chart';

import gol from '../../assets/gol.png';
import monaco from '../../assets/image 56.png';

const screenWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ logueado, setLogueado }) => {
  const [selectedTeam, setSelectedTeam] = useState();

  const widthAndHeight = 150;
  const series = [5, 2, 1, 3];
  const sliceColor = ['#4CAF50', '#F44336', '#FFC107', '#00BCD4'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido José Gonzáles</Text>
        <Text style={styles.subText}>Ponte al día sobre las nuevas actualizaciones</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Partidos ganados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Partidos perdidos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Partidos empatados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Goles en contra</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Goles a favor</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Diferencia</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartTextContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
        <View style={styles.textContainer}>
          <Text style={styles.chartTitle}>Estadísticas generales del equipo</Text>
          <Text style={styles.chartDescription}>
            Revisa las estadísticas generales tanto en áreas técnicas, tácticas, técnicas y mentales de los equipos
          </Text>
          <Picker
            selectedValue={selectedTeam}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedTeam(itemValue)}
          >
            <Picker.Item label="Elige un equipo" value="" />
            <Picker.Item label="Equipo 1" value="team1" />
            <Picker.Item label="Equipo 2" value="team2" />
          </Picker>
        </View>
      </View>
      <View style={styles.matchContainer}>
        <Text style={styles.matchDate}>Miércoles 14 de agosto de 2023</Text>
        <Text style={styles.matchCategory}>Categoría 17</Text>
        <View style={styles.matchResult}>
          <View style={styles.teamContainer}>
            <Image
              source={gol}
              style={styles.teamLogo}
            />
            <View style={styles.ancho}>
              <Text style={styles.teamName}>UN GOL PARA EL SALVADOR</Text>
            </View>
          </View>
          <Text style={styles.score}>3 - 1</Text>
          <View style={styles.teamContainer}>
            <Image
              source={monaco}
              style={styles.teamLogo}
            />
            <View style={styles.ancho}>
              <Text style={styles.teamName}>UN GOL PARA EL SALVADOR</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: windowWidth * 0.02, 
    marginBottom: windowHeight * 0.16
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  welcomeContainer: {
    padding: 20,
    margin: 10,
    elevation: 10, 
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '30%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartTextContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    margin: 10,
    elevation: 10, 
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartDescription: {
    textAlign: 'left',
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: 200,
    marginTop: 20,
  },
  matchContainer: {
    padding: 20,
    alignItems: 'center',
    margin: 10,
    elevation: 10, 
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  matchDate: {
    fontSize: 14,
    color: '#888',
  },
  matchCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  matchResult: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamContainer: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginBottom: 5,
    borderRadius: 50,
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
  ancho: {
    maxWidth: 100,
  },
});

export default HomeScreen;
