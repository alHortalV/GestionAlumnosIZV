import { createStackNavigator } from '@react-navigation/stack';
import './gesture-handler';
import LoginScreen from "./src/client/screens/LoginScreen";
import RegisterScreen from "./src/client/screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import SelectedSeatScreen from './src/client/screens/SelectSeatScreen';


const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Home" component={SelectedSeatScreen} options={{ headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;