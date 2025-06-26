import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Import router from expo-router
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { rideHistoryData } from '../../constants/constant';

const RideHistory = () => {


  const getIcon = (type) => {
    switch (type) {
      case 'store':
        return <FontAwesome5 name="store" size={20} color="#FFD700" />;
      case 'home':
        return <AntDesign name="home" size={20} color="#FFD700" />;
      case 'school':
        return <MaterialCommunityIcons name="school" size={20} color="#FFD700" />;
      default:
        return <AntDesign name="questioncircleo" size={20} color="#FFD700" />;
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent history</Text>
      </View>

      {/* Ride History List */}
      <ScrollView style={styles.historyList}>
        {rideHistoryData.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyIconText}>
              {getIcon(item.type)}
              <View style={styles.historyDetails}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyAddress}>{item.address}</Text>
              </View>
            </View>
            <Text style={styles.historyPrice}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingBottom: 20,
    paddingTop:15
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  historyList: {
    paddingHorizontal: 20,
    backgroundColor:"#1C1A1B",
    marginTop:30
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  historyIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDetails: {
    marginLeft: 15,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  historyAddress: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
  },
});

export default RideHistory;
