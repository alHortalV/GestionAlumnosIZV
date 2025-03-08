import React from 'react';
import { SafeAreaView, ActivityIndicator, Text} from 'react-native';
import ClassroomGrid from '../components/ClassroomGrid';
import { NavigationProp } from '@react-navigation/native';
import { FlatList} from 'react-native';
import { Seat, Student } from '../../client/types/types';
import { useClassroomData } from '../hooks/useClassroomData';

interface SelectedSeatScreenProps {
    navigation: NavigationProp<any>;
}

interface Data {
    seats: Seat[];
    students: Student[];
}

function SelectedSeatScreen({ navigation }: SelectedSeatScreenProps) {
    const { students, seats, loading, error, handleSeatPress } = useClassroomData();

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }
    const numberSeats = 30;
    const data: Data[] = [];

    for (let i = 0; i < seats.length; i += numberSeats) {
        const rowSeats = seats.slice(i, i + numberSeats);
        const rowStudents = students.filter((student: { _id: any; }) => rowSeats.some((seat: { _id: any; }) => seat._id === student._id));
        data.push({ seats: rowSeats, students: rowStudents });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={(item) => (
                    <ClassroomGrid
                        seats={item.item.seats}
                        students={item.item.students}
                        onSeatPress={(seatNumber) => handleSeatPress(seatNumber, navigation)}
                    />
                )}
            />
        </SafeAreaView>
    );
}

export default SelectedSeatScreen;