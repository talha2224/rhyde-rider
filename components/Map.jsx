import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { darkMapStyle } from '../style/dark.map.style';


const Map = ({mapContainer,location}) => {
    return (
        <MapView style={mapContainer} region={location} showsUserLocation showsMyLocationButton={false} customMapStyle={darkMapStyle}>
            <Marker coordinate={location}>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons name="map-marker" size={30} color="#FFD700" />
                </View>
            </Marker>
        </MapView>
    )
}

export default Map