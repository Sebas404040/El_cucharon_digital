import {Router} from 'express';

const routeClientes = Router();

import {
    obtenerClientes_controller,
    obtenerCliente_controller,
    crearCliente_controller,
    actualizarCliente_controller,
    eliminarCliente_controller
} from '../controllers/clientes.controller.js';


import { crearCliente_DTO, actualizarCliente_DTO } from '../DTOS/clientesDTO.js';
import { ValidationDTO } from '../middlewares/validationDTO.js';

routeClientes.get('/', obtenerClientes_controller);
routeClientes.get('/:nombre', obtenerCliente_controller);
routeClientes.post('/', crearCliente_DTO, ValidationDTO, crearCliente_controller);
routeClientes.patch('/:nombre', actualizarCliente_DTO, ValidationDTO, actualizarCliente_controller);
routeClientes.delete('/:nombre', eliminarCliente_controller);

export default routeClientes;
