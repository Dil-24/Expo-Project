import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = ({ route, navigation }) => {
  const { qrCodeData } = route.params || {};
  const currentDate = new Date();

  // Function to handle the Exit button press
  const handleExit = () => {
    const exitTime = new Date(); // Record the exit time

    // Show confirmation alert
    Alert.alert(
      'Exit Confirmation',
      'Do you want to exit?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            // Pass both booking and exit details to the ExitPage
            navigation.navigate('ExitPageScreen', {
              bookingDetails: {
                bookingDate: currentDate.toLocaleDateString(),
                bookingTime: currentDate.toLocaleTimeString(),
              },
              exitDetails: {
                exitDate: exitTime.toLocaleDateString(),
                exitTime: exitTime.toLocaleTimeString(),
              },
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your QR Code</Text>
      {qrCodeData ? (
        <View style={styles.qrContainer}>
          {/* Display QR Code */}
          <QRCode
            value={JSON.stringify({
              ...qrCodeData,
              date: currentDate.toLocaleDateString(),
              time: currentDate.toLocaleTimeString(),
            })}
            size={200}
          />
          {/* Display Date and Time */}
          <Text style={styles.dateTime}>
            Date: {currentDate.toLocaleDateString()}
          </Text>
          <Text style={styles.dateTime}>
            Time: {currentDate.toLocaleTimeString()}
          </Text>

          {/* Exit Prompt */}
          <TouchableOpacity onPress={handleExit}>
            <Text style={styles.exitPrompt}>Do you want to exit?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.error}>No QR Code Data Available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: 'center',
  },
  dateTime: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  exitPrompt: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default QRCodeScreen;
