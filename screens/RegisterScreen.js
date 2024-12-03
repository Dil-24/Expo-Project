import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNic] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = () => {
    if (fullName && username && email && password && nic && vehicleId && vehicleType && phoneNumber) {
      // Create form data to send to the backend
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('nic', nic);
      formData.append('vehicle_id', vehicleId);
      formData.append('vehicle_type', vehicleType);
      formData.append('phone_number', phoneNumber);

      console.log({formData});
      // Send the form data to the PHP backend
      fetch('http://vehicle-app.kesug.com/OnlineParking/register.php', {
        method: 'POST',
        body: formData,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
        .then((response) => {
          console.log(JSON.stringify(response))
          response.json()
        }) // Parse the response JSON
        .then((data) => {
          if (data.success) {
            Alert.alert('Registration Successful!', `Your User ID: ${data.user_id}`);
            // Navigate to login screen after successful registration
            navigation.navigate('Login');
          } else {
            Alert.alert('Error', data.message || 'Registration failed.');
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
        });
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="NIC"
        value={nic}
        onChangeText={(text) => setNic(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle ID"
        value={vehicleId}
        onChangeText={(text) => setVehicleId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Type"
        value={vehicleType}
        onChangeText={(text) => setVehicleType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.text}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login here
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
});
