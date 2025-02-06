import { SafeAreaView, ActivityIndicator, Text, StyleSheet, ScrollView } from "react-native";
import ClassroomGrid from "../components/ClassroomGrid";
import { useClassroomData } from "../hooks/useLoadData";
import { NavigationProp } from "@react-navigation/native";

function SelectedSeatScreen({ navigation }: { navigation: NavigationProp<any> }) {
    const { students, seats, loading, error, handleSeatPress } = useClassroomData();

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <ScrollView>
                    <ClassroomGrid
                        seats={seats}
                        students={students}
                        onSeatPress={(seatNumber) => handleSeatPress(seatNumber, navigation)}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: 20,
    },
});

export default SelectedSeatScreen;
