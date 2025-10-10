// Importación de Router
import { Router } from "express";

// Se instancia una ruta
const routeRecetas = Router();

// Importación de controladores
import {
    crearReceta_controller,
    obtenerRecetas_controller,
    obtenerReceta_controller,
    actualizarReceta_controller,
    eliminarReceta_controller,
    obtenerRecetasPorCliente_controller,
    agregarIngredientes_controller,
    verIngredientes_controller,
    eliminarIngrediente_controller,
    buscarIngredientePorReceta_controller,
    buscarRecetasPorIngrediente_controller
} from "../controllers/recetas.controller.js";

// Importación de DTOS
import { crearReceta_DTO, actualizarReceta_DTO, agregarIngredientes_DTO } from "../DTOS/recetasDTO.js";

// Imortación del validador
import { ValidationDTO } from "../middlewares/validationDTO.js";

// Importación de la ruta de clientes
routeRecetas.post("/", crearReceta_DTO, ValidationDTO, crearReceta_controller);
routeRecetas.get("/", obtenerRecetas_controller);
routeRecetas.get("/:nombre", obtenerReceta_controller);
routeRecetas.patch("/:nombre", actualizarReceta_DTO, ValidationDTO, actualizarReceta_controller);
routeRecetas.delete("/:nombre", eliminarReceta_controller);
routeRecetas.patch("/:nombre/ingredientes", agregarIngredientes_DTO, ValidationDTO, agregarIngredientes_controller);
routeRecetas.get("/cliente/:id_cliente", obtenerRecetasPorCliente_controller);
routeRecetas.get("/:nombre/ingredientes", verIngredientes_controller);
routeRecetas.delete("/:nombre/ingredientes/:nombreIngrediente", eliminarIngrediente_controller);
routeRecetas.get("/:nombre/ingredientes/:nombreIngrediente", buscarIngredientePorReceta_controller);
routeRecetas.get("/ingrediente/:nombreIngrediente", buscarRecetasPorIngrediente_controller);

// Exportación de la ruta
export default routeRecetas;