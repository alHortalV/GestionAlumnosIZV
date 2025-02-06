import { SafeAreaView, ActivityIndicator, Text, StyleSheet, ScrollView } from "react-native";
import ClassroomGrid from "../components/ClassroomGrid";
import { useClassroomData } from "../hooks/useLoadData";
import { NavigationProp } from "@react-navigation/native";

function SelectedSeatScreen({ navigation }: { navigation: NavigationProp<any> }) {
    const { students, seats, loading, error, handleSeatPress } = useClassroomData();

    if (loading) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            {error ? (
                <Text>{error}</Text>
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



export default SelectedSeatScreen;
