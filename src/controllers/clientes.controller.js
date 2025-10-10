// Importación de funciones necesarias para la creación y operación de controladores
import { crearCliente, obtenerClientes, obtenerCliente, actualizarCliente, eliminarCliente} from "../services/clientes.services.js";

/*
CREACIÓN DE CONTROLADORES 
*/

// Controlador para la obtención de clientes
export async function obtenerClientes_controller(req, res) {
    try {
        const clientes = await obtenerClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Controlador para la obtención de un cliente
export async function obtenerCliente_controller(req, res) {
   try {
        const nombre = req.params.nombre;
        const cliente = await obtenerCliente(nombre);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
}

// Controlador para la creación de un cliente
export async function crearCliente_controller(req, res) {
    try {
        const datos = req.body;
        const cliente = await crearCliente(datos);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Controlador para la actualización
export async function actualizarCliente_controller(req, res) {
    try {
        const nombre = req.params.nombre;
        const datos = req.body;
        const cliente = await actualizarCliente(nombre, datos);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// Controlador para la eliminación de un cliente
export async function eliminarCliente_controller(req, res) {
    try {
        const nombre = req.params.nombre;
        const cliente = await eliminarCliente(nombre);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}