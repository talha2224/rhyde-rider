import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSaveCard = () => {
    console.log('Saving Card:', { cardNumber, cardName, expiryDate, cvv });
    // Implement save card logic (e.g., send to API, add to local state/storage)
    ToastAndroid.show('Card Saved!',ToastAndroid.SHORT); // Replace with proper UI feedback
    router.back(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add payment method</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="Card Number"
            placeholderTextColor="#AAA"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Name on the card"
            placeholderTextColor="#AAA"
            value={cardName}
            onChangeText={setCardName}
          />
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.textInput, styles.halfWidthInput]}
              placeholder="Expiry date"
              placeholderTextColor="#AAA"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              style={[styles.textInput, styles.halfWidthInput]}
              placeholder="CVV"
              placeholderTextColor="#AAA"
              keyboardType="numeric"
              maxLength={4}
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617',
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputSection: {
    borderRadius: 15,
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#1C1A1B', // Darker input background
    borderRadius: 10,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthInput: {
    width: '48%', // Adjust for spacing
    marginBottom: 0, // Override default margin bottom
  },
  saveButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#181617',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCard;
