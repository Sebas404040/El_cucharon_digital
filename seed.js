import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

// --- Configuración de la Base de Datos ---
// Se toman las mismas variables de entorno que usa tu aplicación
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;

// --- Datos para Poblar (Dataset) ---

// Creamos ObjectIds para mantener la consistencia entre colecciones
const cliente1Id = new ObjectId();
const cliente2Id = new ObjectId();
const cliente3Id = new ObjectId();

const clientes = [
  {
    _id: cliente1Id,
    nombre: "Ana García",
    email: "ana.garcia@example.com",
    telefono: "3101234567",
    fechaRegistro: new Date("2023-01-15T00:00:00.000Z"),
    activo: true
  },
  {
    _id: cliente2Id,
    nombre: "Carlos Rodríguez",
    email: "carlos.r@example.com",
    telefono: "3209876543",
    fechaRegistro: new Date("2023-03-22T00:00:00.000Z"),
    activo: true
  },
  {
    _id: cliente3Id,
    nombre: "Luisa Martínez",
    email: "luisa.m@example.com",
    telefono: "3005558899",
    fechaRegistro: new Date("2024-05-10T00:00:00.000Z"),
    activo: false
  }
];

const recetas = [
  {
    id_cliente: cliente1Id, // Relacionado con Ana García
    nombre: "Tacos al Pastor",
    descripcion: "Clásicos tacos mexicanos con carne de cerdo marinada, piña, cilantro y cebolla.",
    nivel: 4,
    ingredientes: [
      { nombre: "Carne de cerdo", cantidad: "500 gr" },
      { nombre: "Piña", cantidad: "1/2 unidad" },
      { nombre: "Cilantro", cantidad: "1 manojo" },
      { nombre: "Cebolla blanca", cantidad: "1 unidad" },
      { nombre: "Tortillas de maíz", cantidad: "12 unidades" }
    ]
  },
  {
    id_cliente: cliente2Id, // Relacionado con Carlos Rodríguez
    nombre: "Ceviche Peruano",
    descripcion: "Fresco y delicioso ceviche de pescado blanco marinado en jugo de limón.",
    nivel: 3,
    ingredientes: [
      { nombre: "Pescado blanco (Corvina)", cantidad: "400 gr" },
      { nombre: "Limón", cantidad: "10 unidades" },
      { nombre: "Cebolla morada", cantidad: "1 unidad" },
      { nombre: "Ají limo", cantidad: "1 unidad" },
      { nombre: "Cilantro", cantidad: "Al gusto" }
    ]
  },
  {
    id_cliente: cliente1Id, // Relacionado con Ana García
    nombre: "Lentejas de la Abuela",
    descripcion: "Un plato reconfortante y nutritivo, perfecto para un día frío.",
    nivel: 2,
    ingredientes: [
      { nombre: "Lentejas", cantidad: "500 gr" },
      { nombre: "Chorizo", cantidad: "2 unidades" },
      { nombre: "Papa", cantidad: "2 unidades" },
      { nombre: "Zanahoria", cantidad: "1 unidad" },
      { nombre: "Cebolla", cantidad: "1 unidad" }
    ]
  },
  {
    id_cliente: cliente3Id, // Relacionado con Luisa Martínez
    nombre: "Pasta Carbonara Auténtica",
    descripcion: "El tradicional plato romano con yema de huevo, queso Pecorino y guanciale.",
    nivel: 5,
    ingredientes: [
      { nombre: "Spaghetti", cantidad: "400 gr" },
      { nombre: "Guanciale", cantidad: "150 gr" },
      { nombre: "Yemas de huevo", cantidad: "4 unidades" },
      { nombre: "Queso Pecorino Romano", cantidad: "100 gr" },
      { nombre: "Pimienta negra", cantidad: "Al gusto" }
    ]
  },
  {
    id_cliente: cliente2Id, // Relacionado con Carlos Rodríguez
    nombre: "Ensalada César con Pollo",
    descripcion: "Una ensalada clásica y completa, ideal como plato único.",
    nivel: 2,
    ingredientes: [
      { nombre: "Lechuga romana", cantidad: "1 unidad" },
      { nombre: "Pechuga de pollo", cantidad: "200 gr" },
      { nombre: "Crutones", cantidad: "1 taza" },
      { nombre: "Queso parmesano", cantidad: "50 gr" },
      { nombre: "Aderezo César", cantidad: "Al gusto" }
    ]
  }
];


// --- Lógica del Script ---

async function seedDatabase() {
  const client = new MongoClient(URI);

  try {
    // 1. Conectar a la base de datos
    await client.connect();
    const db = client.db(DB_NAME);
    console.log(`Conectado a la base de datos: ${DB_NAME}`);

    // 2. Limpiar colecciones existentes
    console.log("Limpiando colecciones...");
    await db.collection('clientes').deleteMany({});
    await db.collection('recetas').deleteMany({});

    // 3. Insertar los nuevos datos
    console.log("Insertando datos de clientes...");
    await db.collection('clientes').insertMany(clientes);

    console.log("Insertando datos de recetas...");
    await db.collection('recetas').insertMany(recetas);

    console.log("\n¡Base de datos poblada con éxito! 🎉");
    console.log(`- ${clientes.length} clientes insertados.`);
    console.log(`- ${recetas.length} recetas insertadas.`);

  } catch (error) {
    console.error("Ha ocurrido un error durante el proceso:", error);
  } finally {
    // 4. Cerrar la conexión
    await client.close();
    console.log("\nConexión con la base de datos cerrada.");
  }
}

// Ejecutar la función principal
seedDatabase();
