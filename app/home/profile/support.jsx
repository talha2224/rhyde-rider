import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import supportImg from "../../../assets/images/support.png"; // Assuming this path is correct

const Support = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null); // State to manage expanded FAQ item

  const faqs = [
    {
      id: '1',
      question: 'How do I book a ryde?',
      answer: "It's important to address common questions and concerns that users may have about the app. Here are some necessary questions to include",
    },
    {
      id: '2',
      question: 'Can I schedule a ryde in advance?',
      answer: "Yes, you can schedule a ryde up to 48 hours in advance using the 'Schedule ryde' option.",
    },
    {
      id: '3',
      question: 'What if my driver cancels the ryde?',
      answer: "If your driver cancels, the app will automatically try to find you another driver. If no driver is found, you will not be charged.",
    },
    {
      id: '4',
      question: 'How do I report an issue with my ryde?',
      answer: "You can report an issue directly from your past rides history or through the 'Report a problem' section in your profile settings.",
    },
    // You can add more FAQs here
  ];

  const toggleFAQ = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.supportInfo}>
          <Image source={supportImg} style={styles.supportImage} />
          <Text style={styles.supportQuestion}>What would you like us to help you with?</Text>
          <Text style={styles.supportHelperText}>
            Help us improve your experience by letting us know the reason for cancelling this ryde.
          </Text>
        </View>

        <View style={styles.faqsContainer}>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity style={styles.faqQuestionContainer} onPress={() => toggleFAQ(faq.id)}>
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <AntDesign
                  name={expandedFAQ === faq.id ? 'minus' : 'plus'}
                  size={20}
                  color="#FFD700"
                />
              </TouchableOpacity>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              )}
            </View>
          ))}
        </View>
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
  supportInfo: {
    alignItems: 'center',
    marginBottom: 30,
    flex:1
  },
  supportImage: {
    width: 60, // Adjust size as needed
    height: 60, // Adjust size as needed
    marginBottom: 15,
    resizeMode: 'contain',
  },
  supportQuestion: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 50,
  },
  supportHelperText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 20,
  },
  faqsContainer: {
    borderRadius: 15,
  },
  faqItem: {
    paddingVertical: 15,
    backgroundColor:"#1C1A1B",
    paddingHorizontal:10,
    marginBottom:10,
    borderRadius:10
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1, // Take up available space
    marginRight: 10,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default Support;
