import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

const Coupon = () => {
  const [promoCode, setPromoCode] = useState('');

  const availableCoupons = [
    { id: '1', discount: '5% off Next ryde', validity: 'Valid through 31/12/2025', code: 'RYDE5OFF' },
    { id: '2', discount: '10% off Next ryde', validity: 'Valid through 31/12/2025', code: 'RYDE10OFF' },
    { id: '3', discount: '15% Off next ryde', validity: 'Valid through 31/12/2025', code: 'RYDE15OFF' },
  ];

  const handleApplyCoupon = () => {
    ToastAndroid.show("Coupon applied",ToastAndroid.SHORT)
    router.back()
  };

  const copyCodeToClipboard = (code) => {
    alert(`Code copied: ${code}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coupon code</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Enter Coupon Code Section */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Enter coupon code</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Promo code"
              placeholderTextColor="#AAA"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Coupons Section */}
        <View style={styles.availableCouponsSection}>
          <Text style={styles.sectionTitle}>Available coupons</Text>
          {availableCoupons.map((coupon) => (
            <View key={coupon.id} style={styles.couponItem}>
              <View style={styles.couponDetails}>
                <Text style={styles.couponDiscount}>{coupon.discount}</Text>
                <Text style={styles.couponValidity}>{coupon.validity}</Text>
              </View>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyCodeToClipboard(coupon.code)}
              >
                <Text style={styles.copyButtonText}>Copy code</Text>
              </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius:8, // Match input container's border radius
  },
  applyButtonText: {
    color: '#1C1A1B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  availableCouponsSection: {
    // No specific styles needed here, just holds coupon items
  },
  couponItem: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  couponDetails: {
    flex: 1,
    marginRight: 10,
  },
  couponDiscount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  couponValidity: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
  },
  copyButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  copyButtonText: {
    color: '#1C1A1B',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Coupon;
