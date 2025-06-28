import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react'; // Import useState
import { Dimensions, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'; // Import Modal and Switch

const Setting = () => {
  const [showSecuritySettingsModal, setShowSecuritySettingsModal] = useState(false);
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(true); // State for the toggle

  // Generic Modal Component (re-used for security settings)
  const CustomModal = ({ visible, onClose, children, title }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalBackButton}>
              <AntDesign name="arrowleft" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
            <View></View>{/* Spacer for alignment */}
          </View>
          <ScrollView style={styles.modalScrollView}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setShowSecuritySettingsModal(true)}>
            <View>
              <Text style={styles.menuItemTitle}>Security settings</Text>
              <Text style={styles.menuItemDescription}>Receive alert for all activitios</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/language')}>
            <View>
              <Text style={styles.menuItemTitle}>Language</Text>
              <Text style={styles.menuItemDescription}>Receive alert on updates</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/emergency')}>
            <View>
              <Text style={styles.menuItemTitle}>Emergency contact</Text>
              <Text style={styles.menuItemDescription}>Receive alert on payment activities</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Security Settings Modal */}
      <CustomModal
        visible={showSecuritySettingsModal}
        onClose={() => setShowSecuritySettingsModal(false)}
        title="Security settings"
      >
        <View style={styles.modalSecuritySection}>
          <TouchableOpacity style={styles.modalSecurityItem}>
            <Text style={styles.modalSecurityItemText}>Change password</Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <View style={styles.modalSecurityItem}>
            <Text style={styles.modalSecurityItemText}>Two-Factor Authentication</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FFD700" }}
              thumbColor={twoFactorAuthEnabled ? "#FFF" : "#F4F3F4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setTwoFactorAuthEnabled(previousState => !previousState)}
              value={twoFactorAuthEnabled}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617', // Dark background
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
    paddingBottom: 20,
  },
  menuSection: {
    backgroundColor: '#1C1A1B', // Darker background for the section
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },

  // Modal Styles (copied and adapted from previous uses)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end', // Align modal to the bottom
  },
  modalContent: {
    backgroundColor: '#181617',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.5, // Adjust height for this modal
    paddingBottom: 20, // Padding for scrollable content
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalBackButton: {},
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalScrollView: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // Security Settings Modal Specific Styles
  modalSecuritySection: {
    borderRadius: 15,
  },
  modalSecurityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:10,
  },
  modalSecurityItemText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default Setting;
