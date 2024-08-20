import fetch from 'node-fetch';

const getCoordinatesFromOSMId = async (osmId) => {
  const url = `https://api.openstreetmap.org/api/0.6/node/${osmId}.json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const node = data.elements[0];
    return {
      latitude: node.lat,
      longitude: node.lon,
    };
  } catch (error) {
    console.error(`Error fetching coordinates for OSM ID ${osmId}:`, error);
    throw error;
  }
};

export default getCoordinatesFromOSMId;
