export function obfuscateLocation(lat, lng, radiusInMeters = 500) {
  const earthRadius = 6371000; // Earth's radius in meters
  const maxRadiusInDegrees = (radiusInMeters / earthRadius) * (180 / Math.PI);

  // Generate a random distance within the specified radius
  const r = maxRadiusInDegrees * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;

  // Calculate the offset
  const latOffset = r * Math.cos(theta);
  const lngOffset = (r * Math.sin(theta)) / Math.cos((lat * Math.PI) / 180);

  // Apply the offset
  const newLat = lat + latOffset;
  const newLng = lng + lngOffset;

  return { lat: newLat, lng: newLng };
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
