import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const ParkingApp = () => {
  const [userId, setUserId] = useState('');
  const [slotId, setSlotId] = useState('');
  const [action, setAction] = useState(''); // 'book' or 'exit'

  const handleAction = () => {
    if (!userId || !slotId || !action) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Backend API request
    fetch('http://vehicle-app.kesug.com/OnlineParking/parking_action.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, slotId, action }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Alert.alert('Success', data.message);
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Something went wrong.');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>User ID:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter User ID"
        keyboardType="numeric"
      />

      <Text>Slot ID:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
        value={slotId}
        onChangeText={setSlotId}
        placeholder="Enter Slot ID"
        keyboardType="numeric"
      />

      <Text>Action:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
        value={action}
        onChangeText={setAction}
        placeholder="Enter 'book' or 'exit'"
      />

      <Button title="Submit" onPress={handleAction} />
    </View>
  );
};

export default ParkingApp;
