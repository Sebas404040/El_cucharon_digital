# 🥄 El Cucharón Digital: Tu API REST para Recetas Culinarias

Esta es una API REST robusta construida para funcionar como el backend central de una plataforma de recetas culinarias. El proyecto está diseñado para conectar a cocineros y amantes de la gastronomía, permitiendo a los usuarios registrarse, compartir sus creaciones y, lo más importante, encontrar la receta perfecta basada en lo que tienen a mano.

## 🎯 Objetivo Principal
El propósito de esta API es gestionar de manera eficiente toda la información relacionada con usuarios, recetas e ingredientes, ofreciendo funcionalidades clave a través de endpoints claros e intuitivos.

### Funcionalidades Clave:

- **Gestión de Usuarios**

- **Gestión de Recetas**

- **Gestión ingredientes**

## 🦾 Tecnologias utilizadas

- Node JS

- JavaScript

- MongoDB

- Express

### 📚 Librerias implementadas

La librerias que se utilizaron para el desarrollo fueron las siguientes:

#### 🗝️ Dotenv
Dotenv es una librería que carga variables de entorno desde un archivo simple de texto llamado .env a la configuración de tu aplicación (generalmente process.env).

Función principal: Permite almacenar de forma segura y centralizada la configuración que cambia entre entornos (como claves API, credenciales de bases de datos o el puerto del servidor) fuera del código fuente de la aplicación. Esto mejora la seguridad al evitar que secretos sensibles se suban a repositorios como Git.

#### 💾 MongoDB (como driver o librería cliente)
MongoDB es una base de datos de documentos NoSQL. Cuando hablamos de su librería, nos referimos al driver cliente que permite a una aplicación interactuar con la base de datos.

Función principal: Sirve como la interfaz para que tu aplicación pueda conectar, insertar, consultar, actualizar y eliminar (operaciones CRUD) documentos de datos en la base de datos MongoDB.

#### 🛡️ express-validator
express-validator es un conjunto de middlewares para el framework web Express.js que simplifica la validación y sanitización de los datos de entrada en una solicitud HTTP.

Función principal: Verifica que los datos enviados por el usuario (en el cuerpo, parámetros o queries de la solicitud) cumplan con reglas específicas (ej. que un campo sea un email válido o una contraseña tenga un mínimo de caracteres) y limpia los datos para prevenir inyecciones y otros ataques.

#### 🔢 semver (Semantic Versioning)
semver no es una librería en sí, sino una especificación (Versionado Semántico) y a menudo una librería que implementa sus reglas para comparar y gestionar versiones de software.

Función principal: Proporciona un conjunto estricto de reglas sobre cómo asignar y aumentar los números de versión (Mayor.Menor.Parche - ej. 1.2.3), permitiendo a los desarrolladores y gestores de paquetes entender el impacto de la actualización de una dependencia (si es un arreglo de errores no disruptivo, una nueva característica compatible, o un cambio que rompe la compatibilidad).

## ENDPOINTS implementados

El desarrollo de la API o aplicación se centró en la creación de una serie de endpoints (rutas de acceso HTTP) diseñados para manejar las operaciones completas de gestión (CRUD: Crear, Leer, Actualizar, Eliminar) para tres entidades principales del sistema: usuarios, recetas e ingredientes.

A continuación, se detalla la expansión de las funcionalidades implementadas por cada conjunto de endpoints:

## Crear cliente

**POST: localhost:4000/clientes**

JSON de req:

```json
{
    "nombre": "Joan Sebastian Gomez Serrano",
    "email": "hola@gmail.com",
    "telefono": "3052349000",
    "fechaRegistro": "2025-06-09T00:00:00.000Z",
    "activo": true
}
```

## Obtener todos los clientes

**GET: localhost:4000/clientes**

JSON de res:

```json
[
    {
        "_id": "68e84e586693c4ef142cbbf6",
        "nombre": "Joan Sebastian Gomez Serrano",
        "email": "hola@gmail.com",
        "telefono": "3052349000",
        "fechaRegistro": "2025-06-09T00:00:00.000Z",
        "activo": true
    },
    {
        "_id": "68e84fb46693c4ef142cbbf7",
        "nombre": "John Doe",
        "email": "JohnDoe@gmail.com",
        "telefono": "3012345678",
        "fechaRegistro": "2024-08-09T00:00:00.000Z",
        "activo": true
    },
    {
        "_id": "68e84fea6693c4ef142cbbf8",
        "nombre": "Johnatan Julian",
        "email": "Julian@gmail.com",
        "telefono": "3223456789",
        "fechaRegistro": "2025-01-16T00:00:00.000Z",
        "activo": false
    }
]
```

