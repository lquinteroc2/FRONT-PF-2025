export const FORM_FIELDS = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    placeholder: "Ingresa tu nombre completo",
  },
  {
    name: "email",
    label: "Correo Electrónico",
    type: "email",
    placeholder: "tu@email.com",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Crea una contraseña segura",
  },
  {
    name: "confirmPassword",
    label: "Confirmar Contraseña",
    type: "password",
    placeholder: "Confirma tu contraseña",
  },
] as const
