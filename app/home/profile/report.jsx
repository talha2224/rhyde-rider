import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import feedbackImg from "../../../assets/images/bookings/feedback.png";

const Report = () => {
  const [message, setMessage] = useState('');

  const handleSubmitReport = () => {
    console.log('Report submitted:', message);
    ToastAndroid.show('Report sent!',ToastAndroid.SHORT);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a problem</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.reportInfo}>
          <Image source={feedbackImg} style={styles.reportImage} />
          <Text style={styles.reportQuestion}>What would you like us to help you with?</Text>
          <Text style={styles.reportHelperText}>
            Help us improve your experience by letting us know the reason for cancelling this ryde.
          </Text>
        </View>

        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Write a message"
            placeholderTextColor="#AAA"
            multiline
            numberOfLines={6}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <TouchableOpacity style={styles.sendReportButton} onPress={handleSubmitReport}>
          <Text style={styles.sendReportButtonText}>Send report</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617', // Dark background
    paddingTop: 70, // Adjust for status bar
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
    marginTop:30
  },
  reportInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  reportImage: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 15,
    resizeMode: 'contain',
  },
  reportQuestion: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 35,
  },
  reportHelperText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageInputContainer: {
    backgroundColor: '#1C1A1B', // Darker background for the input area
    borderRadius: 15,
    marginBottom: 30,
  },
  messageInput: {
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    height: 150, // Fixed height for multiline input
    textAlignVertical: 'top', // Align text to the top for multiline
  },
  sendReportButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  sendReportButtonText: {
    color: '#181617',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Report;
