import { param, body } from 'express-validator';

export const crearCliente_DTO = [
    body("nombre").isString().trim().notEmpty().withMessage("Nombre no valido"),
    body("email").isEmail().trim().notEmpty().withMessage("Email invalido"),
    body("telefono").isString().trim().notEmpty().isLength({min: 10, max: 15}).withMessage("Telefono invalido"),
    body("fechaRegistro").isISO8601().toDate().withMessage("Fecha invalida, debe estar en formato YYYY-MM-DD"),
    body("activo").isBoolean().withMessage("Activo debe ser un valor true/false")
]

export const actualizarCliente_DTO = [
    param("nombre").isString().notEmpty().withMessage("El nombre en la URL no puede estar vacío"),
    body("nombre").optional().isString().trim().notEmpty().withMessage("Nombre no valido"),
    body("email").optional().isEmail().trim().notEmpty().withMessage("Email invalido"),
    body("telefono").optional().isString().trim().notEmpty().isLength({min: 10, max: 15}).withMessage("Telefono invalido"),
    body("fechaRegistro").optional().isISO8601().toDate().withMessage("Fecha invalida, debe estar en formato YYYY-MM-DD"),
    body("activo").optional().isBoolean().withMessage("Activo debe ser un valor true/false")
]