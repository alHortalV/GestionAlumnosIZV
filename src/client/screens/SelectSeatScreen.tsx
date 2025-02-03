import { SafeAreaView, ActivityIndicator, Text, StyleSheet, ScrollView } from "react-native";
import ClassroomGrid from "../components/ClassroomGrid";
import { useClassroomData } from "../hooks/useLoadData";

function SelectedSeatScreen(): React.JSX.Element {
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
                        onSeatPress={handleSeatPress}
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