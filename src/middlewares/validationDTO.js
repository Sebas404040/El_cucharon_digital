import { validationResult } from "express-validator";

export function ValidationDTO(req, res, next) {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array()})
    }
    next();
}