import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavbar from '../../components/BottomNavbar';
import config from "../../config";

const Wallet = () => {

  const [walletBalance, setWalletBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      let userId = await AsyncStorage.getItem("userId");
      let wallet = await axios.get(
        `${config.baseUrl}/wallet/history/rider/${userId}`
      );
      let transaction = await axios.get(
        `${config.baseUrl}/transaction?role=rider&userId=${userId}`
      );
      setTransactions(transaction.data);
      setWalletBalance(wallet.data.data[0]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Wallet Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <AntDesign name="eyeo" size={18} color="#FFF" />
          </View>
          <View style={styles.balanceAmountContainer}>
            <Text style={styles.balanceAmount}>${walletBalance?.amount?.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => { router.push("/home/deposit") }} style={styles.depositButton}>
              <MaterialCommunityIcons name="currency-usd" size={20} color="#1C1A1B" />
              <Text style={styles.depositButtonText}>Deposit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Access Buttons */}
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity onPress={() => { router.push("/home/credit") }} style={styles.quickAccessButton}>
            <MaterialCommunityIcons name="license" size={24} color="#FFD700" />
            <Text style={styles.quickAccessText}>Your Credits</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/home/loyality") }} style={styles.quickAccessButton}>
            <MaterialCommunityIcons name="star-box-outline" size={24} color="#FFD700" />
            <Text style={styles.quickAccessText}>Loyalty points</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/home/coupon") }} style={styles.quickAccessButton}>
            <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#FFD700" />
            <Text style={styles.quickAccessText}>Coupon code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/home/coupon") }} style={styles.quickAccessButton}>
            <MaterialCommunityIcons name="book-check-outline" size={24} color="#FFD700" />
            <Text style={styles.quickAccessText}>Subscription</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent transactions</Text>
            {/* <TouchableOpacity onPress={() => { router.push("/home/transactions") }}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity> */}
          </View>
          {transactions.slice(0, 5).map((item) => (
            <View key={item._id} style={styles.transactionItem}>
              <View
                style={[
                  styles.transactionIconContainer,
                  { backgroundColor: "#FFD700" },
                ]}
              >
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={20}
                  color="#FFF"
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{item.message}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(item.createdAt).toLocaleDateString()} •{" "}
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B',
  },
  scrollViewContent: {
    paddingBottom: 80, // Space for BottomNavbar
  },
  header: {
    alignItems: 'center',
    paddingTop: 50, // Adjust for status bar
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  balanceCard: {
    backgroundColor: '#6A0DAD', // Purple gradient-like background
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10
  },
  balanceLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  depositButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  depositButtonText: {
    color: '#1C1A1B',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  quickAccessButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    width: '48%', // Approx half width with spacing
    padding: 15,
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  quickAccessText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  transactionsSection: {
    marginHorizontal: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  seeAllText: {
    color: '#FFD700',
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  transactionDate: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default Wallet;
