import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import supportImg from "../../../assets/images/support.png";

const Support = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: '1',
      question: 'What is Your Ryde?',
      answer: 'Your Ryde is a rideshare platform designed to offer safer Rydes, better driver benefits, lower commission rates, and innovative rewards for riders and drivers.',
    },
    {
      id: '2',
      question: 'How is Your Ryde different from Uber or Lyft?',
      answer: 'We offer capped surge pricing (max 2%), a flat 20% commission, driver bonuses, wear & tear rewards, a loyalty points program, and a unique multi-level referral system.',
    },
    {
      id: '3',
      question: 'Where is Your Ryde currently available?',
      answer: 'Your Ryde launches first in Boston, Massachusetts with plans to expand to other cities and international markets.',
    },
    {
      id: '4',
      question: 'Does Your Ryde allow cash payments?',
      answer: 'Not at this time. We accept credit/debit cards, PayPal, and digital wallets for secure transactions.',
    },
    {
      id: '5',
      question: 'How do I book a Ryde?',
      answer: 'Open the Your Ryde app or website, enter your pickup and drop-off location, choose your Ryde type, confirm your driver, and start your trip.',
    },
    {
      id: '6',
      question: 'What Ryde options are available?',
      answer: 'You can choose from Compact SUVs, Full-Size SUVs, Sports Cars, and Luxury Cars.',
    },
    {
      id: '7',
      question: 'How does the 4-digit PIN safety feature work?',
      answer: 'Upon driver arrival, they provide you with a unique PIN. You enter it in your app—if correct, a green light appears signaling it’s safe to enter. If incorrect, a red light warns you not to get in.',
    },
    {
      id: '8',
      question: 'What is the emergency safety button?',
      answer: 'If you feel unsafe, tap the emergency button. It alerts your five pre-selected emergency contacts and sends your location to 911.',
    },
    {
      id: '9',
      question: 'How does the Loyalty Points Program work for riders?',
      answer: 'You earn 15 points per Ryde. Once you reach 250 points, you can cash out for $3 or apply it toward your next Ryde.',
    },
    {
      id: '10',
      question: 'What are Ryde Credits?',
      answer: 'Ryde Credits are prepaid Ryde funds you can buy at a discount—for example, spend $20 to get $25 worth of credits.',
    },
    {
      id: '11',
      question: 'How do I contact Your Ryde for support?',
      answer: 'You can reach us via the in-app support chat, email at support@yourryde.com, or through the Contact Us page on our website.',
    },
    {
      id: '12',
      question: 'What is Your Ryde’s cancellation policy?',
      answer: 'Riders can cancel without fees within the grace period. Subscribers get extra free cancellations based on their subscription.',
    },

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
            How can we help you, do you have a question? 95% of question can be answered in the F.A.Q’s below if you can't find your questions please send us a message and we will do our best to answer them accordingly
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
    flex: 1
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
    backgroundColor: "#1C1A1B",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10
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
