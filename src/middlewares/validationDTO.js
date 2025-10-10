// Importación de la libreria express-validator
import { validationResult } from "express-validator";

// Función para la validación de los DTO
export function ValidationDTO(req, res, next) {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array()})
    }
    next();
}