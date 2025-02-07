import { SafeAreaView, ActivityIndicator, Text, StyleSheet, ScrollView } from "react-native";
import ClassroomGrid from "../components/ClassroomGrid";
import { useClassroomData } from "../hooks/useLoadData";
import { NavigationProp } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

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
                <FlatList
                    data={seats} 
                    keyExtractor={(item) => item.seatNumber.toString()}
                    renderItem={({ item }) => (
                        <ClassroomGrid
                            seats={[item]}
                            students={students}
                            onSeatPress={(seatNumber) => handleSeatPress(seatNumber, navigation)}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
};




export default SelectedSeatScreen;
