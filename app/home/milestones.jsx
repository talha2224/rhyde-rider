import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Milestones = () => {
  const milestoneLevels = [
    {
      level: 1,
      title: 'Complete your first ride',
      description: 'A welcome bonus of 10% off your next ride or a small credit added to their account.',
      status: 'Claimed',
    },
    {
      level: 10,
      title: 'Complete 10 rides.',
      description: 'A free ride credit up to a certain amount (like $10) or priority booking for peak times for a week.',
      status: 'Claimed',
    },
    {
      level: 20,
      title: 'Complete 20 rides.',
      description: 'An exclusive Your Ryde branded item, like a tote bag or a water bottle, or a discount code they can share with a friend.',
      status: 'Unlock',
    },
    {
      level: 30,
      title: 'Complete 30 rides.',
      description: 'A larger ride credit (like $20) or entry into a monthly drawing for a bigger prize, like a gift card or a special experience.',
      status: 'Unlock',
    },
    {
      level: 40,
      title: 'Complete 40 rides.',
      description: 'VIP status for a month',
      status: 'Unlock',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Milestones</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Current Level Progress Card */}
        <View style={styles.currentLevelCard}>
          <Text style={styles.currentLevelTitle}>Level 20 <Text style={styles.currentLevelSubtitle}>(You've completed 10 rides this week)</Text></Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressText}>Complete 14/20 rides</Text>
        </View>

        {/* Milestone Levels */}
        {milestoneLevels.map((milestone) => (
          <View key={milestone.level} style={styles.milestoneSection}>
            <Text style={styles.milestoneSectionTitle}>Level {milestone.level}</Text>
            <View style={styles.milestoneItem}>
              <View style={styles.milestoneDetails}>
                <Text style={styles.milestoneItemTitle}>{milestone.title}</Text>
                <Text style={styles.milestoneItemDescription}>{milestone.description}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.milestoneButton,
                  milestone.status === 'Claimed' ? styles.claimedButton : styles.unlockButton,
                ]}
              >
                <Text
                  style={[
                    styles.milestoneButtonText,
                    milestone.status === 'Claimed' ? styles.claimedButtonText : styles.unlockButtonText,
                  ]}
                >
                  {milestone.status}
                </Text>
              </TouchableOpacity>
            </View>
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
  currentLevelCard: {
    backgroundColor: '#FFD700', // Gold color for the card background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  currentLevelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1A1B',
  },
  currentLevelSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#1C1A1B',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(28, 26, 27, 0.5)', // Semi-transparent dark background
    borderRadius: 5,
    marginTop: 10,
  },
  progressBarFill: {
    width: '70%', // Example progress, adjust as needed
    height: '100%',
    backgroundColor: '#1C1A1B', // Dark fill color
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#1C1A1B',
    marginTop: 5,
  },
  milestoneSection: {
    marginBottom: 20,
  },
  milestoneSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  milestoneItem: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  milestoneDetails: {
    flex: 1,
    marginRight: 10,
  },
  milestoneItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  milestoneItemDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
  },
  milestoneButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  claimedButton: {
    backgroundColor: '#4CAF50', // Green for claimed
  },
  unlockButton: {
    backgroundColor: '#FFD700', // Gold for unlock
  },
  milestoneButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  claimedButtonText: {
    color: '#FFF',
  },
  unlockButtonText: {
    color: '#1C1A1B',
  },
});

export default Milestones;
