import express from 'express';
import semver from "semver"
import routeClientes from './routes/clientes.routes.js';
import routeRecetas from './routes/recetas.routes.js'; 
import "dotenv/config"
import database from './database/connectionDB.js';

const app = express();
app.use(express.json());
app.use("/clientes", routeClientes);
app.use("/recetas", routeRecetas);

app.get("/:version", (req, res) => {
    const clientVersion = req.params

    if (!clientVersion) {
        return res.status(400).json({error: "La versión especificada en la URL no es la correcta"})
    }

    const parsed = semver.coerce(clientVersion)?.version

    if (!parsed || !semver.valid(parsed)) {
        return res.status(400).json({error: "La versiòn recibida no es válida", versionRecibida: clientVersion, ejemploValido: ""})
    }

    const es_compatible = semver.satisfies(parsed, process.env.MIN_RANGE)

    if (es_compatible) {
        res.status(200).json({
            message: "Esta en la versión correcta",
            versionRecibida: parsed,
            requerido: process.env.apiversion
        })
    }

    return res.status(426).json({
        error: `La version ${parsed} no es compatible`,
        apiVersion: process.env.apiversion,
        requerido: process.env.MIN_RANGE
    })
})

database.realizarConexion().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})
