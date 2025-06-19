import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (selectedPaymentMethod) {
      console.log('Selected Payment Method:', selectedPaymentMethod);
      router.push('/setup/emergency');
    } else {
      console.log('Please select a payment method.');
    }
  };

  const paymentOptions = [
    { id: 'card', name: 'Card', icon: 'credit-card', iconFamily: FontAwesome5 },
    { id: 'paypal', name: 'Paypal', icon: 'paypal', iconFamily: Entypo },
    { id: 'ryde_credits', name: 'Ryde Credits', icon: 'bitcoin', iconFamily: FontAwesome5 }
  ];

  const isNextButtonEnabled = selectedPaymentMethod !== null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* Back Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.contentArea}>
        <Text style={styles.title}>What payment method do you prefer?</Text>
        <Text style={styles.description}>Add your preferred payment method</Text>

        {/* Payment Options List */}
        <View style={styles.optionsList}>
          {paymentOptions.map((option) => (
            
            <TouchableOpacity key={option.id} style={styles.optionButton} onPress={() => setSelectedPaymentMethod(option.id)}>
              <View style={styles.optionContent}>
                {option.iconFamily === FontAwesome5 && (
                  <FontAwesome5 name={option.icon} size={20} color="white" style={styles.optionIcon} />
                )}
                {option.iconFamily === MaterialCommunityIcons && (
                  <MaterialCommunityIcons name={option.icon} size={20} color="white" style={styles.optionIcon} />
                )}
                <Text style={styles.optionText}>{option.name}</Text>
              </View>
              <View style={[styles.radioButton,selectedPaymentMethod === option.id? styles.radioButtonSelected: styles.radioButtonUnselected,]}>
                {selectedPaymentMethod === option.id && (<Ionicons name="checkmark-sharp" size={16} color="#1A1A1A" />)}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleNext} style={[styles.nextButton, !isNextButtonEnabled && styles.nextButtonDisabled]} disabled={!isNextButtonEnabled} >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 25,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 20,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#1C1A1B",
    borderRadius: 50,
  },
  contentArea: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#A19BAE',
    marginBottom: 40,
    lineHeight: 22,
  },
  optionsList: {
    // Styling for the list container if needed
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1A1B',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 15,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 15,
    width: 24, // Fixed width for consistent alignment
    textAlign: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonUnselected: {
    borderColor: '#444', // Grey border for unselected
  },
  radioButtonSelected: {
    borderColor: '#FBB73A', // Yellow border for selected
    backgroundColor: '#FBB73A', // Yellow fill for selected
  },
  nextButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#FBB73A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(251,183,58,0.5)',
  },
  nextButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Payment;