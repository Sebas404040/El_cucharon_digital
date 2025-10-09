import database from "../database/connectionDB.js";

const COLECCION_CLIENTES = "clientes";

export async function crearCliente(datos) {
    const {nombre, email, telefono, fechaRegistro, activo} = datos
    const cliente = {
        nombre,
        email,
        telefono,
        fechaRegistro,
        activo
    }
    const collection = await database.getCollection(COLECCION_CLIENTES);
    await collection.insertOne(cliente);
    return {Message: "Cliente creado con exito"}
}

export async function obtenerClientes() {
    const collection = await database.getCollection(COLECCION_CLIENTES);
    return await collection.find().toArray();
}

export async function obtenerCliente(nombre) {
    const collection = await database.getCollection(COLECCION_CLIENTES);
    const cliente = await collection.findOne({nombre: nombre});
    if (!cliente) throw new Error("Cliente no encontrado");
    return cliente;
}

export async function actualizarCliente(nombre, datos) {
    const collection = await database.getCollection(COLECCION_CLIENTES);
    const resultado = await collection.updateOne({nombre: nombre}, {$set: datos});
    if(resultado.matchedCount === 0) throw new Error("Cliente no encontrado");
    return {Message: "Cliente actualizado con exito"}
}

export async function eliminarCliente(nombre) {
    const collection = await database.getCollection(COLECCION_CLIENTES);
    const resultado = await collection.deleteOne({nombre: nombre});
    if (resultado.deletedCount === 0) throw new Error("Cliente no encontrado");
    return {message: "Cliente eliminado con exito"};
}