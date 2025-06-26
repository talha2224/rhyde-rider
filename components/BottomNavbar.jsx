import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BottomNavbar = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const tabs = [
    {link:"home/index",name: 'Home', icon: <MaterialIcons name="add-home"  size={20} color="#918D8F" />, activeIcon: <MaterialIcons name="add-home"  size={20} color="#FBB73A" /> },
    {link:"home/activities",name: 'Activities', icon: <Octicons name="checklist"  size={20} color="#918D8F" />, activeIcon: <Octicons name="checklist"  size={20} color="#FBB73A" /> },
    {link:"home/wallet",name: 'Wallet', icon: <MaterialCommunityIcons name="wallet" size={20} color="#918D8F" />, activeIcon: <MaterialCommunityIcons name="wallet" size={20} color="#FBB73A" /> },
    {link:"home/rewards",name: 'Rewards', icon: <MaterialCommunityIcons name="wallet" size={20} color="#918D8F" />, activeIcon: <MaterialCommunityIcons name="wallet" size={20} color="#FBB73A" /> },
    {link:"home/profile",name: 'Profile', icon: <FontAwesome5 name="user" size={20} color="#918D8F" />, activeIcon: <FontAwesome5 name="user" size={20} color="#FBB73A" /> },
  ];


  return (
    <View style={[styles.navContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.navBar}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.name} style={styles.navItem} onPress={() => router.push(tab?.link ==="home/index"?"home":tab?.link)}>
            {tab?.link === route?.name ? tab.activeIcon : tab.icon}
            <Text style={{textAlign:"center",color:tab?.link === route?.name?"#FBB73A":"#918D8F",fontWeight:"600",marginTop:2,fontSize:12}}>{tab?.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#1C1A1B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:12
  },
});

export default BottomNavbar;