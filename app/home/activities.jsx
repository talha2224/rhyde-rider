import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import badgeImg from "../../assets/images/home/badge.png";
import userImg from "../../assets/images/home/user.png";
import BottomNavbar from "../../components/BottomNavbar";
import config from '../../config';

const milestonesData = [
  {
    id: "1",
    level: 1,
    title: "2% off first ryde",
    reached: true,
    description: "Level 1",
  },
  {
    id: "2",
    level: 10,
    title: "Free ryde for a day",
    reached: false,
    description: "Level 10",
  },
  {
    id: "3",
    level: 20,
    title: "10% off ryde",
    reached: true,
    description: "You're currently in this level",
  },
  {
    id: "4",
    level: 30,
    title: "10% off first ryde for 48 hrs",
    reached: false,
    description: "Level 30",
  },
  {
    id: "5",
    level: 40,
    title: "10% off ryde",
    reached: false,
    description: "Level 40",
  },
];
const Activities = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("Ryde history");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const [rideRes, reviewRes] = await Promise.all([
          axios.get(`${config.baseUrl}/booking/history/all`, { params: { riderId: userId } }),
          axios.get(`${config.baseUrl}/review`, { params: { riderId: userId } })
        ]);
        setRideHistory(rideRes.data.data || []);
        setReviews(reviewRes.data.data || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const ratingStats = useMemo(() => {
    const total = reviews.length;
    const starCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(r => { starCount[r.stars] = (starCount[r.stars] || 0) + 1 });
    const average = total ? (reviews.reduce((a, r) => a + r.stars, 0) / total).toFixed(1) : "0.0";
    const breakdown = {};
    for (let i = 5; i >= 1; i--) {
      breakdown[i] = total ? Math.round((starCount[i] / total) * 100) : 0;
    }
    return { average, total, breakdown };
  }, [reviews]);

  const renderContent = () => {
    switch (activeTab) {
      case "Ryde history":
        if (loading) return <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />;
        return (
          <ScrollView contentContainerStyle={styles.tabContent}>
            {rideHistory.map(item => (
              <View key={item._id} style={styles.rydeHistoryCard}>
                <View style={styles.rydeHistoryHeader}>
                  <Image source={userImg} style={styles.userImage} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.riderId?.name || "Rider"}</Text>
                    <Text style={styles.userLocation}>{/* you can add location if available */}</Text>
                  </View>
                  <Text style={styles.rydePrice}>${(item.fare + (item.tip || 0)).toFixed(2)}</Text>
                </View>
                <Text style={styles.sectionHeading}>Destination</Text>
                <View style={styles.destinationRow}>
                  <MaterialCommunityIcons name="map-marker-outline" size={20} color="#FBB73A" />
                  <Text style={styles.destinationText}>{item.pickupAddress}</Text>
                </View>
                <View style={styles.destinationRow}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
                  <Text style={styles.destinationText}>{item.dropOffAddress}</Text>
                </View>
                <View style={styles.rydeDetailsRow}>
                  <View style={styles.rydeDetailItem}>
                    <MaterialCommunityIcons name="map-marker-distance" size={20} color="#FFF" />
                    <Text style={styles.rydeDetailText}>{item.distance.toFixed(1)} Km</Text>
                  </View>
                  <View style={styles.rydeDetailItem}>
                    <AntDesign name="calendar" size={20} color="#FFF" />
                    <Text style={styles.rydeDetailText}>{moment(item.createdAt).format("DD MMM, YYYY")}</Text>
                  </View>
                  <View style={styles.rydeDetailItem}>
                    <AntDesign name="clockcircleo" size={20} color="#FFF" />
                    <Text style={styles.rydeDetailText}>{/* if duration available */}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        );
      case "Reviews":
        if (loading) return <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />;
        return (
          <ScrollView contentContainerStyle={styles.tabContent}>
            <View style={styles.reviewsSummary}>
              <Text style={styles.averageRating}>{ratingStats.average}</Text>
              <Text style={styles.totalReviews}>({ratingStats.total} reviews)</Text>
              {[5, 4, 3, 2, 1].map(star => (
                <View key={star} style={styles.ratingBarContainer}>
                  <Text style={styles.ratingBarLabel}>{star}</Text>
                  <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${ratingStats.breakdown[star]}%` }]} />
                  </View>
                  <Text style={styles.ratingPercentage}>{ratingStats.breakdown[star]}%</Text>
                </View>
              ))}
            </View>
            <Text style={styles.feedbackTitle}>Feedback & reviews</Text>
            <View style={styles.feedbackFilter}>
              {['Verified', 'New', 'Previous', 'Latest', 'Neutral'].map((label, i) => (
                <TouchableOpacity key={i} style={[styles.filterButton, i === 0 && { backgroundColor: "#FBB73A" }]}>
                  <Text style={[styles.filterButtonText, i === 0 && { color: "#000" }]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {reviews.map(item => (
              <View key={item._id} style={styles.feedbackItem}>
                <Image source={userImg} style={styles.feedbackUserImage} />
                <View style={styles.feedbackDetails}>
                  <Text style={styles.feedbackUserName}>{item.riderId?.name || "Anonymous"}</Text>
                  <Text style={styles.feedbackTripId}>Trip ID: {item.bookingId.slice(-6)} | {moment(item.createdAt).format("DD/MM/YY")}</Text>
                  <Text style={styles.feedbackComment}>{item.message?.trim()}</Text>
                </View>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="#FFF" />
              </View>
            ))}
          </ScrollView>
        );
      case "Milestones":
        // same content as before—static data preserved
        return (
          <ScrollView contentContainerStyle={styles.tabContent}>
            <View style={styles.milestoneLevelCard}>
              <Text style={styles.milestoneLevelText}>Level 20</Text>
              <Text style={styles.milestoneLevelSubText}>Keep up the good</Text>
              <View style={styles.milestoneProgressBarBackground}><View style={styles.milestoneProgressBarFill} /></View>
              <Text style={styles.milestoneProgressText}>10/20 rides</Text>
            </View>
            <Text style={styles.milestonesSectionTitle}>Milestones and rewards</Text>
            {milestonesData.map(m => (
              <View key={m.id} style={styles.milestoneItem}>
                <View style={styles.milestoneIconText}>
                  {m.reached ? <AntDesign name="checkcircle" size={24} color="#FBB73A" style={{ marginRight: 15 }} />
                    : <Image source={badgeImg} style={styles.milestoneBadge} />}
                  <View style={styles.milestoneDetails}>
                    <Text style={styles.milestoneTitle}>{m.title}</Text>
                    <Text style={styles.milestoneDescription}>{m.description}</Text>
                  </View>
                </View>
                {!m.reached && <MaterialCommunityIcons name="lock" size={24} color="#AAA" />}
              </View>
            ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
        <TouchableOpacity style={styles.allRydesButton}>
          <Text style={styles.allRydesText}>All rydes</Text>
          <AntDesign name="caretdown" size={12} color="#FBB73A" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      {/* tab selector */}
      <View style={styles.tabContainer}>
        {["Ryde history", "Reviews", "Milestones"].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderContent()}

      <BottomNavbar />
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1A1B", // Dark background color
    paddingTop: 50, // Adjust for status bar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  allRydesButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FBB73A",
  },
  allRydesText: {
    color: "#FBB73A",
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    backgroundColor: "#181617",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#FBB73A",
  },
  tabButtonText: {
    color: "#FFF",
  },
  activeTabButtonText: {
    color: "#1C1A1B",
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  rydeHistoryCard: {
    backgroundColor: "#181617",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  rydeHistoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  userLocation: {
    fontSize: 12,
    color: "#AAA",
  },
  rydePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FBB73A",
  },
  sectionHeading: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 5,
  },
  destinationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  destinationText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 10,
  },
  rydeDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  rydeDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  rydeDetailText: {
    color: "#FFF",
    fontSize: 12,
    marginLeft: 5,
  },

  // Reviews Styles
  reviewsSummary: {
    backgroundColor: "#181617",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  averageRating: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
  },
  totalReviews: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 15,
  },
  ratingBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingBarLabel: {
    fontSize: 14,
    color: "#FFF",
    marginRight: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#444",
    borderRadius: 5,
    marginRight: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#ffff",
    borderRadius: 5,
  },
  ratingPercentage: {
    fontSize: 14,
    color: "#FFF",
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  feedbackFilter: {
    flexDirection: "row",
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  feedbackItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#181617",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  feedbackUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedbackDetails: {
    flex: 1,
  },
  feedbackUserName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  feedbackTripId: {
    fontSize: 12,
    color: "#AAA",
    marginBottom: 5,
  },
  feedbackComment: {
    fontSize: 14,
    color: "#FFF",
  },

  // Milestones Styles
  milestoneLevelCard: {
    backgroundColor: "#FBB73A", // Gold background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  milestoneLevelText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1A1B",
  },
  milestoneLevelSubText: {
    fontSize: 16,
    color: "#1C1A1B",
    marginBottom: 10,
  },
  milestoneProgressBarBackground: {
    height: 8,
    backgroundColor: "#1C1A1B",
    borderRadius: 5,
    marginBottom: 5,
  },
  milestoneProgressBarFill: {
    width: "50%", // Example progress, adjust as needed
    height: "100%",
    backgroundColor: "#8A2BE2", // Purple color for progress
    borderRadius: 5,
  },
  milestoneProgressText: {
    fontSize: 14,
    color: "#1C1A1B",
  },
  milestonesSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
  },
  milestoneItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181617",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  milestoneIconText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  milestoneBadge: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  milestoneDetails: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  milestoneDescription: {
    fontSize: 12,
    color: "#AAA",
    marginTop: 2,
  },
});

