import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, Seat, Student} from '../types/types';
import {
  SafeAreaView,
  Text,
  Button,
  View,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Config} from '../../config/Config';
import {ApiService} from '../services/apiService';
import {seatDetails as styles} from '../styles/seatDetailsStyles';

type SeatDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'Detalles'>;
  navigation: StackNavigationProp<RootStackParamList, 'Detalles'>;
};

const SeatDetailScreen = ({route, navigation}: SeatDetailScreenProps) => {
  const {seat: initialSeat, student: initialStudent} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seat, setSeat] = useState<Seat>(initialSeat);
  const [student, setStudent] = useState<Student | null>(
    initialStudent ?? null,
  );
  const [studentName, setStudentName] = useState<string>('');

  useEffect(() => {
    const loadSeatData = async () => {
      try {
        const students = await ApiService.fetchStudents();

        const studentInSeat = students.find(
          student => student.currentSeat === seat.seatNumber,
        );

        if (studentInSeat) {
          setStudent(studentInSeat);
          setSeat(prev => ({...prev, isOccupied: true}));
        }
      } catch (error) {
        console.error('Error al cargar los datos de los estudiantes:', error);
      }
    };

    loadSeatData();
  }, []);

  const handleOccupySeat = async () => {
    if (!studentName.trim()) {
      Alert.alert('Error', 'Por favor, ingresa un nombre válido.');
      return;
    }

    try {
      setIsLoading(true);

      const createStudentResponse = await axios.post(
        `${Config.apiURL}/students`,
        {
          name: studentName,
          assignedSeat: seat.seatNumber,
        },
      );

      if (createStudentResponse.status === 201) {
        const newStudent = createStudentResponse.data;

        await ApiService.fetchStudents();

        const moveResponse = await axios.post(
          `${Config.apiURL}/authorized-move`,
          {
            studentId: newStudent._id,
            fromSeat: student?.currentSeat,
            toSeat: seat.seatNumber,
          },
        );

        if (moveResponse.status === 200) {
          setStudent(newStudent);
          setSeat(prev => ({...prev, isOccupied: true}));

          Alert.alert(
            'Asiento ocupado',
            `El asiento ha sido ocupado por ${newStudent.name}.`,
            [{text: 'OK', onPress: () => {}}],
          );
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo ocupar el asiento. Intenta de nuevo.');
      console.error('Error al ocupar asiento:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Detalles del Asiento {seat.seatNumber + 1}
      </Text>

      {student ? (
        <View>
          <Text>
            Asiento:{' '}
            {student.currentSeat !== null ? student.currentSeat + 1 : 'N/A'}
          </Text>
          <Text>Asignado a: {student.name}</Text>
        </View>
      ) : (
        <View>
          <Text>Este asiento está vacío.</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del estudiante"
            value={studentName}
            onChangeText={setStudentName}
          />
          <Button
            title={isLoading ? 'Procesando...' : 'Ocupar asiento'}
            onPress={handleOccupySeat}
            disabled={isLoading}
          />
        </View>
      )}

      <Button title="Volver" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default SeatDetailScreen;
