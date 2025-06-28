import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import cancelImg from "../../../assets/images/bookings/cancel.png"; // Assuming this path is correct

const Cancelled = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={cancelImg} style={styles.image} />
        <Text style={styles.title}>Ryde Cancelled</Text>
        <Text style={styles.description}>
          Help us improve your experience by {'\n'}letting us know the reason for {'\n'}cancelling this ryde.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/home/booking/feedback')} // Navigate to Feedback screen
        >
          <Text style={styles.buttonText}>Submit feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 30,
    width: '100%', // Take full width within padding
  },
  image: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cancelled;
