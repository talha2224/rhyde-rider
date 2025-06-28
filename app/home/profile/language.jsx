import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English Language');

  const languages = [
    { id: '1', name: 'English Language', emoji: '😀' },
    { id: '2', name: 'French', emoji: '' },
    { id: '3', name: 'German', emoji: '' },
    { id: '4', name: 'Spanish', emoji: '' },
    { id: '5', name: 'Polish', emoji: '' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.languageSection}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.languageItem}
              onPress={() => setSelectedLanguage(lang.name)}
            >
              <Text style={styles.languageText}>{lang.name}</Text>
              {selectedLanguage === lang.name && (
                <MaterialCommunityIcons name="circle-slice-8" size={24} color="#FFD700" />
              )}
            </TouchableOpacity>
          ))}
        </View>
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
  languageSection: {
    backgroundColor: '#1C1A1B', // Darker background for the section
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  languageText: {
    fontSize: 16,
    color: '#FFF',
    flex: 1, // Take up available space
  },
  languageEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default Language;
