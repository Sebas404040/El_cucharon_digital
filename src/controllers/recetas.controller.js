import { crearReceta, obtenerRecetas, obtenerReceta, actualizarReceta, eliminarReceta, obtenerRecetasPorCliente} from "../services/recetas.services.js";

export async function crearReceta_controller(req, res) {
    try {
        const datos = req.body
        const receta = await crearReceta(datos);
        res.status(201).json(receta);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export async function obtenerRecetas_controller(req, res) {
    try {
        const recetas = await obtenerRecetas()
        res.status(200).json(recetas)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function obtenerReceta_controller(req, res) {
    try {
        const nombre = req.params.nombre;
        const receta = await obtenerReceta(nombre);
        res.status(200).json(receta);
    } catch (error) {
        if (error.message === "Receta no encontrada") {
            res.status(404).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}

export async function actualizarReceta_controller(req, res) {
    try {
        const nombre = req.params.nombre
        const datos = req.body
        const receta = await actualizarReceta(nombre, datos)
        res.status(200).json(receta)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export async function eliminarReceta_controller(req, res) {
    try {
        const nombre = req.params.nombre
        const receta = await eliminarReceta(nombre)
        res.status(200).json(receta)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export async function obtenerRecetasPorCliente_controller(req, res) {
    try {
        const id_cliente = req.params.id_cliente
        const recetas = await obtenerRecetasPorCliente(id_cliente)
        res.status(200).json(recetas)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}