import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import config from '../../config';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const stripe = useStripe();

  const [userId, setUserId] = useState(null);


  const handleKeyPress = (key) => {
    if (key === 'backspace') {
      setAmount(prevAmount => prevAmount.slice(0, -1));
    } else if (key === '.') {
      // Only allow one decimal point
      if (!amount.includes('.')) {
        setAmount(prevAmount => prevAmount + key);
      }
    } else {
      setAmount(prevAmount => prevAmount + key);
    }
  };

  const handlePresetAmount = (preset) => {
    setAmount(String(preset));
  };

  const numericKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace'],
  ];

  const handleTopUp = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      ToastAndroid.show("Select a valid amount", ToastAndroid.SHORT);
      return;
    }
    try {
      const cents = Math.floor(parseFloat(amount) * 100);
      const res = await axios.post(`${config.baseUrl}/payment/create`, {
        amount: cents,
        id: userId
      });

      const clientSecret = res.data?.clientSecret;
      const init = await stripe.initPaymentSheet({ merchantDisplayName: "driver", paymentIntentClientSecret: clientSecret });
      if (init.error) {
        throw new Error(init.error.message);
      }

      const paymentResult = await stripe.presentPaymentSheet();
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      // Success — Record transaction
      await axios.post(`${config.baseUrl}/transaction`, {
        riderId: userId,
        amount: parseFloat(amount),
        type: "topup for rider"
      });

      ToastAndroid.show("Top-up Successful!", ToastAndroid.SHORT);
      setAmount('');

    } catch (err) {
      console.error("Top-up error:", err);
      ToastAndroid.show(err.message || "Payment failed", ToastAndroid.SHORT);
    } finally {
    }
  };

  useEffect(() => {
    const init = async () => {
      const uid = await AsyncStorage.getItem("userId");
      setUserId(uid);
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deposit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Amount Display */}
        <View style={styles.amountDisplayContainer}>
          <Text style={styles.amountDisplayText}>${amount || '0.00'}</Text>
        </View>

        {/* Preset Amount Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetButtonsContainer}>
          <TouchableOpacity style={styles.presetButton} onPress={() => handlePresetAmount(10)}>
            <Text style={styles.presetButtonText}>$10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton} onPress={() => handlePresetAmount(20)}>
            <Text style={styles.presetButtonText}>$20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton} onPress={() => handlePresetAmount(100)}>
            <Text style={styles.presetButtonText}>$100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton} onPress={() => handlePresetAmount(500)}>
            <Text style={styles.presetButtonText}>$500</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.presetButton} onPress={() => handlePresetAmount(1000)}>
            <Text style={styles.presetButtonText}>$1000</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Payment Method */}
        <TouchableOpacity style={styles.paymentMethodContainer}>
          <MaterialCommunityIcons name="credit-card-outline" size={24} color="#FFD700" />
          <Text style={styles.paymentMethodText}>Payment method</Text>
        </TouchableOpacity>

        {/* Top-up Button */}
        <TouchableOpacity style={styles.topUpButton} onPress={handleTopUp}>
          <Text style={styles.topUpButtonText}>Top-up</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Numeric Keyboard */}
      <View style={styles.keyboardContainer}>
        {numericKeys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyboardRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keyboardButton}
                onPress={() => handleKeyPress(key)}
              >
                {key === 'backspace' ? (
                  <MaterialCommunityIcons name="backspace-outline" size={30} color="#FFF" />
                ) : (
                  <Text style={styles.keyboardButtonText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust for status bar
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
    paddingBottom: 20, // Add some padding for the keyboard
  },
  amountDisplayContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountDisplayText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  presetButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  presetButton: {
    backgroundColor: '#1c1a1b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  presetButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1a1b',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  paymentMethodText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  topUpButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  topUpButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyboardContainer: {
    backgroundColor: '#1c1a1b',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  keyboardButton: {
    width: 80, // Adjust button size as needed
    height: 60, // Adjust button size as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  keyboardButtonText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Deposit;
