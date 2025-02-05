import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";
import { SafeAreaView, Text, Button, StyleSheet, View, Alert } from "react-native";
import React, { useState } from 'react';
import axios from 'axios';
import { Config } from "../../config/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SeatDetailScreenProps = {
    route: RouteProp<RootStackParamList, "Detalles">;
    navigation: StackNavigationProp<RootStackParamList, "Detalles">;
};

const SeatDetailScreen: React.FC<SeatDetailScreenProps> = ({ route, navigation }) => {
    const { seat, student } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const handleOccupySeat = async () => {
        try {
            setIsLoading(true);
            const currentStudent = await AsyncStorage.getItem('currentStudent');
            const studentData = currentStudent ? JSON.parse(currentStudent) : null;
    
            const createStudentResponse = await axios.post(`${Config.apiURL}/students`, {
                name: studentData.name,
                assignedSeat: seat.seatNumber
            });
    
            if (createStudentResponse.status === 201) {
                const newStudent = createStudentResponse.data;
                await AsyncStorage.setItem('currentStudent', JSON.stringify(newStudent));
    
                const moveResponse = await axios.post(`${Config.apiURL}/authorized-move`, {
                    studentId: newStudent._id,
                    fromSeat: student?.currentSeat,
                    toSeat: seat.seatNumber
                });
    
                if (moveResponse.status === 200) {
                    Alert.alert(
                        "Asiento ocupado",
                        "Has ocupado este asiento exitosamente",
                        [{ text: "OK", onPress: () => navigation.navigate('Asientos') }]
                    );
                }
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "No se pudo ocupar el asiento. Por favor, intenta de nuevo."
            );
            console.error('Error al ocupar asiento:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalles del Asiento {seat.seatNumber + 1}</Text>
            {student ? (
                <View>
                    <Text>Asiento: {student.currentSeat}</Text>
                    <Text>Asignado a: {student.name}</Text>
                </View>
            ) : (
                <View>
                    <Text>Este asiento está vacío.</Text>
                    <Button
                        title={isLoading ? "Procesando..." : "Ocupar asiento"}
                        onPress={handleOccupySeat}
                        disabled={isLoading}
                    />
                </View>
            )}
            <Button title="Volver" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default SeatDetailScreen;