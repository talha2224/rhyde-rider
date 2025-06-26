import { AntDesign } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Mlm = () => {
    const earningsByLevel = [
        { level: 1, referrals: 5, amount: '$5' },
        { level: 2, referrals: 15, amount: '$10' },
        { level: 3, referrals: 35, amount: '$15' },
        { level: 4, referrals: 45, amount: '$20' },
        { level: 5, referrals: 55, amount: '$25' },
    ];

    const totalCommission = '$50.89'; // Example total commission

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MLM Earnings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* MLM Info Section */}
                <View style={styles.mlmInfoContainer}>
                    <FontAwesome6 name="circle-dollar-to-slot" size={60} color="#FFD700" />
                    <Text style={styles.mlmDescription}>
                        Earn commissions when you referred ryders and drivers take {'\n'}rydes through multiple levels
                    </Text>
                </View>

                {/* Total Commission Section */}
                <View style={styles.totalCommissionSection}>
                    <Text style={styles.totalCommissionLabel}>Total Commission</Text>
                    <View style={styles.totalCommissionDetails}>
                        <Text style={styles.totalCommissionAmount}>{totalCommission}</Text>
                        <TouchableOpacity style={styles.claimButton}>
                            <Text style={styles.claimButtonText}>Claim</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Earnings by Level Section */}
                <View style={styles.earningsByLevelSection}>
                    <Text style={styles.sectionTitle}>Earnings by Level</Text>
                    {earningsByLevel.map((levelData) => (
                        <View key={levelData.level} style={styles.levelItem}>
                            <Text style={styles.levelText}>Level {levelData.level} ({levelData.referrals} Referrals)</Text>
                            <Text style={styles.levelAmount}>{levelData.amount}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, // Adjust for status bar
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
    mlmInfoContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    mlmDescription: {
        fontSize: 14,
        color: '#AAA',
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 20,
    },
    totalCommissionSection: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
    },
    totalCommissionLabel: {
        fontSize: 16,
        color: '#AAA',
        marginBottom: 10,
    },
    totalCommissionDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalCommissionAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
    },
    claimButton: {
        backgroundColor: '#FFD700', // Gold color
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 25,
    },
    claimButtonText: {
        color: '#1C1A1B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 15,
    },
    earningsByLevelSection: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 15,
    },
    levelItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 10,
    },
    levelText: {
        fontSize: 16,
        color: '#FFF',
    },
    levelAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
    },
});

export default Mlm;
