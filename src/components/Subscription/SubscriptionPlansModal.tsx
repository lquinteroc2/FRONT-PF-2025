
import { Badge, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { SubscriptionButtonPrueba, SubscriptionButtonThree, SubscriptionButton } from "../Buttons/SubscriptionButton";

interface SubscriptionPlansModalProps {
  onClose: () => void;
  userCurrentPlan: Plan;
  setUserCurrentPlan: React.Dispatch<React.SetStateAction<Plan>>;
  userHasHadSubscription: boolean;
  setUserHasHadSubscription: React.Dispatch<React.SetStateAction<boolean>>;
} 

export type Plan = "Gratuito" | "Prueba" | "Mensual" | "Trimestral";

export default function SubscriptionPlansModal({
  onClose,
  userCurrentPlan,
  setUserCurrentPlan,
  userHasHadSubscription,
  setUserHasHadSubscription,
}: SubscriptionPlansModalProps) {


    const Feature = ({ children }: { children: string }) => (
    <div className="flex items-center gap-2 text-neutro-dark">
      <Check className="w-4 h-4 text-primary" />
      {children}
    </div>
  );
  return (
        <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex justify-center items-center z-50">
      <div className=" bg-neutro-dark rounded-2xl p-8 w-11/12 max-w-6xl overflow-auto shadow-xl border border-neutro-light">
        <h2 className="text-3xl font-bold text-neutro-light text-center mb-10">Elige tu plan</h2>

        <div className="grid gap-6 md:grid-cols-4 mt-4">
          {/* GRATUITO */}
          <Card className="bg-white shadow-md rounded-xl border border-neutro transition-all duration-300 hover:border-primary transform hover:scale-105">

            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg text-primary-dark">
                Gratuito
                <Badge  className="border-primary text-primary">Gratis</Badge>
              </CardTitle>
              <p className="text-sm text-neutro-dark">Acceso básico sin costo</p>
            </CardHeader>
          <CardContent className="space-y-2 text-sm flex-grow">
  <Feature>Registro diario de emociones</Feature>
  <Feature>Acceso a recursos del inicio</Feature>
  <Feature>Historial de 3 emociones recientes</Feature>
  <Feature>Mensajes personalizados según emoción</Feature>
         </CardContent>
            <CardFooter>
              <Button
                disabled={userCurrentPlan === "Gratuito"}
                className="w-full bg-primary text-white hover:bg-primary-dark"
                onClick={() => setUserCurrentPlan("Gratuito")}
              >
                {userCurrentPlan === "Gratuito" ? (
                  <>Tu plan <u className="font-semibold">actual</u></>
                ) : "Seleccionar Gratuito"}
              </Button>
            </CardFooter>
          </Card>

          {/* PRUEBA */}
         <Card className="bg-white shadow-md rounded-xl border border-neutro transition-all duration-300 hover:border-primary transform hover:scale-105">

            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg text-primary-dark">
                Prueba Gratuita
                <Badge className="bg-primary-light text-primary-dark">7 Días</Badge>
              </CardTitle>
              <p className="text-xs text-neutro-dark text-center">Para Nuevos Usuarios <br/> Unica Vez </p>
            </CardHeader>
            <CardContent className="space-y-2 text-xs flex-grow">
  <Feature>7 días de acceso premium gratuito (una sola vez)</Feature>
  <Feature>Chat de ayuda emocional 24/7</Feature>
  <Feature>Registro emocional ilimitado</Feature>
  <Feature>Acceso completo a recursos</Feature>
  <Feature>Mapa interactivo de centros de apoyo</Feature>
  <Feature>Bitácora emocional avanzada (diaria, semanal y mensual)</Feature>
</CardContent>
            <CardFooter>
              {userHasHadSubscription || userCurrentPlan === "Prueba" ? (
                <Button disabled className="w-full">
                  {userCurrentPlan === "Prueba" ? (
                    <>Tu plan <u className="font-semibold">actual</u></>
                  ) : "Ya usaste tu prueba"}
                </Button>
              ) : (
                <SubscriptionButtonPrueba />
              )}
            </CardFooter>
          </Card>

          {/* MENSUAL */}
         <Card className="bg-white shadow-md rounded-xl border border-neutro transition-all duration-300 hover:border-primary transform hover:scale-105">

            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg text-primary-dark">
                Mensual
                <Badge className="bg-primary text-white">1 Mes</Badge>
              </CardTitle>
              <p className="text-xs text-neutro-dark text-center">Acceso por 1 Mes $3.99</p>
            </CardHeader>
             <CardContent className="space-y-2 text-xs flex-grow">
  <Feature>Suscripción activa por 30 días</Feature>
  <Feature>Chat de ayuda emocional 24/7</Feature>
  <Feature>Registro emocional ilimitado</Feature>
  <Feature>Acceso completo a recursos</Feature>
  <Feature>Mapa interactivo de centros de apoyo</Feature>
  <Feature>Bitácora emocional avanzada (diaria, semanal y mensual)</Feature>
</CardContent>
            <CardFooter>
              {userCurrentPlan === "Mensual" ? (
                <Button disabled className="w-full">
                  Tu plan <u className="font-semibold">actual</u>
                </Button>
              ) : (
                <SubscriptionButton />
              )}
            </CardFooter>
          </Card>

          {/* TRIMESTRAL */}
          <Card className="bg-white shadow-md rounded-xl border border-neutro transition-all duration-300 hover:border-primary transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg text-primary-dark">
                Trimestral
                <Badge className="bg-neutro-light text-neutro-dark text-xs text-center">3 Meses <br/>¡Ahorra 15%!</Badge>
              </CardTitle>
              <p className="text-xs text-neutro-dark text-center">Acceso por 3 Meses $10.17</p>
            </CardHeader>
            <CardContent className="space-y-2 text-xs flex-grow">
                <Feature>Suscripción por 90 días con 15% de descuento - $10.17</Feature>
                <Feature>Chat de ayuda emocional 24/7</Feature>
  <Feature>Registro emocional ilimitado</Feature>
  <Feature>Acceso completo a recursos</Feature>
  <Feature>Mapa interactivo de centros de apoyo</Feature>
  <Feature>Bitácora emocional avanzada (diaria, semanal y mensual)</Feature>
            </CardContent>
            <CardFooter>
              {userCurrentPlan === "Trimestral" ? (
                <Button disabled className="w-full">
                  Tu plan <u className="font-semibold">actual</u>
                </Button>
              ) : (
                <SubscriptionButtonThree />
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
             <Button variant="ghost" className="text-neutro-light hover:underline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
