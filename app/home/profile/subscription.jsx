import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // assuming router is from expo-router
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import subscriptionIcon from "../../../assets/images/subscriptionIcon.png";
import config from '../../../config'; // Ensure this contains your baseUrl

const Subscription = () => {
  const [selectedTier, setSelectedTier] = useState('Bronze');
  const stripe = useStripe();
  const router = useRouter();

  const subscriptionTiers = {
    Bronze: {
      price: '$19.00',
      duration: 'year',
      pointsRange: '0-999',
      features: [
        'Earn points on all',
        'Access to referral bonuses',
      ],
    },
    Silver: {
      price: '$29.99',
      duration: 'year',
      pointsRange: '1000-4999',
      features: [
        '5% discount on every 5th ryde',
        'Priority support in the app',
      ],
    },
    Gold: {
      price: '$59.99',
      duration: 'month',
      pointsRange: '5000-9999',
      features: [
        '10% off all your rydes',
        'Free luxury rydes match and assign (up to 3)',
        'Double points on holidays',
        '1 free ryde upto $20',
      ],
    },
    Diamond: {
      price: '$99.99',
      duration: 'year',
      pointsRange: '5000-9999',
      features: [
        '15% off all rydes',
        'VIP concierge support',
        '3 free VIP credits monthly (up to $15 per ryde)',
        'Lifetime access to premium event giveaways & exclusive perks',
      ],
    },
  };

  const currentTierData = subscriptionTiers[selectedTier];

  const handleSubscribe = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const price = currentTierData.price.replace("$", "");
      const amountInCents = Math.floor(parseFloat(price) * 100);

      // Create Payment Intent
      const res = await axios.post(`${config.baseUrl}/payment/create`, {
        amount: amountInCents,
        id: userId,
      });

      const clientSecret = res.data?.clientSecret;

      // Initialize Stripe Payment Sheet
      const init = await stripe.initPaymentSheet({
        merchantDisplayName: "Ryde Subscriptions",
        paymentIntentClientSecret: clientSecret,
      });

      if (init.error) throw new Error(init.error.message);

      // Present Payment Sheet
      const result = await stripe.presentPaymentSheet();
      if (result.error) throw new Error(result.error.message);

      ToastAndroid.show(`Subscribed to ${selectedTier} Tier!`, ToastAndroid.SHORT);
      router.back()
    } catch (err) {
      console.error("Subscription error:", err);
      ToastAndroid.show(err.message || "Subscription failed", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.subscriptionHeader}>
          <Image source={subscriptionIcon} style={styles.subscriptionIcon} />
          <Text style={styles.subscriptionTitle}>Unlock More with Your {'\n'}Ryde Subscriptions</Text>
          <Text style={styles.subscriptionDescription}>
            Enjoy exclusive discounts, free rydes, and {'\n'}premium perks
          </Text>
        </View>

        {/* Tier Selector */}
        <View style={styles.tierSelector}>
          {Object.keys(subscriptionTiers).map((tierName) => (
            <TouchableOpacity
              key={tierName}
              style={[
                styles.tierButton,
                selectedTier === tierName && styles.selectedTierButton,
              ]}
              onPress={() => setSelectedTier(tierName)}
            >
              <Text
                style={[
                  styles.tierButtonText,
                  selectedTier === tierName && styles.selectedTierButtonText,
                ]}
              >
                {tierName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Tier Details */}
        {currentTierData && (
          <View style={styles.tierDetailsCard}>
            <Text style={styles.tierPrice}>
              {currentTierData.price} <Text style={styles.tierDuration}>/{currentTierData.duration}</Text>
            </Text>
            <Text style={styles.tierPointsRange}>
              {selectedTier} Tier ({currentTierData.pointsRange} Points)
            </Text>
            <View style={styles.tierFeatures}>
              {currentTierData.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <AntDesign name="checkcircleo" size={18} color="#FFD700" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617', // Dark background
    paddingTop: 70, // Adjust for status bar
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
  subscriptionHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subscriptionIcon: {
    marginBottom: 15,
  },
  subscriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 30,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 20,
  },
  tierSelector: {
    flexDirection: 'row',
    backgroundColor: '#1C1A1B', // Darker background for tier selector
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tierButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectedTierButton: {
    backgroundColor: '#FFD700', // Gold for selected tier
  },
  tierButtonText: {
    color: '#FFF', // Default text color
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedTierButtonText: {
    color: '#181617', // Dark text for selected tier
  },
  tierDetailsCard: {
    backgroundColor: '#1C1A1B', // Darker background for details card
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  tierPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  tierDuration: {
    fontSize: 16,
    color: '#AAA',
    fontWeight: 'normal',
  },
  tierPointsRange: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  tierFeatures: {
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#181617',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Subscription;
