import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreens';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen'; // Path to your LoginScreen
import RegisterScreen from './screens/RegisterScreen'; // Path to your RegisterScreen
import BookingScreen from './screens/BookingScreen';
import QRCodeScreen from './screens/QRCodeScreen';    // The new QRCodeScreen
import ExitPageScreen from './screens/ExitPageScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Only Stack.Screen components should go inside Stack.Navigator */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
        <Stack.Screen name="ExitPageScreen" component={ExitPageScreen} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
