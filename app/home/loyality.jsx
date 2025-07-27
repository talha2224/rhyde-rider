import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

const Loyalty = () => {
  const rewardsData = [
    { id: '1', title: '$10,000 Gift card', points: '10,000 pts' },
    { id: '2', title: '$10,000 Gift card', points: '10,000 pts' },
  ];

  const recentActivityData = [
    { id: '1', type: 'Ryde', date: 'Today', time: '8:04 PM', points: '+100 pts' },
    { id: '2', type: 'Ryde', date: 'Yesterday', time: '8:04 PM', points: '+150 pts' },
    { id: '3', type: 'Ryde', date: '3 June, 2025', time: '8:04 PM', points: '+100 pts' },
    { id: '4', type: 'Ryde', date: '3 June, 2025', time: '8:04 PM', points: '+120 pts' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loyalty points</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Your Points Section */}
        <View style={styles.pointsSection}>
          <Text style={styles.pointsLabel}>Your points</Text>
          <View style={styles.currentPointsContainer}>
            <MaterialCommunityIcons name="currency-usd" size={24} color="#FFD700" />
            <Text style={styles.currentPoints}>23,000</Text>
          </View>
        </View>

        {/* Earn Bonus Points Banner */}
        <View style={styles.bonusBanner}>
          <View style={styles.bonusTextContainer}>
            <Text style={styles.bonusTitle}>Earn Bonus points</Text>
            <Text style={styles.bonusDescription}>
              Get double points for rydes between 1 PM - 5 PM on June 3
            </Text>
          </View>
          <MaterialCommunityIcons name="star-outline" size={40} color="#FFD700" />
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>Rewards</Text>
          {rewardsData.map((reward) => (
            <View key={reward.id} style={styles.rewardItem}>
              <View>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardPoints}>{reward.points}</Text>
              </View>
              <TouchableOpacity onPress={()=>{ToastAndroid.show("Redeem sucessfull",ToastAndroid.SHORT);router.back()}} style={styles.redeemButton}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recent Activity Section */}
        <View style={styles.recentActivitySection}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          {recentActivityData.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityDetails}>
                <Text style={styles.activityType}>{activity.type}</Text>
                <Text style={styles.activityDate}>{activity.date} {activity.time}</Text>
              </View>
              <Text style={styles.activityPoints}>{activity.points}</Text>
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
  pointsSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 10,
  },
  currentPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPoints: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 5,
  },
  bonusBanner: {
    backgroundColor: '#6A0DAD', // Purple background
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bonusTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  bonusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  bonusDescription: {
    fontSize: 12,
    color: '#EEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  rewardsSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rewardPoints: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  redeemButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  redeemButtonText: {
    color: '#1C1A1B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentActivitySection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  activityDetails: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  activityDate: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default Loyalty;
