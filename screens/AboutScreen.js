import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent} // Center the content vertically
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>About the Vehicle Park App</Text>
      </View>

      <Image
        source={require('../assets/favicon.png')} // Make sure the image is correctly located
        style={styles.image}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mission</Text>
        <Text style={styles.sectionText}>
          Our mission is to make parking easier, faster, and more accessible for everyone. 
          We aim to revolutionize the parking experience through innovation and convenience.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.sectionText}>The app offers a variety of features that enhance the user experience:</Text>
        <Text style={styles.sectionText}>- Spot Reservation</Text>
        <Text style={styles.sectionText}>- Vehicle Tracking</Text>
        <Text style={styles.sectionText}>- Payment Integration</Text>
        <Text style={styles.sectionText}>- Customer Support</Text>
        <Text style={styles.sectionText}>- Notifications</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Future Plans</Text>
        <Text style={styles.sectionText}>
          We plan to continuously improve the app by adding more features, expanding our parking network, 
          and ensuring a seamless experience for all users.
        </Text>
      </View>

      {/* Booking Slot Navigation Link */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('BookingScreen')}>
          <Text style={styles.buttonText}>You can now book a slot!</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
  },
  scrollContent: {
    flexGrow: 1, // Ensure ScrollView fills the screen
    justifyContent: 'space-between', // Distribute content
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005f73',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005f73',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#444',
    marginVertical: 8,
    textAlign: 'left',
  },
  bottomButtonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%', // Make button width consistent
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
