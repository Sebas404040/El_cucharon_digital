// Importación de Router
import {Router} from 'express';

// Se instancia una ruta
const routeClientes = Router();

// Importación de controladores
import {
    obtenerClientes_controller,
    obtenerCliente_controller,
    crearCliente_controller,
    actualizarCliente_controller,
    eliminarCliente_controller
} from '../controllers/clientes.controller.js';

// Importación de DTOS
import { crearCliente_DTO, actualizarCliente_DTO } from '../DTOS/clientesDTO.js';

// Imortación del validador
import { ValidationDTO } from '../middlewares/validationDTO.js';

// Importación de la ruta de clientes
routeClientes.get('/', obtenerClientes_controller);
routeClientes.get('/:nombre', obtenerCliente_controller);
routeClientes.post('/', crearCliente_DTO, ValidationDTO, crearCliente_controller);
routeClientes.patch('/:nombre', actualizarCliente_DTO, ValidationDTO, actualizarCliente_controller);
routeClientes.delete('/:nombre', eliminarCliente_controller);

// Exportación de la ruta
export default routeClientes;
