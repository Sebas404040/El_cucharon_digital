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

    // se captura en resultado
    const resultado = await collection.updateOne({nombre: nombre}, {$set: datos});

    // Si se modificó 
    if(resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return {Message: "Receta actualizada con exito"}
}

// Función para eliminar una receta
export async function eliminarReceta(nombre) {

    // Se obtiene la colección 
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se captura el resultado tras la eliminaciòn
    const resultado = await collection.deleteOne({nombre: nombre});

    // Si no hubo una eliminaciòn se lanza un error
    if (resultado.deletedCount === 0) throw new Error("Receta no encontrada");
    return {message: "Receta eliminada con exito"}; 
}

// Función ara obtener recetas por cliente
export async function obtenerRecetasPorCliente(id_cliente) {

    // Se obtiene la colección 
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se obtienen las recetas
    const recetas = await collection.find({id_cliente: new ObjectId(id_cliente)}).toArray();

    // si no se obtienen recetas se lanza un error 
    if (recetas.length === 0) throw new Error("No se encontraron recetas para el cliente especificado");
    return recetas;
}

// Función ara agregar ingredientes
export async function agregarIngredientes(nombreReceta, nuevosIngredientes) {

    // Se obtienen las colecciones
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se obtiene el resultado al haber realizado la actualización
    const resultado = await collection.updateOne(

        // Mediante el operador $push se agrega el ingrediente
        { nombre: nombreReceta },
        { $push: { ingredientes: { $each: nuevosIngredientes } } }
    );

    // Si se realizó la actualización se lanza un error
    if (resultado.matchedCount === 0) throw new Error("Receta no encontrada para agregar ingredientes");
    return { message: "Ingredientes agregados con éxito" };
}

// Función para ver ingredientes
export async function verIngredientes(nombreReceta) {

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se obtiene una receta en base a la receta
    const receta = await collection.findOne({ nombre: nombreReceta });

    // Si la receta no se encuentra se lanza un error
    if (!receta) throw new Error("Receta no encontrada");
    return receta.ingredientes;
}

// Función para eliminar un ingrediente
export async function eliminarIngrediente(nombreReceta, nombreIngrediente) {

    // Se obtiene la colección 
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se obtiene el resultado tras la actualización
    const resultado = await collection.updateOne(

        // Se busca el nombre de la receta y mediante el operador $pull se elimina el ingrediente
        { nombre: nombreReceta },
        { $pull: { ingredientes: { nombre: nombreIngrediente } } }
    );

    // Si la receta no se encuentra se lanza un error
    if (resultado.matchedCount === 0) {
        throw new Error("Receta no encontrada");
    }

    // Si en el resultado no se modifica nada se lanza un error
    if (resultado.modifiedCount === 0) {
        throw new Error("No se pudo eliminar el ingrediente. Verifique que la receta y el ingrediente existan.");
    }
    return { message: "Ingrediente eliminado con éxito" };
}

// Función para buscar un ingrediente por receta 
export async function buscarIngredientePorReceta(nombreReceta, nombreIngrediente) {

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_RECETAS)

    // Se obtiene la receta tras la consulta
    const receta = await collection.findOne(

        // Se busca la receta y se proyectan sus ingredientes
        { nombre: nombreReceta },
        { 
            projection: { 
                ingredientes: { $elemMatch: { nombre: nombreIngrediente } }
            } 
        }
    );

    // Si no se encuentra la receta o los ingredientes
    if (!receta || !receta.ingredientes || receta.ingredientes.length === 0) {
        throw new Error("Ingrediente no encontrado en la receta especificada.");
    }
    return receta.ingredientes[0];
}

// Función ara buscar recetas por ingrediente
export async function buscarRecetasPorIngrediente(nombreIngrediente) {

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_RECETAS);

    // Se obtienen las recetas tras buscar las recetas or ingrediente
    const recetas = await collection.find({ 'ingredientes.nombre': nombreIngrediente }).toArray();

    // Si no se encuentran recetas se lanza un error
    if (recetas.length === 0) {
        throw new Error(`No se encontraron recetas que contengan el ingrediente: ${nombreIngrediente}`);
    }
    return recetas;
}