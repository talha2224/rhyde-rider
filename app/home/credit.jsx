import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Credit = () => {
  const [amount, setAmount] = useState(''); // This state will hold the selected preset amount

  const handlePresetAmount = (preset) => {
    setAmount(String(preset));
  };

  const previousPurchasesData = [
    { id: '1', amount: '$2,000', date: '3 June, 2025', time: '8:04 PM', extra: '+$6,000 Extra' },
    { id: '2', amount: '$2,000', date: '3 June, 2025', time: '8:04 PM', extra: '+$6,000 Extra' },
    { id: '3', amount: '$2,000', date: '3 June, 2025', time: '8:04 PM', extra: '+$6,000 Extra' },
    { id: '4', amount: '$2,000', date: '3 June, 2025', time: '8:04 PM', extra: '+$6,000 Extra' },
  ];

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
        {/* Your Balance Section */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <AntDesign name="eyeo" size={18} color="#FFF" />
          </View>
          <Text style={styles.currentBalanceAmount}>$2,000.13</Text>
        </View>

        {/* Promotion Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Get an Extra 50%</Text>
            <Text style={styles.promoDescription}>
              Purchase $1,000 or more in Ryde credits {'\n'}and receive an extra 50% free
            </Text>
          </View>
          <MaterialCommunityIcons name="wallet-outline" size={40} color="#FFF" />
        </View>

        {/* Amount Input Display (for selected preset) */}
        <View style={styles.amountInputDisplayContainer}>
          <Text style={styles.amountInputDisplayText}>${amount || '0.00'}</Text>
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

        {/* Purchase Credit Button */}
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>Purchase credit</Text>
        </TouchableOpacity>

        {/* Previous Purchases Section */}
        <View style={styles.previousPurchasesSection}>
          <Text style={styles.previousPurchasesTitle}>Previous purchases</Text>
          {previousPurchasesData.map((item) => (
            <View key={item.id} style={styles.purchaseItem}>
              <View style={styles.purchaseDetails}>
                <Text style={styles.purchaseAmount}>{item.amount}</Text>
                <Text style={styles.purchaseDate}>{item.date} {item.time}</Text>
              </View>
              <Text style={styles.purchaseExtra}>{item.extra}</Text>
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
    alignItems: 'center',
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
