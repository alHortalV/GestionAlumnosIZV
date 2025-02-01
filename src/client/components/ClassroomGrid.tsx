import React from 'react';
import { View, StyleSheet } from 'react-native';
import SeatComponent from './SeatComponent';
import { Seat, Student } from '../../client/types/types';

interface ClassroomGridProps {
  seats: Seat[];
  students: Student[];
  onSeatPress: (seatId: number) => void;
}

export const ClassroomGrid: React.FC<ClassroomGridProps> = ({
  seats,
  students,
  onSeatPress,
}) => {
  return (
    <View style={styles.grid}>
      {seats.sort((a, b) => a.seatNumber - b.seatNumber).map((seat) => (
        <SeatComponent
          key={seat._id}
          seat={seat}
          student={students.find(s => s._id === seat.studentId)}
          onPress={() => onSeatPress(seat.seatNumber)}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 10,
    },
  });