import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: '#666',
      marginBottom: 32,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    loginButton: {
      height: 50,
      borderRadius: 8,
      backgroundColor: '#00AAE4',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    loginButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
    },
    registerText: {
      textAlign: 'center',
      color: '#666',
    },
    registerLink: {
      color: '#00AAE4',
      fontWeight: '600',
    },
  });
  