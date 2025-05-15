import * as Yup from "yup"; 


export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("El correo electrónico es obligatorio")
    .email("El correo electrónico no es válido"),

  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .test(
      "no-spaces",
      "La contraseña no puede contener espacios",
      (value) => !/\s/.test(value)
    ),
});
