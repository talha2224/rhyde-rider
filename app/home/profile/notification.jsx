import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const Notification = () => {
  const [generalNotifications, setGeneralNotifications] = useState(true);
  const [appUpdate, setAppUpdate] = useState(true);
  const [payment, setPayment] = useState(false);
  const [promotionOffers, setPromotionOffers] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingItemTitle}>General notifications</Text>
            <Text style={styles.settingItemDescription}>Receive alert for all activities</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FFD700" }}
            thumbColor={generalNotifications ? "#FFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setGeneralNotifications(previousState => !previousState)}
            value={generalNotifications}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingItemTitle}>App update</Text>
            <Text style={styles.settingItemDescription}>Receive alert on updates</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FFD700" }}
            thumbColor={appUpdate ? "#FFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setAppUpdate(previousState => !previousState)}
            value={appUpdate}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingItemTitle}>Payment</Text>
            <Text style={styles.settingItemDescription}>Receive alert on payment activities</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FFD700" }}
            thumbColor={payment ? "#FFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setPayment(previousState => !previousState)}
            value={payment}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingItemTitle}>Promotion offers</Text>
            <Text style={styles.settingItemDescription}>Receive alert on payment activities</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FFD700" }}
            thumbColor={promotionOffers ? "#FFF" : "#F4F3F4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setPromotionOffers(previousState => !previousState)}
            value={promotionOffers}
          />
        </View>
      </View>
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
  settingsSection: {
    backgroundColor: '#1C1A1B', // Darker background for the section
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  settingItemDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
});

export default Notification;
