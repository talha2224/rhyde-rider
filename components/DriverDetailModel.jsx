import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
const { height } = Dimensions.get('window');

const DriverDetailModel = ({ visible, onClose, children, title }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                    </View>
                    <ScrollView style={styles.modalScrollView}>
                        {children}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default DriverDetailModel

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#181617',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.8,
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        color: '#FFF',
        marginTop: 15
    },
    modalScrollView: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    driverDetailsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    driverAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    driverName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    driverLocation: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 20,
    },
    driverStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    driverStatItem: {
        alignItems: 'center',
        backgroundColor: "#1C1A1B",
        padding: 10,
        borderRadius: 10
    },
    driverStatValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 5,
    },
    driverStatLabel: {
        fontSize: 12,
        color: '#AAA',
    },
    carDetailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 15,
    },
    carDetailsRow: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    carDetailsLabel: {
        fontSize: 16,
        color: '#AAA',
    },
    carDetailsValue: {
        fontSize: 16,
        color: '#FFF',
        marginTop: 5
    },
    modalAcceptButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    modalAcceptButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
    },
    modalDeclineButton: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    modalDeclineButtonText: {
        color: '#AAA',
        fontSize: 16,
    },
});