import database from "../database/connectionDB";

const COLECCION_CLIENTES = "clientes";

export async function crearCliente(datos) {
    const {nombre, email, telefono, fechaRegistro, activo} = datos
    const jugador = {
        nombre,
        email,
        telefono,
        fechaRegistro,
        activo
    }
    await database.obtenerBD().collection(COLECCION_CLIENTES).insertOne(jugador);
    return {Message: "Cliente creado con exito"}
}

export async function obtenerClientes() {
    return await database.obtenerBD().collection(COLECCION_CLIENTES).find().toArray();
}

export async function obtenerCliente(nombre) {
    const newId = await obtenerBD().collection(COLECCION_CLIENTES).findOne({nombre}, {_id: 1}).id;
    return await obtenerBD().collection(COLECCION_CLIENTES).findOne({newId});
}

export async function actualizarCliente(id, datos) {
    const {nombre, email, telefono, fechaRegistro, activo} = datos
    const resultado = await database.obtenerBD().collection(COLECCION_CLIENTES).updateOne({id}, {$set: {datos}});
    if(resultado.matchedCount === 0) throw new Error("Jugador no encontrado!!!");
    return {Message: "Jugador actualizado con exito"}
}

export async function eliminarCliente(id) {
    const resultado = await obtenerBD().collection(COLECCION_CLIENTES).deleteOne({id});
    if (resultado.deletedCount === 0) throw new Error("Jugador no encontrado!!!");
    return {message: "Jugador eliminado!!!"};
}