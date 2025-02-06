import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { registerStyles as styles } from '../styles/registerStyles';
import { useRegister } from '../hooks/useRegister';
const RegisterScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const {
    username, setUsername,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleRegister,
  } = useRegister(navigation);

  return (
    <ImageBackground
      source={require('../../assets/images/fondoAuth.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
        <Text style={styles.subtitle}>Crea una cuenta para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? <Text style={styles.loginLink}>Inicia Sesión</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;