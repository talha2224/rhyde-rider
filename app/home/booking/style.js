import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');

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

export default styles