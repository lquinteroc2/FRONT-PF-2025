import axios from "axios";

// INTERFAZ de emociones registradas (asumiendo que es correcta)
export interface RegisteredEmotion {
  id: string;
  emotion: {
    id: string;
    name: string;
    emoji: string;
    reflexion: string; // reflexión
    clinicalValue: number; // valor clínico
  };
  intensity: number; // intensidad
  comment: string; // comentario
  date: string; // fecha (idealmente Date o ISO string)
  createdAt: string; // creado en (idealmente Date o ISO string)
  updatedAt: string; // actualizado en (idealmente Date o ISO string)
}

// HELPER para obtener datos (asumiendo que es correcto y NEXT_PUBLIC_API_URL está configurado)
const emotionHistoryHelper = async (userId: string): Promise<RegisteredEmotion[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
    // console.log("📦 Respuesta completa del backend:", response.data);

    // Asumiendo que los registros de emociones están en response.data.states o response.data directamente
    // Ajusta esto según la estructura real de tu respuesta API
    const rawStates = response.data.states || response.data;

    if (!Array.isArray(rawStates)) {
      console.error("❌ La respuesta del backend no contiene un array de 'states':", rawStates);
      return []; // Devuelve un array vacío si los datos no son como se esperan
    }

    const formattedStates: RegisteredEmotion[] = rawStates.map((state: any) => ({
      id: state.id,
      emotion: {
        id: state.emotion.id,
        name: state.emotion.name,
        emoji: state.emotion.emoji,
        reflexion: state.emotion.reflexion,
        clinicalValue: state.emotion.clinicalValue,
      },
      intensity: state.intensidad || state.intensity, // Comprueba ambas claves (español/inglés)
      comment: state.comentario || state.comment,   // Comprueba ambas claves (español/inglés)
      date: state.date || state.createdAt, // Usa 'date' o 'createdAt' como principal
      createdAt: state.createdAt,
      updatedAt: state.updatedAt,
    }));
    // console.log("📘 Emociones formateadas:", formattedStates);
    return formattedStates;
  } catch (error) {
    console.error("❌ Error al obtener las emociones del usuario:", error);
    throw error;
  }
};

export default emotionHistoryHelper;