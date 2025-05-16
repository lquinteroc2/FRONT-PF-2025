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
    .min(8, "Mínimo 8 caracteres")
    .max(15, "Máximo 15 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[!@#$%&*]/, "Debe contener un carácter especial (!@#$%&*)")
    .test("no-espacios", "La contraseña no puede contener espacios", (value) => !/\s/.test(value)),

  confirmPassword: Yup.string()
    .required("Debes confirmar tu contraseña")
    .oneOf([Yup.ref("password")],"Las contraseñas no coinciden"),

  address: Yup.string()
    .required("El campo direccion es requerido")
    .max(20, "El campo direccion tiene como máximo 30 caracteres"),
  
  profileImage: Yup.string()
    .required("El campo direccion es requerido")
    .max(100, "El campo direccion tiene como máximo 100 caracteres"),
});
