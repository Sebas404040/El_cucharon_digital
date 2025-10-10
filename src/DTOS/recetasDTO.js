// Ipmortación de librerias
import { param, body } from 'express-validator';

/*
CREACIÓN DE DTOS (Data Transfer Object) 
*/

// CrearReceta DTO
export const crearReceta_DTO = [ 
    body("id_cliente").isMongoId().withMessage("ID de cliente no válido"),
    body("nombre").isString().trim().notEmpty().withMessage("El nombre de la receta no es válido"),
    body("descripcion").isString().trim().notEmpty().withMessage("La descripción no es válida"),
    body("nivel").isInt({min: 1, max: 5}).withMessage("El nivel debe ser un número entre 1 y 5"),
    body("ingredientes").isArray({ min: 1 }).withMessage("Debe proporcionar al menos un ingrediente"),
    body("ingredientes.*.nombre").isString().trim().notEmpty().withMessage("El nombre del ingrediente no es válido"),
    body("ingredientes.*.cantidad").isString().trim().notEmpty().withMessage("La cantidad del ingrediente no es válida")
];

// ActualizarReceta DTO
export const actualizarReceta_DTO = [
    param("nombre").isString().notEmpty().withMessage("El nombre de la receta en la URL no es válido"),
    body("descripcion").optional().isString().trim().notEmpty().withMessage("La descripción no es válida"),
    body("nivel").optional().isInt({min: 1, max: 5}).withMessage("El nivel debe ser un número entre 1 y 5"),
    body("ingredientes").optional().isArray({ min: 1 }).withMessage("Debe proporcionar al menos un ingrediente"),
    body("ingredientes.*.nombre").optional().isString().trim().notEmpty().withMessage("El nombre del ingrediente no es válido"),
    body("ingredientes.*.cantidad").optional().isString().trim().notEmpty().withMessage("La cantidad del ingrediente no es válida")
];

// AgregarIngredientes DTO
export const agregarIngredientes_DTO = [
    param("nombre").isString().notEmpty().withMessage("El nombre de la receta en la URL no es válido"),
    // Valida que el cuerpo de la petición sea un array con al menos un objeto
    body().isArray({ min: 1 }).withMessage("El cuerpo de la petición debe ser un array de ingredientes"),
    body("*.nombre").isString().trim().notEmpty().withMessage("El nombre del ingrediente no es válido"),
    body("*.cantidad").isString().trim().notEmpty().withMessage("La cantidad del ingrediente no es válida")
];
