import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { loginStyles as styles } from '../styles/loginStyles';
import { useLogin } from '../hooks/useLogin';
import CustomTextInput from '../components/CustomInputText';


const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { username, setUsername, password, setPassword, handleLogin } = useLogin(navigation);

  return (
    <ImageBackground source={require('../../assets/images/fondoAuth.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenid@</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <CustomTextInput placeholder="Usuario" value={username} onChangeText={setUsername} />
        <CustomTextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            ¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;