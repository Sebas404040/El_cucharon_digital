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

## 🔗 ENDPOINTS implementados

El desarrollo de la API o aplicación se centró en la creación de una serie de endpoints (rutas de acceso HTTP) diseñados para manejar las operaciones completas de gestión (CRUD: Crear, Leer, Actualizar, Eliminar) para tres entidades principales del sistema: usuarios, recetas e ingredientes.

A continuación, se detalla la expansión de las funcionalidades implementadas por cada conjunto de endpoints:

### Crear cliente

Este endpoint se utiliza para registrar un nuevo cliente en el sistema.

**Método:** POST

**Ruta:** localhost:4000/clientes

**Funcionalidad:**

Este es un endpoint de creación (parte de las operaciones CRUD). Recibe un cuerpo de solicitud (Request Body) en formato JSON con la información del nuevo cliente y la persiste (guarda) en la base de datos de la aplicación.


**JSON de req:**

```json
{
    "nombre": "Joan Sebastian Gomez Serrano",
    "email": "hola@gmail.com",
    "telefono": "3052349000",
    "fechaRegistro": "2025-06-09T00:00:00.000Z",
    "activo": true
}
```

<hr>

### Obtener todos los clientes

Este endpoint se utiliza para recuperar la lista completa de todos los clientes registrados en el sistema.

**Método:** GET (Solicitud de lectura de datos)

**Ruta:** localhost:4000/clientes

**Funcionalidad**:

Este es un endpoint de lectura masiva. Cuando se realiza una solicitud GET a esta ruta, el servidor consulta la base de datos y devuelve un array JSON que contiene los datos de todos los clientes almacenados, sin necesidad de parámetros de entrada.

**JSON de res:**

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

<hr>

### Consultar un cliente

Este endpoint está diseñado para recuperar y mostrar los detalles completos de un único cliente utilizando su nombre como identificador.

**Método:** GET (Solo lectura de datos).

**Ruta:** localhost:4000/clientes/:nombre

**Funcionalidad**:

El servidor procesa la solicitud tomando el nombre completo del cliente de la URL (Joan Sebastian Gomez Serrano) y busca el registro coincidente en la base de datos. Si se encuentra un cliente con ese nombre, el sistema devuelve todos sus datos en formato JSON.

```json
{
    "nombre": "Joan Sebastian Gomez Serrano",
    "email": "hola@gmail.com",
    "telefono": "3052349000",
    "fechaRegistro": "2025-06-09T00:00:00.000Z",
    "activo": true
}
```

<hr>

### Actualizar un cliente

**Método** PUT o PATCH (El uso de PUT o PATCH depende de si actualiza el recurso completo o solo algunos campos, pero ambos se usan para modificación de datos).

**Ruta:** localhost:4000/clientes/:nombre

**Funcionalidad:**

El sistema identifica al cliente mediante el nombre completo proporcionado en la URL (Joan Sebastian Gomez Serrano). Luego, toma los campos proporcionados en el cuerpo de la solicitud (Request Body) y sobrescribe o modifica esos valores en el registro de la base de datos para el cliente encontrado. En el ejemplo, se está cambiando el email y el estado de la cuenta a activo: false.

**JSON de req:**

```json
{
    "email": "joansebastiangs@gmail.com",
    "telefono": "3052349000",
    "fechaRegistro": "2025-06-09T00:00:00.000Z",
    "activo": false
}
```

**JSON de res:**

```json
{
    "Message": "Cliente actualizado con exito"
}
```

<hr>

### Eliminar un cliente

**Método** DELETE (Método estándar para eliminar recursos).

**Ruta:** localhost:4000/clientes/:nombre

**Funcionalidad**:

El sistema procesa la solicitud tomando el nombre completo del cliente de la URL (John Doe). Luego, busca el registro coincidente en la base de datos y lo elimina. Tras una eliminación exitosa, el servidor devuelve un mensaje de confirmación.

**JSON de req:**

```json
{
    "message": "Cliente eliminado con exito"
}
```

---

### Crear una receta

Este endpoint se utiliza para registrar una nueva receta en el sistema y asociarla a un cliente existente.

**Método:** POST (Método estándar para crear un nuevo recurso).

**Ruta:** localhost:4000/recetas

**Funcionalidad**:

Este es el endpoint de creación para el recurso de Recetas. Recibe un objeto JSON en el cuerpo de la solicitud con todos los detalles necesarios para la receta, incluyendo una referencia al cliente que la está creando (id_cliente). El servidor procesa estos datos, realiza las validaciones necesarias y guarda la nueva receta en la base de datos.

**JSON de req:**

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

**JSON de res:**

```json
{
    "Message": "Receta creada con exito"
}
```

<hr>

### Consultar recetas

Este endpoint se utiliza para recuperar la colección completa de todas las recetas disponibles en el sistema.

**Método:** GET (Solo lectura de datos, no modifica el servidor).

**Ruta:** localhost:4000/recetas

