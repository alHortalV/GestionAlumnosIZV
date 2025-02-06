import { useState } from "react";
import { Alert } from "react-native";
import { ApiService } from "../services/apiService";

export const useLogin= (navigation : any) => {
    const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
    
      const handleLogin = async () => {
        try {
          const response = await ApiService.login(username, password);
          if (response.user) {
            Alert.alert('Éxito', 'Inicio de sesión exitoso');
            navigation.navigate('Asientos');
          } else {
            Alert.alert('Error', response.message || 'Credenciales incorrectas');
          }
        } catch (error) {
          Alert.alert('Error', 'Error al iniciar sesión. Inténtalo de nuevo.');
          console.error('Error al iniciar sesión:', error);
        }
      };
      return {
        username,
        setUsername,
        password,
        setPassword,
        handleLogin,
      };
}