import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { registerStyles as styles } from '../styles/registerStyles';
import { ApiService } from '../services/apiService';

const RegisterScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await ApiService.register(username, password);
      if (response.user) {
        Alert.alert(
          "Iniciar Sesión",
          "Registro correcto. Inicia sesión para acceder",
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        Alert.alert(
          "Registro",
          "Registro incorrecto",
          [{ text: "OK", onPress: () => {} }]
        );
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;