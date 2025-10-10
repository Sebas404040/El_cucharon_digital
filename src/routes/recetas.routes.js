import { Router } from "express";

const routeRecetas = Router();

import {
    crearReceta_controller,
    obtenerRecetas_controller,
    obtenerReceta_controller,
    actualizarReceta_controller,
    eliminarReceta_controller,
    obtenerRecetasPorCliente_controller
} from "../controllers/recetas.controller.js";

import { crearReceta_DTO, actualizarReceta_DTO } from "../DTOS/recetasDTO.js";
import { ValidationDTO } from "../middlewares/validationDTO.js";

routeRecetas.post("/", crearReceta_DTO, ValidationDTO, crearReceta_controller);
routeRecetas.get("/", obtenerRecetas_controller);
routeRecetas.get("/:nombre", obtenerReceta_controller);
routeRecetas.patch("/:nombre", actualizarReceta_DTO, ValidationDTO, actualizarReceta_controller);
routeRecetas.delete("/:nombre", eliminarReceta_controller);
routeRecetas.get("/cliente/:id_cliente", obtenerRecetasPorCliente_controller);

export default routeRecetas;