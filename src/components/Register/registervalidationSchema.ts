import * as Yup from "yup";

export const validationSchemaRegister = Yup.object({
  name: Yup.string()
    .required("El campo nombre es requerido")
    .max(20, "El campo nombre tiene como máximo 20 caracteres"),

  email: Yup.string()
    .required("El campo email es requerido")
    .email("Formato de email inválido"),

  password: Yup.string()
    .required("La contraseña es obligatoria")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .test(
      "no-espacios",
      "La contraseña no puede contener espacios",
      (value) => !/\s/.test(value)
    ),
    confirmPassword: Yup.string()
    .required("Debes confirmar tu contraseña")
    .oneOf([Yup.ref("password")],"Las contraseñas no coinciden")
});