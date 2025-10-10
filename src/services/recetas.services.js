// Importación de base de datos y ObjectId 
import database from "../database/connectionDB.js";
import { ObjectId } from "mongodb";

// Nombre de la colección
const COLECCION_RECETAS = "recetas";

// Función para obtener recetas
export async function obtenerRecetas() {

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_RECETAS);
    return await collection.find().toArray();
}

// Función para crear una receta
export async function crearReceta(datos) {

    // Se desestrucutran los datos
    const {id_cliente, nombre, descripcion, nivel, ingredientes} = datos
    
    // Se construye la receta
    const receta = {
        id_cliente: new ObjectId(id_cliente),
        nombre,
        descripcion,
        nivel,
        ingredientes
    }

    // Se realiza el guardado en base de datos
    const collection = await database.getCollection(COLECCION_RECETAS);
    await collection.insertOne(receta);
    return ({Message: "Receta creada con exito"})
}

// Función para obtener una receta por su nombre
export async function obtenerReceta(nombre) {

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_RECETAS);
    
    // Se captura como resultado la busqueda de la receta
    const receta = await collection.findOne({nombre: nombre});
    if (!receta) throw new Error("Receta no encontrada");
    return receta;
}

// Función para actualizar una receta
export async function actualizarReceta(nombre, datos) {

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se borran los datos para evitar pproblemas con MONGODB 
    delete datos._id;

    // Si los datos están
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

export async function agregarIngredientes(nombreReceta, nuevosIngredientes) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const resultado = await collection.updateOne(
        { nombre: nombreReceta },
        { $push: { ingredientes: { $each: nuevosIngredientes } } }
    );
    if (resultado.matchedCount === 0) throw new Error("Receta no encontrada para agregar ingredientes");
    return { message: "Ingredientes agregados con éxito" };
}

export async function verIngredientes(nombreReceta) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const receta = await collection.findOne({ nombre: nombreReceta });
    if (!receta) throw new Error("Receta no encontrada");
    return receta.ingredientes;
}

export async function eliminarIngrediente(nombreReceta, nombreIngrediente) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const resultado = await collection.updateOne(
        { nombre: nombreReceta },
        { $pull: { ingredientes: { nombre: nombreIngrediente } } }
    );
    if (resultado.matchedCount === 0) {
        throw new Error("Receta no encontrada");
    }
    if (resultado.modifiedCount === 0) {
        throw new Error("No se pudo eliminar el ingrediente. Verifique que la receta y el ingrediente existan.");
    }
    return { message: "Ingrediente eliminado con éxito" };
}

export async function buscarIngredientePorReceta(nombreReceta, nombreIngrediente) {
    const collection = await database.getCollection(COLECCION_RECETAS)
    const receta = await collection.findOne(
        { nombre: nombreReceta },
        { 
            projection: { 
                ingredientes: { $elemMatch: { nombre: nombreIngrediente } }
            } 
        }
    );
    if (!receta || !receta.ingredientes || receta.ingredientes.length === 0) {
        throw new Error("Ingrediente no encontrado en la receta especificada.");
    }
    return receta.ingredientes[0];
}

export async function buscarRecetasPorIngrediente(nombreIngrediente) {
    const collection = await database.getCollection(COLECCION_RECETAS);
    const recetas = await collection.find({ 'ingredientes.nombre': nombreIngrediente }).toArray();

    if (recetas.length === 0) {
        throw new Error(`No se encontraron recetas que contengan el ingrediente: ${nombreIngrediente}`);
    }
    return recetas;
}