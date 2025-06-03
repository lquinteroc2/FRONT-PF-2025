'use client'

import { useEffect, useState } from 'react'
import {
 AreaChart, Area, XAxis, YAxis, Tooltip,
 CartesianGrid, ResponsiveContainer, TooltipProps
} from 'recharts'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/Auth'
import { PuntajeResponse, PuntajesMonthHelper, PuntajesWeeklyHelper } from './emotionsPuntajesHelper'


const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
 if (active && payload && payload.length) {
  return (
   <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-neutro-light">
    <p className="text-sm font-bold text-neutro-dark">{`Día: ${label}`}</p>
    <p className="text-sm text-primary">{`Puntaje: ${payload[0].value}`}</p>
   </div>
  );
 }
 return null;
};

const getInterpretationStyle = (interpretation: string) => {
 const lowerCaseInterpretation = interpretation.toLowerCase();
 if (lowerCaseInterpretation.includes('positivo') || lowerCaseInterpretation.includes('favorable')) {
  return {
   bgColor: 'bg-primary-light',
   textColor: 'text-primary-dark',
   dotColor: 'bg-primary',
   title: 'Estado Emocional Favorable'
  };
 }
 if (lowerCaseInterpretation.includes('negativo') || lowerCaseInterpretation.includes('desfavorable')) {
  return {
   bgColor: 'bg-neutro-light',
   textColor: 'text-neutro-dark',
   dotColor: 'bg-neutro',
   title: 'Estado Emocional a Revisar'
  };
 }
 return {
  bgColor: 'bg-neutro-light',
  textColor: 'text-neutro-dark',
  dotColor: 'bg-neutro',
  title: 'Estado Emocional Neutro'
 };
};

export default function PuntajesEmotionsMonth() {
 const [data, setData] = useState<PuntajeResponse | null>(null)
 const [isLoading, setIsLoading] = useState(true);
 const { user } = useAuth()

 useEffect(() => {
  if (!user?.user.id || !user?.token) return

  const fetchData = async () => {
   setIsLoading(true);
   try {
    const response = await PuntajesMonthHelper(user.user.id, user.token)
    setData(response)
   } catch (error) {
    console.error('Error cargando puntajes:', error)
    setData(null);
   } finally {
    setIsLoading(false);
   }
  }

  fetchData()
 }, [user?.user.id, user?.token])

const generateChartData = () => {
  if (!data?.puntajes || !data?.desde || !data?.hasta) return [];

  // Convertimos las fechas desde y hasta a objetos Date
  const start = new Date(data.desde);
  const end = new Date(data.hasta);

  // Calculamos el número de días entre start y end (inclusive)
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  if (diffDays < 30 || data.puntajes.length < 30) return [];
  // Recortamos puntajes en caso que haya menos puntajes que días
  const puntajes = data.puntajes.slice(-diffDays);

  // Generamos array de fechas para cada puntaje
    const fechas: Date[] = [];
  for (let i = 0; i < puntajes.length; i++) {
  const fecha = new Date(start);
  fecha.setDate(start.getDate() + i);
  fechas.push(fecha);
}
  // Mapear fechas y puntajes
  return puntajes.map((puntaje, i) => ({
    dia: fechas[i].toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
    puntaje,
  }));
};


 if (isLoading) {
  return (
   <div className="w-full max-w-3xl mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg animate-pulse">
    <div className="h-8 bg-neutro-light rounded w-3/4 mb-6"></div>
    <div className="h-64 bg-neutro-light rounded-xl mb-6"></div>
    <div className="flex justify-center items-center space-x-4">
     <div className="h-16 bg-neutro-light rounded-full w-16"></div>
     <div className="flex-1 space-y-2">
      <div className="h-6 bg-neutro-light rounded w-1/2"></div>
      <div className="h-4 bg-neutro-light rounded w-full"></div>
     </div>
    </div>
   </div>
  )
 }

 if (!data) {
  return (
   <div className="w-full max-w-3xl mx-auto p-8 mt-16 bg-white rounded-2xl shadow-lg text-center">
    <h3 className="text-xl font-semibold text-neutro-dark">No se pudieron cargar los datos</h3>
    <p className="text-neutro mt-2">Hubo un problema al obtener tu bitácora emocional. Por favor, intenta de nuevo más tarde.</p>
   </div>
  )
 }

 const chartData = generateChartData();
 const interpretationStyle = getInterpretationStyle(data.interpretacion);

 const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
   opacity: 1,
   y: 0,
   transition: {
    delayChildren: 0.2,
    staggerChildren: 0.2,
    duration: 0.3,
    ease: "easeInOut"
   }
  }
 };

 const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
 };

 return (
  <motion.div
   variants={containerVariants}
   initial="hidden"
   animate="visible"
   className="w-full max-w-3xl mt-24 mx-auto p-6 bg-neutro-light rounded-2xl shadow-xl space-y-6 border border-neutro"
  >
   <motion.h2 variants={itemVariants} className="text-2xl font-bold text-primary">
    Analisis Mensual
   </motion.h2>

<motion.div variants={itemVariants} className="h-64 w-full">
  {chartData.length >= 30 ? (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorPuntaje" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={
                interpretationStyle.dotColor === 'bg-primary'
                  ? '#ccfbf1'
                  : '#f3f4f6'
              }
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={interpretationStyle.dotColor.replace('bg-', '#')}
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
        <XAxis dataKey="dia" stroke="#4b5563" fontSize={12} />
        <YAxis stroke="#4b5563" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="puntaje"
          stroke="#16a34a"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#colorPuntaje)"
        />
      </AreaChart>
    </ResponsiveContainer>
  ) : (
    <div className="flex items-center justify-center h-full">
      <p className="text-neutro-dark text-sm text-center px-4">
        No hay suficientes datos (30 días) para mostrar la gráfica.
      </p>
    </div>
  )}
</motion.div>

     <motion.div
     variants={itemVariants}
     className="bg-neutro-ice p-5 rounded-xl shadow-md border border-neutro-dark/80"
   >
     <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left md:space-x-6">
       {/* Bloque Izquierdo: IEG */}
       <div className="flex-shrink-0 mb-4 md:mb-0">
         <p className="text-sm font-medium text-neutro-dark">Tu Índice General</p>
         <p className="text-6xl font-bold text-primary tracking-tight shadow-sm">
           {data.IEG.toFixed(1)}
         </p>
       </div>
   
       {/* Bloque Derecho: Interpretación */}
       <div className={`flex-grow p-4 rounded-lg ${interpretationStyle.bgColor}`}>
         <div className="flex items-center justify-center md:justify-start space-x-3">
           <span className={`h-3 w-3 rounded-full ${interpretationStyle.dotColor}`}></span>
           <h4 className={`text-lg font-semibold ${interpretationStyle.textColor}`}>
             {interpretationStyle.title}
           </h4>
         </div>
         <p className={`mt-1 text-sm ${interpretationStyle.textColor}`}>
           {data.interpretacion}
         </p>
       </div>
     </div>
   
     {/* Sección Inferior: Consejo y Acción */}
      <div className="mt-6 border-t border-neutro-ice pt-4 text-center md:text-left">
       <p className="text-sm text-neutro-dark">
         <span className="font-semibold text-neutro-dark">Consejo: </span>
         {data.consejo}
       </p>
       <p className="text-sm text-neutro-dark mt-2">
         <span className="font-semibold text-neutro-dark">Acción sugerida: </span>
         {data.accion}
       </p>
     </div>
   </motion.div>
  </motion.div>
  
 )
}