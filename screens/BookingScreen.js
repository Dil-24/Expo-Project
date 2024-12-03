import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg'; // Import QRCode library

export default function BookingScreen({ route, navigation }) {
  const { userDetails } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [parkingSlots, setParkingSlots] = useState([
    { id: 1, status: 'empty' },
    { id: 2, status: 'occupied' },
    { id: 3, status: 'empty' },
    { id: 4, status: 'empty' },
    { id: 5, status: 'empty' },
    { id: 6, status: 'occupied' },
    { id: 7, status: 'empty' },
    { id: 8, status: 'occupied' },
  ]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // Track booking status
  const [qrCodeData, setQrCodeData] = useState(null); // Data for QR code

  const locations = [
    'COLOMBO SCIENCE FACULTY',
    'COLOMBO ART FACULTY',
    'RATHNAPURA',
  ];

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    setSelectedSlot(null);
  };

  const handleSlotPress = (slotId) => {
    const slot = parkingSlots.find((slot) => slot.id === slotId);
    if (slot.status === 'empty') {
      setParkingSlots((prevSlots) =>
        prevSlots.map((s) =>
          s.id === slotId ? { ...s, status: 'sold' } : s
        )
      );
      setSelectedSlot(slotId);
    }
  };

  const handleBookingSubmit = () => {
    if (!phoneNumber || !paymentMethod || !selectedLocation || !selectedSlot) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    const bookingData = {
      fullName: userDetails?.full_name || '',
      vehicleId: userDetails?.vehicle_id || '',
      nic: userDetails?.nic || '',
      phoneNumber,
      paymentMethod,
      location: selectedLocation,
      slot: selectedSlot,
    };

    fetch('http://vehicle-app.kesug.com/OnlineParking/booking.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Alert.alert('Booking Confirmed', data.message);
          setBookingConfirmed(true);
          setQrCodeData(bookingData); // Set data for QR code

          setParkingSlots((prevSlots) =>
            prevSlots.map((s) =>
              s.id === selectedSlot ? { ...s, status: 'occupied' } : s
            )
          );

          // Navigate to QRCodeScreen
          navigation.navigate('QRCodeScreen', { qrCodeData: bookingData });

          // Reset form
          setSelectedLocation(null);
          setSelectedSlot(null);
          setPhoneNumber('');
          setPaymentMethod('');
        } else {
          Alert.alert('Booking Failed', data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'There was an issue with the booking process.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Parking Slot Booking</Text>
      </View>

      {userDetails && userDetails.full_name && (
        <View style={styles.section}>
          <Text style={styles.sectionText}>Welcome, {userDetails.full_name}!</Text>
        </View>
      )}

      {!selectedLocation ? (
        <View style={styles.gridContainer}>
          {locations.map((location) => (
            <Pressable
              key={location}
              style={styles.location}
              onPress={() => handleLocationPress(location)}
            >
              <Text style={styles.locationText}>{location}</Text>
            </Pressable>
          ))}
        </View>
      ) : selectedSlot ? (
        <View style={styles.formContainer}>
          <Text style={styles.sectionText}>Booking for Slot {selectedSlot} at {selectedLocation}</Text>
          <TextInput style={styles.input} value={userDetails?.full_name || ''} editable={false} placeholder="Full Name" />
          <TextInput style={styles.input} value={userDetails?.vehicle_id || ''} editable={false} placeholder="Vehicle ID" />
          <TextInput style={styles.input} value={userDetails?.nic || ''} editable={false} placeholder="NIC" />
          <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" keyboardType="phone-pad" />

          <Picker
            selectedValue={paymentMethod}
            style={styles.picker}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
          >
            <Picker.Item label="Select Payment Method" value="" />
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Card" value="Card" />
            <Picker.Item label="Online" value="Online" />
          </Picker>

          <Pressable
            style={[styles.submitButton, !selectedSlot || !paymentMethod || !phoneNumber ? styles.disabledButton : null]}
            onPress={handleBookingSubmit}
            disabled={!selectedSlot || !paymentMethod || !phoneNumber}
          >
            <Text style={styles.submitButtonText}>Submit Booking</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.sectionText}>Selected Location: {selectedLocation}</Text>
          <View style={styles.slotGridContainer}>
            {parkingSlots.map((slot) => (
              <Pressable
                key={slot.id}
                style={[styles.slot, selectedSlot === slot.id
                  ? styles.selectedSlot
                  : slot.status === 'sold'
                    ? styles.soldSlot
                    : slot.status === 'occupied'
                    ? styles.occupiedSlot
                    : styles.availableSlot,
                ]}
                onPress={() => handleSlotPress(slot.id)}
                disabled={slot.status !== 'empty'}
              >
                <Text style={styles.slotText}>
                  {slot.status === 'sold' ? 'Sold' : `Slot ${slot.id}`}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#00796b',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  location: {
    backgroundColor: '#0288d1',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  submitButton: {
    backgroundColor: '#0288d1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slotGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  slot: {
    width: '30%',
    height: 60,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  availableSlot: {
    backgroundColor: '#81c784',
  },
  occupiedSlot: {
    backgroundColor: '#e57373',
  },
  soldSlot: {
    backgroundColor: '#ffb74d',
  },
  selectedSlot: {
    backgroundColor: '#0288d1',
  },
  slotText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

