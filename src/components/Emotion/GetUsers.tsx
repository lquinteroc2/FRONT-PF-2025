"use client"
import { useEffect } from "react";
import axios from "axios";

const GetAllUsers = () => {
     const url = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
    const response = await axios.get(`${url}/emotions/seeder`);
        console.log("✅ Usuarios obtenidos:", response.data);
      } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return null;
};

export default GetAllUsers;
