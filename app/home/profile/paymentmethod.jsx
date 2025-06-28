import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PaymentMethods = () => {
    const paymentOptions = [
        { id: '1', name: 'Credit card/ Debit card', icon: 'credit-card-outline' },
        { id: '2', name: 'Paypal', icon: 'paypal' },
        { id: '3', name: 'Ryde Credits', icon: 'wallet-outline' },
        { id: '4', name: 'Gift card', icon: 'gift-outline' },
    ];

    const handlePaymentMethodSelect = (method) => {
        if (method.id === '1') {
            router.push('/home/profile/addcard');
        }
        console.log('Selected payment method:', method.name);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment methods</Text>
            </View>

            <ScrollView style={styles.scrollViewContent}>
                <View style={styles.paymentMethodsSection}>
                    {paymentOptions.map((method) => (
                        <TouchableOpacity key={method.id} style={styles.paymentMethodItem}onPress={() => handlePaymentMethodSelect(method)}>
                            {method.name !== "Paypal" ? <MaterialCommunityIcons name={method.icon} size={24} color="#FFD700" /> :<Entypo name="paypal" size={24} color="#FFD700" />}
                            <Text style={styles.paymentMethodText}>{method.name}</Text>
                            <AntDesign name="right" size={16} color="#AAA" />
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
    paymentMethodsSection: {
        backgroundColor: '#1C1A1B', // Darker background for the section
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    paymentMethodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    paymentMethodText: {
        fontSize: 16,
        color: '#FFF',
        marginLeft: 15,
        flex: 1, // Take up available space
    },
});

export default PaymentMethods;
