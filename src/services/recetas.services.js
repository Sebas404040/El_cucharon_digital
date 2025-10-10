import database from "../database/connectionDB.js";
import { ObjectId } from "mongodb";

const COLECCION_RECETAS = "recetas";

export async function obtenerRecetas() {
    const collection = await database.getCollection(COLECCION_RECETAS);
    return await collection.find().toArray();
}

export async function crearReceta(datos) {
    const {id_cliente, nombre, descripcion, nivel, ingredientes} = datos
    const receta = {
        id_cliente: new ObjectId(id_cliente),
        nombre,
        descripcion,
        nivel,
        ingredientes
    }
    const collection = await database.getCollection(COLECCION_RECETAS);
    await collection.insertOne(receta);
    return ({Message: "Receta creada con exito"})
}

export async function obtenerReceta(nombre) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const receta = await collection.findOne({nombre: nombre});
    if (!receta) throw new Error("Receta no encontrada");
    return receta;
}

export async function actualizarReceta(nombre, datos) {
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Eliminar el campo _id del objeto de datos para evitar el error de campo inmutable.
    delete datos._id;

    // Si se está actualizando el id_cliente, también debe convertirse a ObjectId.
    if (datos.id_cliente) {
        datos.id_cliente = new ObjectId(datos.id_cliente);
    }
    const resultado = await collection.updateOne({nombre: nombre}, {$set: datos});
    if(resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return {Message: "Receta actualizada con exito"}
}

export async function eliminarReceta(nombre) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const resultado = await collection.deleteOne({nombre: nombre});
    if (resultado.deletedCount === 0) throw new Error("Receta no encontrada");
    return {message: "Receta eliminada con exito"}; 
}

export async function obtenerRecetasPorCliente(id_cliente) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const recetas = await collection.find({id_cliente: new ObjectId(id_cliente)}).toArray();
    if (recetas.length === 0) throw new Error("No se encontraron recetas para el cliente especificado");
    return recetas;
}