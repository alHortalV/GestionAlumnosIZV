import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Seat, Student } from '../../client/types/types';
import { useSeat } from '../hooks/useSeat';
import { seatStyles as styles } from '../styles/seatStyles';

interface SeatComponentProps {
  seat: Seat;
  student?: Student;
  onPress: () => void;
}

export const SeatComponent: React.FC<SeatComponentProps> = ({ seat, student, onPress }) => {
  const { modalVisible, setModalVisible, loading, handlePress } = useSeat();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.seat,
          seat.isOccupied && styles.occupied,
          student?.currentSeat !== seat.seatNumber && styles.wrongSeat,
        ]}
        onPress={() => handlePress(seat.isOccupied, onPress)}
        disabled={loading}
      >
        {loading ? <ActivityIndicator size="small" color="#000" /> : <Text style={styles.text}>{`Asiento ${seat.seatNumber + 1}`}</Text>}
      </TouchableOpacity>
    </>
  );
};

export default SeatComponent;
