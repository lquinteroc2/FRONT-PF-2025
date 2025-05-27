import * as Yup from "yup"

export const validationSchemaRegister = Yup.object({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios")
    .required("El nombre es obligatorio"),

  email: Yup.string().email("Ingrese un email válido").required("El email es obligatorio"),

  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "La contraseña debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial",
    )
    .required("La contraseña es obligatoria"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirme su contraseña"),
})
