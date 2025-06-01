// services/resourceService.ts
import axios from "axios"
const url = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = `${url}/resources/count/by-type`;

export const getTotalResourceCounts = async () => {
  const response = await axios.get(`${API_BASE_URL}/total`);
  return response.data;
};

export const getLast7DaysResourceCounts = async () => {
  const response = await axios.get(`${API_BASE_URL}/last-7-days`);
  return response.data;
};