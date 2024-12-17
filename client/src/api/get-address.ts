import axios from "axios";

interface GetAddressRequest {
  lat: number;
  lgn: number;
  apiKey: string;
}

export async function getAddress({ apiKey, lat, lgn }: GetAddressRequest) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lgn}&key=${apiKey}`
  );

  return response.data;
}
