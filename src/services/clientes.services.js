// Importación de base de datos
import database from "../database/connectionDB.js";
import { ObjectId } from "mongodb";

// Nombre de la colección
const COLECCION_CLIENTES = "clientes";
const COLECCION_RECETAS = "recetas";

// Función para la creación de un cliente
export async function crearCliente(datos) {

    // Desestructuración de datos 
    const {nombre, email, telefono, fechaRegistro, activo} = datos

    // Construcción del cliente
    const cliente = {
        nombre,
        email,
        telefono,
        fechaRegistro,
        activo
    }

    // Se obtiene la colección
    const collection = await database.getCollection(COLECCION_CLIENTES);
    
    // Se inserta el cliente en la colección de clientes 
    await collection.insertOne(cliente);
    return {Message: "Cliente creado con exito"}
}

// Función para obtener todos los clientes
export async function obtenerClientes() {

    // Se obtiene la colleción
    const collection = await database.getCollection(COLECCION_CLIENTES);

    // Se retorna la colección con todos sus documentos
    return await collection.find().toArray();
}

// Función para obtener un cliente por su nombre
export async function obtenerCliente(nombre) {

    // Se obtiene la colección 
    const collection = await database.getCollection(COLECCION_CLIENTES);

    // Se consulta el cliente por su nombre
    const cliente = await collection.findOne({nombre: nombre});

    // Si el cliente no existe se lanza un error
    if (!cliente) throw new Error("Cliente no encontrado");

    // Se regresa el cliente
    return cliente;
}


// Función ppara actualizar un cliente
export async function actualizarCliente(nombre, datos) {

    // Se obtiene la colecci;ón
    const collection = await database.getCollection(COLECCION_CLIENTES);

    // Se captura el resultado al realizar la actualización
    const resultado = await collection.updateOne({nombre: nombre}, {$set: datos});

    // Si no se modificó nada se lanza un error
    if(resultado.matchedCount === 0) throw new Error("Cliente no encontrado");
    return {Message: "Cliente actualizado con exito"}
}

// Función para eliminar un cliente
export async function eliminarCliente(nombre) {
    // Se obtiene el cliente de MongoDB para poder iniciar una sesión de transacción
    const mongoClient = database.getMongoClient();
    const session = mongoClient.startSession();

    try {
        // Inicio de la transacción
        session.startTransaction();

        // Se obtiene el ID del cliente a eliminar
        const clientesCollection = await database.getCollection(COLECCION_CLIENTES);
        const cliente = await clientesCollection.findOne({ nombre }, { session });

        // Si no hay cliente se lanza error
        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }

        // Se eliminan todas las recetas relacionadas al cliente
        const recetasCollection = await database.getCollection(COLECCION_RECETAS);
        const recetasEliminadas = await recetasCollection.deleteMany({ id_cliente: cliente._id }, { session });

        // Se elimina el cliente 
        const resultadoCliente = await clientesCollection.deleteOne({ _id: cliente._id }, { session });

        // Si no hubo eliminación se lanza error
        if (resultadoCliente.deletedCount === 0) throw new Error("No se pudo eliminar al cliente.");

        // Si todo fue exitoso, se confirma la transacción
        await session.commitTransaction();


        return {Message: "Cliente eliminado con exito"}
    } catch (error) {

        // Si algo falla, se revierten todos los cambios
        await session.abortTransaction();

        // Se relanza el error para que el controlador lo capture
        throw error; 
    } finally {
        await session.endSession(); // Siempre cerramos la sesión al final
    }
}