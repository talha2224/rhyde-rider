import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

const Tip = () => {
    const [tipAmount, setTipAmount] = useState(''); // State for custom tip amount
    const [selectedPresetTip, setSelectedPresetTip] = useState(null); // State for selected preset tip

    const presetTips = ['$2', '$3', '$4', '$5', '$6', '$7', '$10'];

    const handlePresetTipSelect = (amount) => {
        setSelectedPresetTip(amount);
        setTipAmount(amount.replace('$', '')); // Remove '$' for input field
    };

    const handleTipAmountChange = (text) => {
        const cleanedText = text.replace(/[^0-9.]/g, '');
        if (cleanedText.includes('.') && cleanedText.indexOf('.') !== cleanedText.lastIndexOf('.')) {
            setTipAmount(cleanedText.substring(0, cleanedText.indexOf('.') + 1));
        } else {
            setTipAmount(cleanedText);
        }
        setSelectedPresetTip(null); // Deselect any preset when custom typing
    };

    const handlePayTip = () => {
        const finalTip = selectedPresetTip || (tipAmount ? `$${parseFloat(tipAmount).toFixed(2)}` : '$0.00');
        console.log('Paying tip:', finalTip);
        ToastAndroid.show("Tip Paid",ToastAndroid.SHORT)
        router.push("/home")
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tip driver</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <Text style={styles.mainTitle}>Leave a Tip for {'\n'}Your Driver</Text>
                    <Text style={styles.description}>
                        Show appreciation for great service, 100% of your {'\n'}tip goes directly to the driver.
                    </Text>

                    <TextInput
                        style={styles.tipInput}
                        placeholder="Enter amount"
                        placeholderTextColor="#AAA"
                        keyboardType="numeric"
                        value={tipAmount}
                        onChangeText={handleTipAmountChange}
                    />

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presetTipsContainer}>
                        {presetTips.map((amount) => (
                            <TouchableOpacity
                                key={amount}
                                style={[
                                    styles.presetTipButton,
                                    selectedPresetTip === amount && styles.selectedPresetTipButton,
                                ]}
                                onPress={() => handlePresetTipSelect(amount)}
                            >
                                <Text
                                    style={[
                                        styles.presetTipButtonText,
                                        selectedPresetTip === amount && styles.selectedPresetTipButtonText,
                                    ]}
                                >
                                    {amount}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>


            <TouchableOpacity style={styles.payTipButton} onPress={handlePayTip}>
                <Text style={styles.payTipButtonText}>Pay tip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => router.push("/home")}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181617',
        paddingTop: 70,
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
        alignItems: 'center', // Center content
    },
    content: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#1C1A1B',
        borderRadius: 20,
        padding: 20,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
        textAlign: 'center',
        lineHeight: 30,
    },
    description: {
        fontSize: 14,
        color: '#AAA',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    tipInput: {
        backgroundColor: '#1C1A1B', // Darker input background
        borderRadius: 10,
        padding: 15,
        color: '#FFF',
        fontSize: 18,
        width: '100%',
        marginBottom: 20,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: "#252222"
    },
    presetTipsContainer: {
        marginBottom: 30,
    },
    presetTipButton: {
        backgroundColor: '#1C1A1B', // Default background for unselected
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 18,
        margin: 5,
        borderWidth: 1,
        borderColor: "#252222"
    },
    selectedPresetTipButton: {
        backgroundColor: '#FFD700', // Gold for selected
    },
    presetTipButtonText: {
        color: '#FFF', // Default text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedPresetTipButtonText: {
        color: '#1C1A1B', // Dark text for selected
    },
    payTipButton: {
        backgroundColor: '#FFD700', // Gold color
        borderRadius: 15,
        paddingVertical: 18,
        width: '90%',
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    payTipButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        paddingVertical: 15,
        width: '90%',
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom:60
    },
    cancelButtonText: {
        color: '#AAA',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Tip;
