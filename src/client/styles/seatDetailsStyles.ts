import {StyleSheet} from 'react-native';

export const seatDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4c6e81',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  studentInfo: {
    marginBottom: 20,
  },
  studentText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
});