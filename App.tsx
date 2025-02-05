import './gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/client/screens/LoginScreen";
import RegisterScreen from "./src/client/screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import SelectedSeatScreen from './src/client/screens/SelectSeatScreen';
import SeatDetailScreen from './src/client/screens/SeatDetailScreen';
import { RootStackParamList } from './src/client/types/types';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen 
          name="Asientos" 
          component={SelectedSeatScreen} 
          options={{ headerLeft: () => null, title: "Selecciona un asiento" }} 
        />
        <Stack.Screen 
          name="Detalles" 
          component={SeatDetailScreen} 
          options={{ title: "Detalles del asiento" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;