import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Online Vehicle Parking App!</Text>
      <Image
        source={require('../assets/Online.jpg')} // Update this path to match your assets folder
        style={styles.image}
      />
      <Button
        title="Go to Login Page"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
