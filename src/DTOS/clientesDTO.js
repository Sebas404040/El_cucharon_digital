import { param, body } from 'express-validator';

export const crearCliente_DTO = [
    body("nombre").isString().trim().notEmpty().withMessage("Nombre no valido"),
    body("email").isEmail().trim().notEmpty().withMessage("Email invalido"),
    body("telefono").isInt({min: 1000000000}).notEmpty().trim().withMessage("Telefono invalido"),
    body("fechaRegistro").isDate().notEmpty.trim().withMessage("Fecha invalida"),
    body("activo").isBoolean().notEmpty().trim().withMessage("Activo debe ser un valor True/False")
]

export const actualizarCliente_DTO = [
    param("id").isInt({min: 1}).notEmpty().withMessage("ID de creación no valido"),
    body("nombre").optional().isString().trim().notEmpty().withMessage("Nombre no valido"),
    body("email").optional().isDate().notEmpty.trim().withMessage("Fehca invalida"),
    body("telefono").optional().isInt({min: 1000000000}).notEmpty.trim().withMessage("Fehca invalida"),
    body("fechaRegistro").optional().isDate().notEmpty.trim().withMessage("Fecha invalida"),
    body("activo").optional().isBoolean().notEmpty.trim().withMessage("Activo debe ser un valor True/False")
]