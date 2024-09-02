function calculateDistance({ lat1, lng1, lat2, lng2 }) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  lat1 = toRadians(lat1);
  lng1 = toRadians(lng1);
  lat2 = toRadians(lat2);
  lng2 = toRadians(lng2);

  const dLat = lat2 - lat1;
  const dLon = lng2 - lng1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const R = 3959;

  const distance = R * c;

  return distance;
}

export default calculateDistance;
