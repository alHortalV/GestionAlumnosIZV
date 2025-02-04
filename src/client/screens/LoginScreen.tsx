import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { loginStyles as styles } from '../styles/loginStyles';
import { ApiService } from '../services/apiService';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await ApiService.login(username, password);
          if (response.user) {
            console.log("Inicio de sesión exitoso:", response.user);
          return (
           navigation.navigate("Home")
          );
          } else {
            console.log("Error:", response.message);
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Error de inicio de sesión</Text>
                </View>
            );
          }
        } catch (error) {
          console.error("Error al iniciar sesión", error);
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};



export default LoginScreen;