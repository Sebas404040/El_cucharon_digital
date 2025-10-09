import express from 'express';
import routeClientes from './routes/clientes.routes.js';
import "dotenv/config"
import database from './database/connectionDB.js';

const app = express();
app.use(express.json());

app.use("/clientes", routeClientes);

database.realizarConexion().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})
