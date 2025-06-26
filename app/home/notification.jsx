import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { notificationsData } from '../../constants/constant';

const Notification = () => {


  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment_success':
        return <AntDesign name="checkcircle" size={20} color="#FFD700" />;
      case 'new_services':
        return <MaterialCommunityIcons name="briefcase" size={20} color="#FFD700" />;
      default:
        return <AntDesign name="questioncircleo" size={20} color="#FFD700" />;
    }
  };

  const renderNotifications = () => {
    const todayNotifications = notificationsData.filter(item => item.category === 'today');
    const yesterdayNotifications = notificationsData.filter(item => item.category === 'yesterday');

    return (
      <View>
        {/* Today's Notifications */}
        {todayNotifications.length > 0 && (
          <View style={styles.notificationGroup}>
            <Text style={styles.notificationGroupTitle}>Today</Text>
            {todayNotifications.map((item) => (
              <View key={item.id} style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  {getNotificationIcon(item.type)}
                </View>
                <View style={styles.notificationDetails}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Yesterday's Notifications */}
        {yesterdayNotifications.length > 0 && (
          <View style={styles.notificationGroup}>
            <Text style={styles.notificationGroupTitle}>Yesterday</Text>
            {yesterdayNotifications.map((item) => (
              <View key={item.id} style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  {getNotificationIcon(item.type)}
                </View>
                <View style={styles.notificationDetails}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationList}>
        {renderNotifications()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617',
    paddingTop: 50,
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
  notificationList: {
    paddingHorizontal: 20,
  },
  notificationGroup: {
    marginBottom: 20,
  },
  notificationGroupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAA',
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  notificationIconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
});

export default Notification;
