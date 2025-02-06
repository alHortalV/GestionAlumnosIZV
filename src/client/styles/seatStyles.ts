// seatStyles.ts

import { StyleSheet } from 'react-native';

export const seatStyles = StyleSheet.create({
  seat: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  seatImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 5,
    color: 'black',
  },
});
