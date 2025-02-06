import { useState } from 'react';
import { Alert } from 'react-native';
import { ApiService } from '../services/apiService';

export const useRegister = (navigation : any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await ApiService.register(username, password);
      if (response.user) {
        Alert.alert(
          'Éxito',
          'Registro correcto. Inicia sesión para acceder',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Registro incorrecto', 'Verifica tus datos');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al registrar. Inténtalo de nuevo.');
      console.error('Error al registrar:', error);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
  };
};