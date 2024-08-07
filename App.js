// Hooks de React
import { useEffect, useState } from 'react';
// Utilidades de React Navigation
import { NavigationContainer } from '@react-navigation/native';

import LoginNav from './src/navigation/LoginNav';
import BottomTab from './src/navigation/BottomTab';
import fetchData from './api/components';
import LoadingScreen from "./src/screens/LoadingScreen";

//Componente principal
export default function App() {

  // URL de la API para el usuario
  const API = 'services/technics/tecnicos.php';
  // logueado: Variable para indicar si la sesion ya está lista
  // setLogueado: Función para actualizar la variable logueado
  const [logueado, setLogueado] = useState(false)
  const [load, setLoad] = useState();

  // Función que ayuda a verificar si existe previamente una sesión abierta
  const verifyLogged = async () => {
    setLoad(true);
    try {
      const data = await fetchData(API, 'getUser');
      if (data.session) {
        setLogueado(true)
        console.log(data.nombre);

        setTimeout(()=>{
          setLoad(false)
        }, 1500)
      } else {
        setLogueado(false)
        setTimeout(()=>{
          setLoad(false)
        }, 1500)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    verifyLogged();
  }, [])

  //Verifica si load esta en true, de ser asi entonces moestrar la pantalla de carga
  if(load) {
    return <LoadingScreen/>
  }

  // Retorna el contenedor de navegación
  return (
    <NavigationContainer>
      {logueado ?
        // Si la aplicación está lista, muestra el componente BottomTab
        <BottomTab
          logueado={logueado}
          setLogueado={setLogueado} />
        :
        // Si la aplicación no está lista, muestra el componente NavStack
        <LoginNav
          logueado={logueado}
          setLogueado={setLogueado}
        />
      }
    </NavigationContainer>
  );
}
