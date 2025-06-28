import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile_photo from "../../../assets/images/profile_photo.png"; // Assuming this path is correct

const Emergency = () => {
  const emergencyContacts = [
    { id: '1', name: 'Maxwell Oscar', phone: '+123431645245', avatar: profile_photo },
    { id: '2', name: 'Maxwell Oscar', phone: '+123431645245', avatar: profile_photo },
    { id: '3', name: 'Maxwell Oscar', phone: '+123431645245', avatar: profile_photo },
  ];

  const handleContactPress = (phoneNumber) => {
    // Implement call functionality
    console.log('Calling:', phoneNumber);
    // Linking.openURL(`tel:${phoneNumber}`); // Uncomment in a real app
  };

  const handleEditContact = (id) => {
    console.log('Edit contact:', id);
    // Implement edit logic (e.g., navigate to edit screen or open modal)
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency contacts</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.contactsSection}>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.contactItem} onPress={() => handleContactPress(contact.phone)}>
              <Image source={contact.avatar} style={styles.contactAvatar} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => handleEditContact(contact.id)}>
                <AntDesign name="edit" size={20} color="#FFD700" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addContactButton}>
          <Text style={styles.addContactButtonText}>Add contact</Text>
        </TouchableOpacity>
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
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add padding for footer button
  },
  contactsSection: {
    backgroundColor: '#1C1A1B', // Darker background for the section
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1, // Take up available space
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contactPhone: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1C1A1B', // Match container background
    borderTopWidth: 1,
    borderTopColor: '#333', // Subtle separator
  },
  addContactButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addContactButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Emergency;
