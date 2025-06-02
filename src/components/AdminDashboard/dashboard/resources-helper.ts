// services/resourceService.ts
import axios from "axios"
const url = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = `${url}/resources/count/by-type`;

export const getTotalResourceCounts = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getLast7DaysResourceCounts = async (token: string)  => {
  const response = await axios.get(`${API_BASE_URL}/last-7-days`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


 export const getTotalHelppoins = async (token: string) => {
  const response = await axios.get(`${url}/helppoints/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   return response.data;
 }

  export const getLast7DaysHelppoins = async (token: string) => {
  const response = await axios.get(`${url}/helppoints/count/last-week`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   return response.data;
 }

 export const getTotalUsers = async (token: string) => {
  const response = await axios.get(`${url}/users/count/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   return response.data;
 }

  export const getLast7DaysUsers = async (token: string) => {
  const response = await axios.get(`${url}/users/count/last-7-days`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   return response.data;
 }

  export const getLast5Resource = async (token: string) => {
  const response = await axios.get(`${url}/resources/latest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log("📦 Respuesta de getLast5Resource:", response.data)
  return response.data
}