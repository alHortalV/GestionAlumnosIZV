import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import {
    SafeAreaView,
    Text,
    Button,
    View,
    TextInput,
} from 'react-native';
import React from 'react';
import { seatDetailsStyles as styles } from '../styles/seatDetailsStyles';
import { useSeatDetails } from '../hooks/useSeatDetails';

type SeatDetailScreenProps = {
    route: RouteProp<RootStackParamList, 'Detalles'>;
    navigation: StackNavigationProp<RootStackParamList, 'Detalles'>;
};

const SeatDetailScreen = ({ route, navigation }: SeatDetailScreenProps) => {
    const { seat: initialSeat, student: initialStudent } = route.params;
    const {
        isLoading,
        seat,
        student,
        studentName,
        setStudentName,
        handleOccupySeat,
        handleVacateSeat,
    } = useSeatDetails(initialSeat, initialStudent ?? null);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Detalles del Asiento {seat.seatNumber + 1}
            </Text>

            {student ? (
                <View style={styles.studentInfo}>
                    <Text style={styles.studentText}>
                        Asiento: {student.currentSeat !== null ? student.currentSeat + 1 : 'N/A'}
                    </Text>
                    <Text style={styles.studentText}>Asignado a: {student.name}</Text>
                    <View style={styles.button}>
                        <Button
                            title={isLoading ? 'Desocupando...' : 'Desocupar asiento'}
                            onPress={() => handleVacateSeat(student._id)}
                            disabled={isLoading}
                            color="#8B0000"
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={styles.studentText}>Este asiento está vacío.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del estudiante"
                        value={studentName}
                        onChangeText={setStudentName}
                    />
                    <View style={styles.button}>
                        <Button
                            title={isLoading ? 'Procesando...' : 'Ocupar asiento'}
                            onPress={handleOccupySeat}
                            disabled={isLoading}
                            color="#4c6e81"
                        />
                    </View>
                </View>
            )}

            <View>
                <Button
                    title="Volver"
                    onPress={() => navigation.goBack()}
                    color="#4c6e81"
                />
            </View>
        </SafeAreaView>
    );
}
export default SeatDetailScreen;