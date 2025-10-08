import database from "../database/connectionDB";

const COLECCION_CLIENTES = "clientes";

export async function obtenerClientes() {
    return await database.obtenerBD().collection(COLECCION_CLIENTES).find().toArray();
}

export async function obtenerCliente(id) {
    return await obtenerBD().collection(COLECCION_CLIENTES).findOne({id});
}