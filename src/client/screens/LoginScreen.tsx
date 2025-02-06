import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { loginStyles as styles } from '../styles/loginStyles';
import { useLogin } from '../hooks/useLogin';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const {
    username, setUsername,
    password, setPassword,
    handleLogin
  } = useLogin(navigation);
  return (
    <ImageBackground
      source={require('../../assets/images/fondoAuth.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenid@</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export default LoginScreen;