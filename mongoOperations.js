// Aqui importamos el módulo MongoClient de la biblioteca mongodb, que se usa para conectarse y realizar operaciones en una base de datos MongoDB
const { MongoClient } = require('mongodb');

//Aqui definimos una constante mydb que contiene el nombre de la base de datos que vamos a usar
const mydb = "EjercicioAPI";

// Aqui definimos la URL de conexión a la base de datos MongoDB. Aquí, la base de datos está alojada localmente en el puerto 27017
const url = "mongodb://127.0.0.1:27017/";

// Aqui definimos una función asíncrona llamada connectToMongo para conectarse a MongoDB.
async function connectToMongo() {
    // Creamos una nueva instancia de MongoClient usando la URL de conexión
    const client = new MongoClient(url);
    // Esperamos a que la conexión a MongoDB se establezca
    await client.connect();
    // Y retornamos la conexion a la constante client
    return client;
}

// Definimos una función asíncrona para crear la base de datos
async function crearBaseDeDatos() {
    // Esperamos a que se conecte con Mongo
    const client = await connectToMongo();
    // Obtenemos una referencia a la base de datos mydb
    const db = client.db(mydb);
    console.log(`Base de datos '${mydb}' creada o conectada.`);
    // Y cerramos la conexión al cliente de MongoDB
    await client.close();
}

// Definimos una función asíncrona para crear una conexion
async function crearColeccion(coleccion) {
    // Esperamos a que se conecte con Mongo
    const client = await connectToMongo();
    // Obtenemos una referencia a la base de datos mydb
    const db = client.db(mydb);
    // Creamos una nueva colección en la base de datos
    await db.createCollection(coleccion);
    console.log(`Colección '${coleccion}' creada.`);
    // Y cerramos la conexión al cliente de MongoDB
    await client.close();
}

// Definimos una función asíncrona para crear una nuevo registro
async function insertarDocumento(coleccion, documento) {
    // Esperamos a que se conecte con Mongo
    const client = await connectToMongo();
    // Obtenemos una referencia a la base de datos mydb
    const db = client.db(mydb);
    // Obtenemos una referencia a la coleccion especificada
    const collection = db.collection(coleccion);
    // Insertamos un documento en la coleccion
    const resultado = await collection.insertOne(documento);
    // Mostramos en consola el documento insertado
    console.log(`Documento insertado con ID: ${resultado.insertedId}`);
    // Y cerramos la conexión al cliente de MongoDB
    await client.close();
}


// Obtener datos del primer elemento dentro de una colección
async function obtenerPrimerElemento(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.findOne({});
        console.log(result.nombre);
        return result;
    } finally {
        await client.close();
    }
}

// Ver todos los elementos
async function verTodos(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find({}).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

// Query simple
async function querySimple(coleccion, query) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find(query).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

// Sort por un criterio (campo)
async function sortPorCampo(coleccion, campo, orden = 1) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find().sort({ [campo]: orden }).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}


//Borrar  
async function borrarDocumento(coleccion, filtro) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.deleteOne(filtro);
    console.log(`${resultado.deletedCount} documento(s) borrado(s).`);
    await client.close();
}


//Actualizar
async function actualizarDocumento(coleccion, filtro, actualizacion) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.updateOne(filtro, { $set: actualizacion });
    console.log(`${resultado.modifiedCount} documento(s) actualizado(s).`);
    await client.close();
}


module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
};