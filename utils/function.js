import * as Location from "expo-location";

export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (response && response.length > 0) {
      const address = response[0];
      const fullAddress = `${address.name || ""} ${address.street || ""}, ${
        address.city || ""
      }, ${address.region || ""}, ${address.country || ""}`;
      return fullAddress.trim();
    }
    return "Address not found";
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "Error getting address";
  }
};

export const toRad = (value) => (value * Math.PI) / 180;

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (
    typeof lat1 !== "number" ||
    typeof lon1 !== "number" ||
    typeof lat2 !== "number" ||
    typeof lon2 !== "number"
  )
    return NaN;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateRideDetails = (driverLocation, pickup, dropoff, rate) => {
  if (
    !driverLocation ||
    !pickup ||
    !dropoff ||
    typeof rate !== "number" ||
    typeof driverLocation.latitude !== "number" ||
    typeof driverLocation.longitude !== "number" ||
    typeof pickup.latitude !== "number" ||
    typeof pickup.longitude !== "number" ||
    typeof dropoff.dropOfLatitude !== "number" ||
    typeof dropoff.dropOfLongtitude !== "number"
  )
    return { driverDistanceFromRider: null, totalRideAmount: null };

  const driverDistanceFromRider = calculateDistance(
    driverLocation.latitude,
    driverLocation.longitude,
    pickup.latitude,
    pickup.longitude
  );

  const rideDistance = calculateDistance(
    pickup.latitude,
    pickup.longitude,
    dropoff.dropOfLatitude,
    dropoff.dropOfLongtitude
  );

  if (isNaN(driverDistanceFromRider) || isNaN(rideDistance))
    return { driverDistanceFromRider: null, totalRideAmount: null };

  const totalRideAmount = rideDistance * rate;

  return {
    driverDistanceFromRider: driverDistanceFromRider.toFixed(2),
    totalRideAmount: totalRideAmount.toFixed(2),
  };
};
