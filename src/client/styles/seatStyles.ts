import { StyleSheet } from 'react-native';

export const seatStyles = StyleSheet.create({
  seat: {
    width: 80,
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  seatImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
    textAlign: 'center'
  },
});
