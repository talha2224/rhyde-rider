import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import config from '../../config';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const res = await axios.get(`${config.baseUrl}/notifications`, {
        params: {
          userId,
          role: 'rider', // since this is rider app
        },
      });

      setNotifications(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications])
  );

  const getNotificationIcon = (type) => {
    return <AntDesign name="checkcircle" size={20} color="#FFD700" />;
  };

  const groupNotifications = () => {
    const today = [];
    const yesterday = [];
    const others = [];

    notifications.forEach((item) => {
      const createdDate = moment(item.createdAt);
      if (createdDate.isSame(moment(), 'day')) {
        today.push(item);
      } else if (createdDate.isSame(moment().subtract(1, 'day'), 'day')) {
        yesterday.push(item);
      } else {
        others.push(item);
      }
    });

    return { today, yesterday, others };
  };

  const renderGroup = (title, items) => (
    <View style={styles.notificationGroup}>
      <Text style={styles.notificationGroupTitle}>{title}</Text>
      {items.map((item) => (
        <View key={item._id} style={styles.notificationItem}>
          <View style={styles.notificationIconContainer}>
            {getNotificationIcon(item.type)}
          </View>
          <View style={styles.notificationDetails}>
            <Text style={styles.notificationTitle}>Payment</Text>
            <Text style={styles.notificationDescription}>{item.message}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const { today, yesterday, others } = groupNotifications();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Body */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.notificationList}>
          {today.length > 0 && renderGroup("Today", today)}
          {yesterday.length > 0 && renderGroup("Yesterday", yesterday)}
          {others.length > 0 && renderGroup("Earlier", others)}
          {today.length === 0 && yesterday.length === 0 && others.length === 0 && (
            <Text style={styles.noNotification}>No notifications found</Text>
          )}
        </ScrollView>
      )}
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
