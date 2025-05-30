import axios from 'axios'

export type PuntajeResponse = {
  puntajes: number[],
  desde: string,
  hasta: string,
  cantidadRegistros: number,
  total: number,
  IEG: number,
  interpretacion: string
  consejo: string
 accion: string
}

export async function PuntajesWeeklyHelper(id: string, token: string): Promise<PuntajeResponse> {
  try {
       const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get<PuntajeResponse>(`${url}/emotions/analysis/weekly/${id}`, // ⬅️ Reemplaza con tu endpoint real
     {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error al obtener puntajes:', error)
    throw error
  }
}


export async function PuntajesDailyHelper(id: string, token: string): Promise<PuntajeResponse> {
  try {
       const url = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get<PuntajeResponse>(`${url}/emotions/analysis/daily/${id}`, // ⬅️ Reemplaza con tu endpoint real
     {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error al obtener puntajes:', error)
    throw error
  }
}