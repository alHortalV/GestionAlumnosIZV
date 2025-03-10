import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/client/screens/LoginScreen';
import RegisterScreen from './src/client/screens/RegisterScreen';
import SeatDetailScreen from './src/client/screens/SeatDetailScreen';
import { RootStackParamList } from './src/client/types/types';
import SelectedSeatScreen from './src/client/screens/SelectSeatScreen';
import { Provider } from 'react-redux';
import store from './src/client/contexts/store';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Asientos"
            component={SelectedSeatScreen}
            options={({
              title: 'Selección de Asientos',
              headerStyle: {
                backgroundColor: '#7aacb3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen
            name="Detalles"
            component={SeatDetailScreen}
            options={({
              title: 'Detalles del Asiento',
              headerStyle: {
                backgroundColor: '#7aacb3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;