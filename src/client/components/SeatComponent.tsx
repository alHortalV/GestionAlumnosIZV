import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Modal, 
  View,
  ActivityIndicator 
} from 'react-native';
import { Seat, Student } from '../types/types';


interface SeatComponentProps {
  seat: Seat;
  student?: Student;
  onPress: () => void;
}

export const SeatComponent: React.FC<SeatComponentProps> = ({ seat, student, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);
      if (seat.isOccupied) {
        setModalVisible(true);
      }
      onPress();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.seat,
          seat.isOccupied && styles.occupied,
          student?.assignedSeat !== seat.seatNumber && styles.wrongSeat,
        ]}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.text}>
            {`Asiento ${seat.seatNumber + 1}`}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Información del Estudiante</Text>
            {student && (
              <>
                <Text>Nombre: {student.name}</Text>
                <Text>Asiento asignado: {student.assignedSeat + 1}</Text>
                {student.assignedSeat !== seat.seatNumber && (
                  <Text style={styles.warning}>
                    ¡Este estudiante no está en su asiento asignado!
                  </Text>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  warning: {
    color: 'red',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SeatComponent;