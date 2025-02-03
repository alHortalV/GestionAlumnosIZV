import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Student } from '../../client/types/types';
import { studentInfoStyles as styles } from '../styles/studentInfoStyles';
interface StudentInfoModalProps {
    visible: boolean;
    student?: Student;
    seatNumber: number;
    onClose: () => void;
}

const StudentInfoModal: React.FC<StudentInfoModalProps> = ({ visible, student, seatNumber, onClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Información del Estudiante</Text>
                    {student ? (
                        <>
                            <Text>Nombre: {student.name}</Text>
                            <Text>Asiento asignado: {student.assignedSeat + 1}</Text>
                            {student.assignedSeat !== seatNumber && (
                                <Text style={styles.warning}>¡Este estudiante no está en su asiento asignado!</Text>
                            )}
                        </>
                    ) : (
                        <Text>No hay estudiante asignado.</Text>
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


export default StudentInfoModal;