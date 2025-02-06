import React from 'react';
import { TouchableOpacity, Text, Image, ActivityIndicator, View } from 'react-native';
import { Seat, Student } from '../../client/types/types';
import { useSeat } from '../hooks/useSeat';
import { seatStyles as styles } from '../styles/seatStyles';

interface SeatComponentProps {
  seat: Seat;
  student?: Student;
  onPress: () => void;
}

export const SeatComponent: React.FC<SeatComponentProps> = ({
  seat,

  onPress,
}) => {
  const { loading, handlePress } = useSeat();

  const seatImage = seat.isOccupied
    ? require('../../assets/images/pupitreOcupado.png')
    : require('../../assets/images/pupitre.png');

  return (
    <TouchableOpacity
      style={[styles.seat]}
      onPress={() => handlePress(onPress)}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <View>
          <Image source={seatImage} style={styles.seatImage} />
          <Text
            style={styles.text}>{`Asiento ${seat.seatNumber + 1}`}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SeatComponent;
