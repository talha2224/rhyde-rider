import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SavedPlaces = () => {
  const savedPlacesData = [
    { id: '1', icon: 'store', name: 'Fashion Store', address: '45, Jos Avenue 34 Crescent' },
    { id: '2', icon: 'home', name: 'Home', address: '45, Jos Avenue 34 Crescent' },
    { id: '3', icon: 'school', name: 'School', address: '45, Jos Avenue 34 Crescent' },
    { id: '4', icon: 'beach', name: 'Beach', address: '45, Jos Avenue 34 Crescent' },
    { id: '5', icon: 'shopping', name: 'Grocery', address: '45, Jos Avenue 34 Crescent' },
  ];

  const getPlaceIcon = (iconName) => {
    switch (iconName) {
      case 'store':
        return <FontAwesome5 name="store" size={24} color="#FFD700" />;
      case 'home':
        return <AntDesign name="home" size={24} color="#FFD700" />;
      case 'school':
        return <MaterialCommunityIcons name="school" size={24} color="#FFD700" />;
      case 'beach':
        return <MaterialCommunityIcons name="beach" size={24} color="#FFD700" />;
      case 'shopping':
        return <MaterialCommunityIcons name="shopping" size={24} color="#FFD700" />;
      default:
        return <MaterialCommunityIcons name="map-marker-outline" size={24} color="#FFD700" />;
    }
  };

  const handleDeletePlace = (id) => {
    alert(`Deleting place ${id}`); // Replace with proper UI feedback
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved places</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {savedPlacesData.map((place) => (
          <View key={place.id} style={styles.placeItem}>
            <View style={styles.placeInfo}>
              <View style={styles.iconContainer}>
                {getPlaceIcon(place.icon)}
              </View>
              <View>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDeletePlace(place.id)} style={styles.deleteButton}>
              <AntDesign name="closecircle" size={20} color="#AAA" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addPlaceButton}
          onPress={() => router.push('/home/addaddress')} // Navigate to AddAddress screen
        >
          <Text style={styles.addPlaceButtonText}>Add place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B', // Dark background
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
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add padding to avoid overlap with footer button
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A2A2A', // Slightly lighter dark background for items
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  placeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow info to take available space
  },
  iconContainer: {
    marginRight: 15,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  placeAddress: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  deleteButton: {
    padding: 5,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1C1A1B', // Match container background
    borderTopWidth: 1,
    borderTopColor: '#333', // Subtle separator
  },
  addPlaceButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addPlaceButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SavedPlaces;
