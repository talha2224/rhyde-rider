import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import feedbackImg from "../../../assets/images/bookings/feedback.png"; // Assuming this path is correct
import { cancellationReasons } from '../../../constants/constant';

const Feedback = () => {
  const [feedbackReasons, setFeedbackReasons] = useState([]); // State for selected feedback reasons
  const [otherReason, setOtherReason] = useState(''); // State for other reason text input

  const handleReasonToggle = (reasonId) => {
    setFeedbackReasons(prevReasons => {
      if (prevReasons.includes(reasonId)) {
        return prevReasons.filter(id => id !== reasonId);
      } else {
        return [...prevReasons, reasonId];
      }
    });
  };

  const handleSubmitFeedback = () => {
    console.log('Selected Reasons:', feedbackReasons);
    console.log('Other Reason:', otherReason);
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit feedback</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.feedbackInfo}>
          <Image source={feedbackImg} style={styles.feedbackImage} />
          <Text style={styles.feedbackQuestion}>Tell us why you {'\n'}cancelled the ryde</Text>
          <Text style={styles.feedbackHelperText}>Help us improve your experience by {'\n'}letting us know the reason for {'\n'}cancelling this ryde.</Text>
        </View>

        <View style={styles.reasonsContainer}>
          {cancellationReasons.map((reason) => (
            <TouchableOpacity key={reason.id} style={styles.reasonItem} onPress={() => handleReasonToggle(reason.id)}>
              <MaterialCommunityIcons name={feedbackReasons.includes(reason.id) ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={feedbackReasons.includes(reason.id) ? '#FFD700' : '#AAA'}/>
              <Text style={styles.reasonText}>{reason.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.otherReasonContainer}>
          <TextInput
            style={styles.otherReasonInput}
            placeholder="Type here..."
            placeholderTextColor="#AAA"
            multiline
            numberOfLines={4}
            value={otherReason}
            onChangeText={setOtherReason}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B',
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  feedbackInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  feedbackImage: {
    width:120, // Adjust size as needed
    height:120, // Adjust size as needed
    marginBottom: 15,
    resizeMode: 'contain',
  },
  feedbackQuestion: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 30,
  },
  feedbackHelperText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 20,
  },
  reasonsContainer: {
    backgroundColor: '#181617',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#181617',
  },
  reasonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 15,
    flex: 1, // Take up remaining space
  },
  otherReasonContainer: {
    backgroundColor: '#181617',
    borderRadius: 15,
    marginBottom: 30,
  },
  otherReasonInput: {
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top', // Align text to the top for multiline
  },
  submitButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom:50
  },
  submitButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Feedback;
