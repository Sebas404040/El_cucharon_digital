import {Router} from 'express';

const router = Router();

import {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
} from "../services/clientes.services";

import { crearCliente_DTO, actualizarCliente_DTO } from '../DTOS/clientesDTO';

import { crearCliente_DTO } from '../DTOS/clientesDTO';
import { ValidationDTO } from '../middlewares/validationDTO';


router.post("/", crearCliente_DTO, ValidationDTO)

