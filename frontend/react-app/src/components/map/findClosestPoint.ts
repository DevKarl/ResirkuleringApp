// haversine formel
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // i km
};

export const findClosestPoint = (coords: any, avfallspunkter: any) => {
  if (!coords || !avfallspunkter?.length) return null;

  return avfallspunkter.reduce((closest: any, punkt: any) => {
    const distance = getDistance(
      coords.latitude,
      coords.longitude,
      parseFloat(punkt.latitude),
      parseFloat(punkt.longitude)
    );

    return !closest || distance < closest.distance
      ? { ...punkt, distance }
      : closest;
  }, null);
};
