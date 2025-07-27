import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import config from '../../config';

const Credit = () => {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const uid = await AsyncStorage.getItem("userId");
      setUserId(uid);
      fetchWallet(uid);
      fetchTransactions(uid);
    };
    init();
  }, []);

  const fetchWallet = async (uid) => {
    try {
      const res = await axios.get(`${config.baseUrl}/wallet/history/rider/${uid}`);
      setWallet(res.data?.data[0]);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    }
  };

  const fetchTransactions = async (uid) => {
    try {
      const res = await axios.get(`${config.baseUrl}/transaction?role=rider&userId=${uid}`);
      setTransactions(res.data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const handlePresetAmount = (preset) => {
    setAmount(String(preset));
  };

  const handleTopUp = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      ToastAndroid.show("Select a valid amount", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      const cents = Math.floor(parseFloat(amount) * 100);
      const res = await axios.post(`${config.baseUrl}/payment/create`, {
        amount: cents,
        id: userId
      });

      const clientSecret = res.data?.clientSecret;
      const init = await stripe.initPaymentSheet({merchantDisplayName:"rider",paymentIntentClientSecret: clientSecret });
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
      fetchWallet(userId);
      fetchTransactions(userId);
      setAmount('');

    } catch (err) {
      console.error("Top-up error:", err);
      ToastAndroid.show(err.message || "Payment failed", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your credit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Balance */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <AntDesign name="eyeo" size={18} color="#FFF" />
          </View>
          <Text style={styles.currentBalanceAmount}>${wallet?.amount?.toFixed(2) || '0.00'}</Text>
        </View>

        {/* Promo */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Get an Extra 50%</Text>
            <Text style={styles.promoDescription}>
              Purchase $1,000 or more in Ryde credits {'\n'}and receive an extra 50% free
            </Text>
          </View>
          <MaterialCommunityIcons name="wallet-outline" size={40} color="#FFF" />
        </View>

        {/* Selected Amount */}
        <View style={styles.amountInputDisplayContainer}>
          <Text style={styles.amountInputDisplayText}>${amount || '0.00'}</Text>
        </View>

        {/* Presets */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetButtonsContainer}>
          {[10, 20, 100, 500, 1000].map(preset => (
            <TouchableOpacity key={preset} style={styles.presetButton} onPress={() => handlePresetAmount(preset)}>
              <Text style={styles.presetButtonText}>${preset}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Purchase Button */}
        <TouchableOpacity style={styles.purchaseButton} onPress={handleTopUp} disabled={loading}>
          <Text style={styles.purchaseButtonText}>{loading ? 'Processing...' : 'Purchase credit'}</Text>
        </TouchableOpacity>

        {/* Transaction History */}
        <View style={styles.previousPurchasesSection}>
          <Text style={styles.previousPurchasesTitle}>Transaction History</Text>
          {transactions.map((item, index) => (
            <View key={index} style={styles.purchaseItem}>
              <View style={styles.purchaseDetails}>
                <Text style={styles.purchaseAmount}>${item.amount.toFixed(2)}</Text>
                <Text style={styles.purchaseDate}>{new Date(item.createdAt).toLocaleString()}</Text>
              </View>
              <Text style={styles.purchaseExtra}>{item?.message?.split("-")[0]}</Text>
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
    backgroundColor: '#1C1A1B',
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
    paddingBottom: 20,
  },
  balanceSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#AAA',
  },
  currentBalanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  promoBanner: {
    backgroundColor: '#6A0DAD', // Purple background
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promoTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  promoDescription: {
    fontSize: 12,
    color: '#EEE',
  },
  amountInputDisplayContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountInputDisplayText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  presetButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  presetButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  presetButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  purchaseButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  purchaseButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  previousPurchasesSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
  },
  previousPurchasesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  purchaseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"flex-start",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  purchaseDetails: {
    flex: 1,
  },
  purchaseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  purchaseDate: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  purchaseExtra: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default Credit;
