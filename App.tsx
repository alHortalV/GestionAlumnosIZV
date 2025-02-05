import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/client/screens/LoginScreen';
import RegisterScreen from './src/client/screens/RegisterScreen';
import SeatDetailScreen from './src/client/screens/SeatDetailScreen';
import { ClassroomProvider } from './src/client/contexts/ClassroomContext';
import { RootStackParamList } from './src/client/types/types';
import SelectedSeatScreen from './src/client/screens/SelectSeatScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <ClassroomProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Asientos" component={SelectedSeatScreen}/>
                    <Stack.Screen name="Detalles" component={SeatDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ClassroomProvider>
    );
};

export default App;