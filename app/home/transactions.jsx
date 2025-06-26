import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Transactions = () => {
  const transactionsData = [
    {
      id: '1',
      icon: 'car-side',
      iconColor: '#FF6347', // Tomato
      title: 'Ryde Payment – Compact SUV',
      date: '3 June, 2025',
      time: '8:04 PM',
      amount: '$40.79',
    },
    {
      id: '2',
      icon: 'credit-card-outline',
      iconColor: '#4682B4', // SteelBlue
      title: 'Ryde Credits Purchase',
      date: '3 June, 2025',
      time: '8:04 PM',
      amount: '$40.79',
    },
    {
      id: '3',
      icon: 'gift-outline',
      iconColor: '#DAA520', // Goldenrod
      title: 'Referral Bonus – Level 2',
      date: '3 June, 2025',
      time: '8:04 PM',
      amount: '$40.79',
    },
    {
      id: '4',
      icon: 'calendar-check',
      iconColor: '#6A5ACD', // SlateBlue
      title: 'Subscription Renewal',
      date: '3 June, 2025',
      time: '8:04 PM',
      amount: '$40.79',
    },
    {
      id: '5',
      icon: 'hand-coin',
      iconColor: '#3CB371', // MediumSeaGreen
      title: 'MLM Earnings - May Total',
      date: '3 June, 2025',
      time: '8:04 PM',
      amount: '$40.79',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent transactions</Text>
      </View>

      {/* Recent Transactions List */}
      <ScrollView style={styles.transactionsList}>
        {transactionsData.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View style={[styles.transactionIconContainer, { backgroundColor: item.iconColor }]}>
              <MaterialCommunityIcons name={item.icon} size={20} color="#FFF" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date}, {item.time}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B',
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
  transactionsList: {
    paddingHorizontal: 20,
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

export default Transactions;