**Funcionalidad**:

El sistema procesa la solicitud GET a esta ruta y realiza una consulta a la base de datos para obtener todos los registros de recetas. Devuelve un array JSON donde cada elemento contiene la información detallada de una receta, incluyendo sus ingredientes. Este endpoint sirve como el principal punto de acceso al catálogo de recetas.

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

<hr>

### Consultar una receta

**GET: localhost:4000/recetas/Pasta Carbonara Auténtica**

**JSON de res:**

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

<hr>

### Actualizar una receta

Este endpoint se utiliza para modificar los datos principales de una receta específica que ya está registrada en el sistema.

**Método:** PATCH (Indica una actualización parcial de los recursos).

**Ruta:** localhost:4000/recetas/:nombre

**Funcionalidad**:

El sistema identifica la receta a modificar mediante el nombre proporcionado en la URL (Pasta Carbonara Auténtica). Luego, toma el objeto JSON del cuerpo de la solicitud (Request Body) y aplica los cambios a los campos correspondientes en el registro de la receta en la base de datos. En el ejemplo, se están actualizando varios detalles de la receta, incluyendo las cantidades de los ingredientes (por ejemplo, Spaghetti cambia de 400g a 500g).

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

**JSON de res:**

```json
{
    "Message": "Receta actualizada con exito"
}
```

<hr>

### Eliminar una receta

Este endpoint se utiliza para remover definitivamente una receta específica del catálogo de la aplicación.

**Método:** DELETE (Método estándar para la eliminación de recursos).

**Ruta:** localhost:4000/recetas/:nombre

**Funcionalidad:**
El sistema procesa la solicitud DELETE e identifica la receta a través del nombre proporcionado en la URL (Pasta Carbonara Auténtica). Una vez localizada en la base de datos, el registro de la receta es eliminado permanentemente. Si la operación es exitosa, el servidor confirma la acción con un mensaje.

```json
{
    "message": "Receta eliminada con exito"
}
```

<hr>

### Mostrar clientes que tienen recetas

Este endpoint se utiliza para recuperar todas las recetas que han sido creadas y publicadas por un cliente específico, identificado mediante su ID.

**Método:** GET (Solicitud de lectura de datos, no modifica el servidor).

**Ruta:** localhost:4000/recetas/cliente/:id_cliente

**Funcionalidad:**

El sistema realiza una consulta filtrada a la colección de recetas, utilizando el id_cliente proporcionado en la URL como el criterio de búsqueda. El servidor devuelve un array JSON que contiene todas las recetas donde el campo id_cliente coincide con el valor de la URL (68e84fb46693c4ef142cbbf7 en el ejemplo), permitiendo así ver el catálogo de un autor particular.

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

<hr>

### Agregar ingredientes a una receta existente

Este endpoint se utiliza para consultar y obtener la lista completa de todos los ingredientes asociados a una receta específica.

**Método:** GET (Método estándar para la lectura de datos).

**Ruta:** localhost:4000/recetas/:nombre/ingredientes

**Funcionalidad**:

El sistema identifica la receta utilizando su nombre en la URL (Brownies de Chocolate Oscuro). Luego, consulta la base de datos para extraer y devolver el array completo de ingredientes que componen dicha receta, incluyendo las cantidades especificadas.

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

**JSON de res:** 

```json
{
    "message": "Ingredientes agregados con éxito"
}
```

<hr>

### Ver ingredientes de una receta

Este endpoint se utiliza para consultar y recuperar exclusivamente la lista de ingredientes asociados a una receta específica, sin devolver el resto de los detalles de la receta (descripción, nivel, etc.).

**Método:** GET (Lectura de datos).

**Ruta:** localhost:4000/recetas/:nombre/ingredientes

**Funcionalidad:**

El sistema identifica la receta deseada a través del nombre proporcionado en la URL (Brownies de Chocolate Oscuro). Luego, realiza una consulta a la base de datos para extraer únicamente el campo de ingredientes de ese registro de receta. El resultado es un array JSON que lista cada ingrediente junto con su cantidad requerida.

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

<hr>

### Eliminar ingredientes de una receta

Este endpoint se utiliza para remover uno o más ingredientes específicos de la lista de ingredientes de una receta existente.

**Método HTTP:** (Asumiendo) DELETE (El método GET que proporcionaste no es estándar para esta acción).

**Ruta:** localhost:4000/recetas/:nombre/ingredientes

**Funcionalidad:**

El sistema identifica la receta mediante el nombre en la URL (Brownies de Chocolate Oscuro). Luego, basándose en la información que se espera en el cuerpo de la solicitud (aunque no se proporcionó, probablemente contendría el nombre o ID del ingrediente a eliminar), el sistema retira dicho ingrediente de la lista anidada dentro de la receta en la base de datos.

**JSON de res:**

```json
{
    "message": "Ingrediente eliminado con éxito"
}
```

## 🧑‍🦱 Autor

- **Joan Sebastián Gómez Serrano**