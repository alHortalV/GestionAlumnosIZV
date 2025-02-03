import React from 'react';
import { View } from 'react-native';
import SeatComponent from './SeatComponent';
import { Seat, Student } from '../../client/types/types';
import { classroomStyles as styles } from '../styles/classroomStyles';

interface ClassroomGridProps {
  seats: Seat[];
  students: Student[];
  onSeatPress: (seatId: number) => void;
}

export const ClassroomGrid: React.FC<ClassroomGridProps> = ({ seats, students, onSeatPress }) => {
  return (
    <View style={styles.grid}>
      {seats
        .sort((a, b) => a.seatNumber - b.seatNumber)
        .map((seat) => (
          <SeatComponent key={seat._id} seat={seat} student={students.find((s) => s._id === seat.studentId)} onPress={() => onSeatPress(seat.seatNumber)} />
        ))}
    </View>
  );
};

export default ClassroomGrid;
