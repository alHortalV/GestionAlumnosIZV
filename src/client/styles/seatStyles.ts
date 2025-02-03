import { StyleSheet } from 'react-native';

export const seatStyles = StyleSheet.create({
  seat: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  occupied: {
    backgroundColor: '#90EE90',
  },
  wrongSeat: {
    backgroundColor: '#FFB6C1',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
});
