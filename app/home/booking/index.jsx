import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import mapImg from '../../../assets/images/home/map.png';
import { paymentMethods, ryderOptions } from '../../../constants/constant';

const { width, height } = Dimensions.get('window');

const SelectLocation = () => {

  const [pickupLocation, setPickupLocation] = useState('4517 Washington Ave. Manchester...');
  const [destinationLocation, setDestinationLocation] = useState('2118 Thornridge Cir. Syracuse...');
  const [rideTime] = useState('Now');
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);
  const [showRyderModal, setShowRyderModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [selectedRyder, setSelectedRyder] = useState(null);


  const generateRideScheduleOptions = () => {
    const options = [];
    const now = new Date();
    // Rydes can only be booked 48 hrs in advance.
    // So, start from 48 hours from now.
    now.setHours(now.getHours() + 48);

    for (let i = 0; i < 7; i++) { // Generate options for the next 7 days
      const date = new Date(now);
      date.setDate(now.getDate() + i);

      const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const day = dayNames[date.getDay()];
      const month = monthNames[date.getMonth()];
      const dayOfMonth = date.getDate();

      // Example times (can be adjusted for more granularity)
      const times = [
        { hour: 12, minute: 0, period: 'PM' },
        { hour: 12, minute: 1, period: 'PM' },
        { hour: 12, minute: 2, period: 'PM' },
        { hour: 12, minute: 58, period: 'PM' }, // Example from image
        { hour: 12, minute: 59, period: 'AM' }, // Example from image
      ];

      times.forEach((t, index) => {
        options.push({
          id: `${date.toDateString()}-${t.hour}-${t.minute}-${t.period}`,
          date: `${day} ${dayOfMonth} ${month}`,
          time: `${t.hour} ${t.minute < 10 ? '0' + t.minute : t.minute} ${t.period}`,
          dateTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), (t.period === 'PM' && t.hour !== 12) ? t.hour + 12 : t.hour, t.minute)
        });
      });
    }
    // Sort options by dateTime to ensure chronological order
    options.sort((a, b) => a.dateTime - b.dateTime);
    return options;
  };

  const rideScheduleOptions = generateRideScheduleOptions();


  // Generic Modal Component
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Location Inputs */}
        <View style={styles.locationInputSection}>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="target" size={20} color="#FFD700" />
            <TextInput
              style={styles.textInput}
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholderTextColor="#AAA"
            />
          </View>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
            <TextInput
              style={styles.textInput}
              value={destinationLocation}
              onChangeText={setDestinationLocation}
              placeholderTextColor="#AAA"
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
              Payment method {selectedPaymentMethod ? `(${selectedPaymentMethod.name})` : ''}
            </Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => setShowPromotionsModal(true)}>
            <MaterialCommunityIcons name="brightness-percent" size={24} color="#FFD700" />
            <Text style={styles.optionText}>
              Promotions {selectedPromotion ? `(${selectedPromotion.date.split(' ')[0]} ${selectedPromotion.time})` : ''}
            </Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => setShowRyderModal(true)}>
            <FontAwesome name="user-o" size={24} color="#FFD700" />
            <Text style={styles.optionText}>
              Select ryder {selectedRyder ? `(${selectedRyder.name})` : ''}
            </Text>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity onPress={()=>{router.push("/home/booking/rhydes")}} style={styles.findRydeButton}>
          <Text style={styles.findRydeButtonText}>Find ryde</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{router.push("/home")}} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <Image source={mapImg} style={styles.mapImage} resizeMode="cover" />
          <View style={styles.mapOverlay}>
            <MaterialCommunityIcons name="map-marker" size={30} color="#FFD700" />
          </View>
          <TouchableOpacity style={styles.bookmarkButton}>
            <FontAwesome name="bookmark-o" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
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
              <Text style={styles.modalOptionText}>{method.name}</Text>
            </View>
            {selectedPaymentMethod && selectedPaymentMethod.id === method.id && (
              <AntDesign name="checkcircle" size={20} color="#FFD700" />
            )}
          </TouchableOpacity>
        ))}
      </CustomModal>

      {/* Promotions/Schedule Ryde Modal */}
      <CustomModal visible={showPromotionsModal} onClose={() => setShowPromotionsModal(false)} title="Schedule ryde">
        <Text style={styles.scheduleRydeNote}>Rydes can only be booked 48 hrs in advance</Text>
        <View style={styles.scheduleOptionsContainer}>
          {rideScheduleOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.scheduleOptionItem,
                selectedPromotion && selectedPromotion.id === option.id && styles.selectedScheduleOption,
              ]}
              onPress={() => setSelectedPromotion(option)}
            >
              <Text style={styles.scheduleDateText}>{option.date}</Text>
              <View style={styles.scheduleTimeContainer}>
                <Text style={styles.scheduleTimeText}>{option.time.split(' ')[0]}</Text>
                <Text style={styles.scheduleTimePeriod}>{option.time.split(' ')[1]}</Text>
              </View>
              {selectedPromotion && selectedPromotion.id === option.id && (
                <AntDesign name="checkcircle" size={20} color="#FFD700" style={styles.scheduleCheckIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.modalConfirmButton}
          onPress={() => setShowPromotionsModal(false)}
        >
          <Text style={styles.modalConfirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </CustomModal>


      {/* Choose Ryder Modal */}
      <CustomModal visible={showRyderModal} onClose={() => setShowRyderModal(false)}title="Choose ryder">
        {ryderOptions.map((ryder) => (
          <TouchableOpacity
            key={ryder.id}
            style={styles.modalRyderItem}
            onPress={() => {
              setSelectedRyder(ryder);
              setShowRyderModal(false);
            }}
          >
            <Image source={{ uri: ryder.avatar }} style={styles.ryderAvatar} />
            <Text style={styles.modalRyderName}>{ryder.name}</Text>
            {selectedRyder && selectedRyder.id === ryder.id && (
              <AntDesign name="checkcircle" size={20} color="#FFD700" />
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addRyderButton}>
          <Text style={styles.addRyderButtonText}>Add ryder</Text>
        </TouchableOpacity>
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
    justifyContent:"space-between",
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
    flex:1,
    textAlign:"center"
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

export default SelectLocation;