## Consultar un cliente

**localhost:4000/clientes/Joan Sebastian Gomez Serrano**

JSON de res:

```json
{
    "nombre": "Joan Sebastian Gomez Serrano",
    "email": "hola@gmail.com",
    "telefono": "3052349000",
    "fechaRegistro": "2025-06-09T00:00:00.000Z",
    "activo": true
}
```

## Actualizar un cliente

**localhost:4000/clientes/Joan Sebastian Gomez Serrano**

JSON de req:

```json
{
    "email": "joansebastiangs@gmail.com",
    "telefono": "3052349000",
    "fechaRegistro": "2025-06-09T00:00:00.000Z",
    "activo": false

```

JSON de res:

```json
{
    "Message": "Cliente actualizado con exito"
}
```

## Eliminar un cliente

[**localhost:4000/clientes/John](http://localhost:4000/clientes/John) Doe**

JSON de req:

```json
{
    "message": "Cliente eliminado con exito"
}
```

---

## Crear una receta

POST: localhost:4000/recetas

JSON de req:

```json
{
    "id_cliente": "68e84e586693c4ef142cbbf6",
    "nombre": "Postre de limón",
    "descripcion": "El mejor postre de limon de todos",
    "nivel": 3,
    "ingredientes": [
        { "nombre": "Crema de leche", "cantidad": "500 ml" },
        { "nombre": "Galletas", "cantidad": "20 und" },
        { "nombre": "limon", "cantidad": "4 unidades" }
    ]
}
```

JSON de res:

```json
{
    "Message": "Receta creada con exito"
}
```

## Consultar recetas

GET: localhost:4000/recetas

JSON de res:

```json
[
    {
        "_id": "68e87abd2939ae7830e7bd4e",
        "id_cliente": "68e84e586693c4ef142cbbf6",
        "nombre": "Postre de limón",
        "descripcion": "El mejor postre de limon de todos",
        "nivel": 3,
        "ingredientes": [
            {
                "nombre": "Crema de leche",
                "cantidad": "500 ml"
            },
            {
                "nombre": "Galletas",
                "cantidad": "20 und"
            },
            {
                "nombre": "limon",
                "cantidad": "4 unidades"
            }
        ]
    },
    {
        "_id": "68e87d332939ae7830e7bd4f",
        "id_cliente": "68e84fea6693c4ef142cbbf8",
        "nombre": "Pasta Carbonara Auténtica",
        "descripcion": "El tradicional plato romano con yema de huevo, queso Pecorino y guanciale.",
        "nivel": 4,
        "ingredientes": [
            {
                "nombre": "Spaghetti",
                "cantidad": "400 g"
            },
            {
                "nombre": "Guanciale o Panceta",
                "cantidad": "150 g"
            },
            {
                "nombre": "Yemas de huevo",
                "cantidad": "4 unidades"
            },
            {
                "nombre": "Queso Pecorino Romano",
                "cantidad": "80 g (rallado)"
            },
            {
                "nombre": "Pimienta negra",
                "cantidad": "Al gusto"
            }
        ]
    }
]
```

## Consultar una receta

GET: localhost:4000/recetas/Pasta Carbonara Auténtica

JSON de res:

```json
{
    "_id": "68e87d332939ae7830e7bd4f",
    "id_cliente": "68e84fea6693c4ef142cbbf8",
    "nombre": "Pasta Carbonara Auténtica",
    "descripcion": "El tradicional plato romano con yema de huevo, queso Pecorino y guanciale.",
    "nivel": 4,
    "ingredientes": [
        {
            "nombre": "Spaghetti",
            "cantidad": "400 g"
        },
        {
            "nombre": "Guanciale o Panceta",
            "cantidad": "150 g"
        },
        {
            "nombre": "Yemas de huevo",
            "cantidad": "4 unidades"
        },
        {
            "nombre": "Queso Pecorino Romano",
            "cantidad": "80 g (rallado)"
        },
        {
            "nombre": "Pimienta negra",
            "cantidad": "Al gusto"
        }
    ]
}
```

## Actualizar una receta

PATCH: localhost:4000/recetas/Pasta Carbonara Auténtica

JSON de req:

```json
{
    "_id": "68e87d332939ae7830e7bd4f",
    "id_cliente": "68e84fea6693c4ef142cbbf8",
    "nombre": "Pasta Carbonara Auténtica",
    "descripcion": "El tradicional plato romano con yema de huevo, queso Pecorino y guanciale.",
    "nivel": 4,
    "ingredientes": [
        {
            "nombre": "Spaghetti",
            "cantidad": "500 g"
        },
        {
            "nombre": "Guanciale o Panceta",
            "cantidad": "250 g"
        },
        {
            "nombre": "Yemas de huevo",
            "cantidad": "5 unidades"
        },
        {
            "nombre": "Queso Pecorino Romano",
            "cantidad": "100 g (rallado)"
        },
        {
            "nombre": "Pimienta negra",
            "cantidad": "Al gusto"
        }
    ]
}
```

JSON de res:

```json
{
    "Message": "Receta actualizada con exito"
}
```

## Eliminar una receta

DELETE: localhost:4000/recetas/Pasta Carbonara Auténtica

JSON de res:

```json
{
    "message": "Receta eliminada con exito"
}
```

## Mostrar clientes que tienen recetas

GET: localhost:4000/recetas/cliente/68e84fb46693c4ef142cbbf7

JSON de res:

```json
[
    {
        "_id": "68e88835b560729fb025ac12",
        "id_cliente": "68e84fb46693c4ef142cbbf7",
        "nombre": "Brownies de Chocolate Oscuro",
        "descripcion": "Brownies densos y fudgy con un intenso sabor a cacao, perfectos con helado.",
        "nivel": 2,
        "ingredientes": [
            {
                "nombre": "Chocolate negro",
                "cantidad": "200 g"
            },
            {
                "nombre": "Mantequilla",
                "cantidad": "120 g"
            },
            {
                "nombre": "Azúcar",
                "cantidad": "150 g"
            },
            {
                "nombre": "Huevos",
                "cantidad": "3 unidades"
            },
            {
                "nombre": "Harina",
                "cantidad": "100 g"
            }
        ]
    },
    {
        "_id": "68e88878b560729fb025ac13",
        "id_cliente": "68e84fb46693c4ef142cbbf7",
        "nombre": "Ensalada César Clásica",
        "descripcion": "Una ensalada fresca y crujiente, ideal como acompañamiento o plato ligero.",
        "nivel": 1,
        "ingredientes": [
            {
                "nombre": "Lechuga romana",
                "cantidad": "1 unidad grande"
            },
            {
                "nombre": "Pollo cocido (en tiras)",
                "cantidad": "200 g"
            },
            {
                "nombre": "Crutones",
                "cantidad": "50 g"
            },
            {
                "nombre": "Queso parmesano",
                "cantidad": "30 g (rallado)"
            },
            {
                "nombre": "Aderezo César",
                "cantidad": "100 ml"
            }
        ]
    }
]
```

## Agregar ingredientes a una receta existente

PATCH: localhost:4000/recetas/Brownies de Chocolate Oscuro/ingredientes

JSON de req:

```json
[
    {
        "nombre": "Leche condensada",
        "cantidad": "1 lata"
    },
    {
        "nombre": "Ralladura de limón",
        "cantidad": "1 cucharada"
    }
]
```

JSON de res: 

```json
{
    "message": "Ingredientes agregados con éxito"
}
```

## Ver ingredientes de una receta

GET: localhost:4000/recetas/Brownies de Chocolate Oscuro/ingredientes

JSON de res:

```json
[
    {
        "nombre": "Chocolate negro",
        "cantidad": "200 g"
    },
    {
        "nombre": "Mantequilla",
        "cantidad": "120 g"
    },
    {
        "nombre": "Azúcar",
        "cantidad": "150 g"
    },
    {
        "nombre": "Huevos",
        "cantidad": "3 unidades"
    },
    {
        "nombre": "Harina",
        "cantidad": "100 g"
    },
    {
        "nombre": "Leche condensada",
        "cantidad": "1 lata"
    },
    {
        "nombre": "Ralladura de limón",
        "cantidad": "1 cucharada"
    }
]
```

## Eliminar ingredientes de una receta

GET: localhost:4000/recetas/Brownies de Chocolate Oscuro/ingredientes

JSON de res:

```json
{
    "message": "Ingrediente eliminado con éxito"
}
```