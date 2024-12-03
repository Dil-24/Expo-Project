import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

export default function LoginScreen({ route, navigation }) {
  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [isDetailsConfirmed, setIsDetailsConfirmed] = useState(false);

  useEffect(() => {
    // Pre-fill User ID if passed from another screen
    if (route.params?.userId) {
      setUserId(route.params.userId);
    }
  }, [route.params?.userId]);

  const handleLogin = () => {
    if (userId.trim() === '') {
      Alert.alert('Error', 'Please enter a valid User ID.');
      return;
    }

    const requestData = { user_id: userId };

    fetch('http://vehicle-app.kesug.com/OnlineParking/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserDetails(data.user); // Display user details on success
        } else {
          Alert.alert('Error', data.message); // Show error from backend
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      });
  };

  const handleConfirmDetails = () => {
    setIsDetailsConfirmed(true);
    navigation.navigate('BookingScreen', { userDetails });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image
        source={require('../assets/Online.jpg')} // Update the path to your image
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your User ID"
        value={userId}
        onChangeText={(text) => setUserId(text)}
      />
      <Button title="Login" onPress={handleLogin} />

      {userDetails && !isDetailsConfirmed && (
        <View style={styles.userDetails}>
          <Text style={styles.userDetail}>Full Name: {userDetails.full_name}</Text>
          <Text style={styles.userDetail}>Vehicle ID: {userDetails.vehicle_id}</Text>
          <Text style={styles.userDetail}>NIC: {userDetails.nic}</Text>
          <Button title="Confirm Details" onPress={handleConfirmDetails} />
        </View>
      )}

      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Register here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 360,
    height: 300,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  text: {
    textAlign: 'center',
    marginTop: 15,
  },
  link: {
    color: '#007bff',
  },
  userDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  userDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
});
