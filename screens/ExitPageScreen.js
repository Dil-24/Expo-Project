import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ExitPage = ({ route, navigation }) => { // Add navigation as a prop
  const { bookingDetails, exitDetails } = route.params || {};
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false); // Track if QR code has been generated

  // Function to calculate time spent between booking and exit
  const calculateTimeSpent = (bookingTime, exitTime) => {
    const bookingDate = new Date(bookingTime);
    const exitDate = new Date(exitTime);
    const timeDifference = exitDate - bookingDate; // Difference in milliseconds

    // Convert time difference to hours and minutes
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)); // Hours
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

    return { hours, minutes };
  };

  // Calculate time spent
  const { hours, minutes } = calculateTimeSpent(
    bookingDetails?.bookingTime,
    exitDetails?.exitTime || bookingDetails?.bookingTime
  );

  // Generate QR Code data
  const qrCodeData = {
    bookingDetails,
    exitDetails,
    timeSpent: `${hours} hour(s) and ${minutes} minute(s)`,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };

  // Handle QR Code Generation
  const handleGenerateQRCode = () => {
    setIsQRCodeGenerated(true); // Set QR code generated flag to true
  };

  // Navigate to CommentRateScreen
  const handleNavigateToComments = () => {
    navigation.navigate('CommentRateScreen', { bookingDetails, exitDetails }); // Pass data to the next screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exit Details</Text>

      {/* Display Booking Details */}
      <Text style={styles.detail}>
        Booking Date: {bookingDetails?.bookingDate || ''}
      </Text>
      <Text style={styles.detail}>
        Booking Time: {bookingDetails?.bookingTime || ''}
      </Text>

      {/* Display Exit Details */}
      <Text style={styles.detail}>
        Exit Date: {exitDetails?.exitDate || ''}
      </Text>
      <Text style={styles.detail}>
        Exit Time: {exitDetails?.exitTime || ''}
      </Text>

      {/* Display Time Spent */}
      {bookingDetails?.bookingTime && exitDetails?.exitTime && (
        <Text style={styles.detail}>
          Time Spent: {`${hours} hour(s) and ${minutes} minute(s)`}
        </Text>
      )}

      {/* Button to Generate QR Code */}
      <Button title="Create Your QR Code" onPress={handleGenerateQRCode} />

      {/* Display QR Code */}
      {isQRCodeGenerated && (
        <View style={styles.qrContainer}>
          <QRCode value={JSON.stringify(qrCodeData)} size={200} />
        </View>
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
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ExitPage;
