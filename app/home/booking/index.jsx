import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Map from '../../../components/Map';
import config from '../../../config';
import { paymentMethods } from '../../../constants/constant';

const { height } = Dimensions.get('window');

const SelectRhyde = () => {
  const params = useLocalSearchParams();
  const [location, setLocation] = useState(null);
  const [rideLocation, setRideLocation] = useState(null);
  const [availableDriver, setAvailableDriver] = useState([]);
  const [rideTime] = useState('Now');
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);


  const CustomModal = ({ visible, onClose, children, title }) => (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalBackButton}>
              <AntDesign name="arrowleft" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
            <View></View>
          </View>
          <ScrollView style={styles.modalScrollView}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  useEffect(() => {
    if (params?.currentLocation && params?.destination) {
      try {
        const userLocation = JSON.parse(params.currentLocation);
        const receivedDestination = JSON.parse(params.destination);
        setRideLocation(receivedDestination);
        setLocation(userLocation);
      } catch (error) {
        console.error('Failed to parse route parameters:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        const res = await axios.get(`${config.baseUrl}/driver/online/list`);
        if (res?.data?.data) {
          setAvailableDriver(res.data.data);
        }
      } catch (error) {
        console.log('Failed to fetch user:', error?.response?.data || error.message);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Location Inputs */}
        <View style={styles.locationInputSection}>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="target" size={20} color="#FFD700" />
            <TextInput
              style={styles.textInput}
              value={rideLocation?.dropOfAddress}
              placeholderTextColor="#AAA"
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
            <TextInput
              style={styles.textInput}
              value={rideLocation?.pickupAddress}
              placeholderTextColor="#AAA"
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            <TouchableOpacity style={styles.nowButton}>
              <Text style={styles.nowButtonText}>{rideTime}</Text>
              <AntDesign name="caretdown" size={10} color="#FFD700" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem} onPress={() => setShowPaymentMethodModal(true)}>
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="#FFD700" />
            <Text style={styles.optionText}>
              Payment method {selectedPaymentMethod ? `(${selectedPaymentMethod?.id==4 ? "Gift Cards ":selectedPaymentMethod?.id==2 ?"Paypal":selectedPaymentMethod.name})` : ''}
            </Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity onPress={() => { router.push({ pathname: '/home/booking/rhydes', params: {paymentMethod:selectedPaymentMethod?.name,userLocation:JSON.stringify({currentLocation:location,dropOffLocation:rideLocation}),availableDriver: JSON.stringify(availableDriver)},});}} 
        style={styles.findRydeButton}>
          <Text style={styles.findRydeButtonText}>Find Your Ryde</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { router.push("/home") }} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Map Section */}
        {!location ? (
          <View style={[styles.mapContainer, { justifyContent: 'center', alignItems: 'center', backgroundColor: "#000" }]}>
            <Text style={{ color: '#fff', fontSize: 16, }}>Map loading...</Text>
          </View>
        ) : (
          <Map mapContainer={styles.mapContainer} location={location} />
        )}

      </ScrollView>

      {/* Payment Method Modal */}
      <CustomModal
        visible={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        title="Payment method"
      >
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.modalOptionItem}
            onPress={() => {
              setSelectedPaymentMethod(method);
              setShowPaymentMethodModal(false);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Entypo name="wallet" size={24} color="white" />
              <Text style={styles.modalOptionText}>{method?.id==4?"Gift Cards":selectedPaymentMethod?.id==2 ?"Paypal" : method.name}</Text>
            </View>
            {selectedPaymentMethod && selectedPaymentMethod?.id === method?.id && (
              <AntDesign name="checkcircle" size={20} color="#FFD700" />
            )}
          </TouchableOpacity>
        ))}
      </CustomModal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B',
    paddingTop: 50,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  locationInputSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  textInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
    opacity: 0.6
  },
  nowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  nowButtonText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionsSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 15,
  },
  findRydeButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 15,
    marginHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  findRydeButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#AAA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  mapOverlay: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 10,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end', // Align modal to the bottom
  },
  modalContent: {
    backgroundColor: '#1C1A1B',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8, // Max height for modal
    paddingBottom: 20, // Padding for scrollable content
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalBackButton: {
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    textAlign: "center"
  },
  modalScrollView: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalOptionText: {
    color: '#FFF',
    fontSize: 16,
  },

  // Ryder Specific Styles
  modalRyderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  ryderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  modalRyderName: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  addRyderButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  addRyderButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Schedule Ryde Specific Styles (Promotions Modal)
  scheduleRydeNote: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  scheduleOptionsContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    marginBottom: 20,
  },
  scheduleOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedScheduleOption: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)', // Light gold background for selected
  },
  scheduleDateText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleTimeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scheduleTimeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  scheduleTimePeriod: {
    color: '#AAA',
    fontSize: 12,
  },
  scheduleCheckIcon: {
    marginLeft: 10,
  },
  modalConfirmButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  modalConfirmButtonText: {
    color: '#1C1A1B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectRhyde;
