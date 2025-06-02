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


 export const getTotalHelppoins = async () => {
  const response = await axios.get(`${url}/helppoints/count`);
   return response.data;
 }

  export const getLast7DaysHelppoins = async () => {
  const response = await axios.get(`${url}/helppoints/count/last-week`);
   return response.data;
 }

 export const getTotalUsers = async () => {
  const response = await axios.get(`${url}/users/count/total`);
   return response.data;
 }

  export const getLast7DaysUsers = async () => {
  const response = await axios.get(`${url}/users/count/last-7-days`);
   return response.data;
 }

  export const getLast5Resource = async () => {
  const response = await axios.get(`${url}/resources/latest`)
  console.log("📦 Respuesta de getLast5Resource:", response.data)
  return response.data
}