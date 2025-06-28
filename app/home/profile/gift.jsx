import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Gift = () => {
  const [giftCardCode, setGiftCardCode] = useState('');

  const handleSaveGiftCard = () => {
    console.log('Saving Gift Card Code:', giftCardCode);
    // Implement gift card redemption logic here
    alert(`Gift card code entered: ${giftCardCode}`); // Replace with proper UI feedback
    // You might clear the input or navigate back on success
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gift card</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <MaterialCommunityIcons name="gift-outline" size={80} color="#FFD700" style={styles.giftIcon} />
          <Text style={styles.mainTitle}>Redeem Your Gift {'\n'}Card</Text>
          <Text style={styles.description}>
            Enter your gift card code below to enjoy {'\n'}discounted rydes and special offers.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Gift card code"
              placeholderTextColor="#AAA"
              value={giftCardCode}
              onChangeText={setGiftCardCode}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveGiftCard}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617', // Dark background
    paddingTop: 50, // Adjust for status bar
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
    alignItems: 'center', // Center content horizontally
  },
  content: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1C1A1B', // Slightly lighter dark background for content area
    borderRadius: 20,
    padding: 20,
    marginTop: 20, // Add some top margin to content area
  },
  giftIcon: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 30,
  },
  description: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: '#1C1A1B', // Darker input background
    borderRadius: 10,
    width: '100%', // Take full width
    marginBottom: 30,
  },
  textInput: {
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center', // Center text within input
  },
  saveButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Gift;
