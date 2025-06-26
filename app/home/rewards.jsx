import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavbar from '../../components/BottomNavbar'; // Assuming this path is correct
const Rewards = () => {
  const referralCode = "SHVJFIIUGFDFDIGOFQ307462";

  const milestonesData = [
    {
      id: '1',
      icon: 'percent',
      title: '10% OFF next ride',
      description: 'Complete your first ryde.',
    },
    {
      id: '2',
      icon: 'cash-usd-outline',
      title: 'Up to $10 free ride',
      description: 'Complete 10 rides.',
    },
    {
      id: '3',
      icon: 'account-group-outline',
      title: 'MLM Earnings',
      description: 'Earn commission from your network',
    },
    {
      id: '4',
      icon: 'bell-ring-outline',
      title: 'Promotion Notifications',
      description: 'Get alerts about discount and offers',
    },
  ];

  const copyReferralCodeToClipboard = (code) => {
    // In a real Expo app, you'd use Clipboard from expo-clipboard
    // import * as Clipboard from 'expo-clipboard';
    // Clipboard.setStringAsync(code);
    console.log(`Copied referral code: ${code}`);
    alert(`Referral code copied: ${code}`); // Using alert for demonstration, replace with proper UI feedback
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Your Referrals Section */}
        <View style={styles.referralsSection}>
          <View>
            <Text style={styles.referralsLabel}>Your referrals</Text>
            <Text style={styles.referralsCount}>2</Text>
          </View>
          <TouchableOpacity style={styles.viewRewardsButton}>
            <Text style={styles.viewRewardsButtonText}>View rewards</Text>
          </TouchableOpacity>
        </View>

        {/* Referral Code Section */}
        <View style={styles.referralCodeSection}>
          <Text style={styles.sectionTitle}>Referral code</Text>
          <Text style={styles.referralCodeDescription}>Share your code and earn bonuses</Text>
          <View style={styles.referralCodeContainer}>
            <TextInput
              style={styles.referralCodeInput}
              value={referralCode}
              editable={false}
              selectTextOnFocus={true}
            />
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyReferralCodeToClipboard(referralCode)}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Milestones Section */}
        <View style={styles.milestonesSection}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          <View style={styles.milestonesGrid}>
            {milestonesData.slice(0, 2).map((milestone) => ( // Only show first two in grid
              <TouchableOpacity key={milestone.id} style={styles.milestoneItemGrid}>
                {
                  milestone.icon == "cash-usd-outline" ? <Entypo name={"ticket"} size={24} color="#FFD700" />
                    : <MaterialCommunityIcons name={milestone.icon} size={24} color="#FFD700" />
                }                <Text style={styles.milestoneTitleGrid}>{milestone.title}</Text>
                <Text style={styles.milestoneDescriptionGrid}>{milestone.description}</Text>
                <TouchableOpacity onPress={() => router.push("/home/milestones")} style={styles.learnMoreContainer}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                  <AntDesign name="arrowright" size={12} color="#FFD700" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
          {milestonesData.slice(2).map((milestone) => ( // Render remaining as list
            <TouchableOpacity key={milestone.id} style={styles.milestoneItem}>

              <MaterialCommunityIcons name={milestone.icon} size={24} color="#FFD700" />
              <TouchableOpacity onPress={() => router.push("/home/mlm")} style={styles.milestoneDetails}>
                <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                <Text style={styles.milestoneDescription}>{milestone.description}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
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
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Space for BottomNavbar
  },
  referralsSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  referralsLabel: {
    fontSize: 16,
    color: '#AAA',
  },
  referralsCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  viewRewardsButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  viewRewardsButtonText: {
    color: '#1C1A1B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  referralCodeSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  referralCodeDescription: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 10,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  referralCodeInput: {
    flex: 1,
    color: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  copyButton: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  copyButtonText: {
    color: '#1C1A1B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  milestonesSection: {
    marginBottom: 20,
  },
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  milestoneItemGrid: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    width: '48%', // Adjust for spacing
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  milestoneTitleGrid: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  milestoneDescriptionGrid: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  learnMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  learnMoreText: {
    color: '#FFD700',
    fontSize: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  milestoneDetails: {
    flex: 1,
    marginLeft: 15,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  milestoneDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
});

export default Rewards;
