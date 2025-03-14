// Require es como la importacion de react. Aqui importamos varias funciones de un archivo llamado mongoOperations.js. Estas funciones permiten interactuar con una base de datos MongoDB. Con crearBaseDeDatos creamos la nueva base de datos, con crearColeccion creamos una nueva coleccion en la base de datos y con insertarDocumento creamos un nuevo registro en una coleccion
const {
  crearBaseDeDatos,
  crearColeccion,
  insertarDocumento,
} = require('./mongoOperations');
// Aqui hacemos la importacion al nodulo Express que es una infraestructura web para Node.js.Facilita la creación de servidores y la gestión de rutas.
const express = require('express');
// Aqui  creamos una instancia de una aplicación Express. Esta instancia se utilizará para definir rutas y manejar solicitudes HTTP.
const app = express();

// Middleware que permite manejar datos codificados en URL (como los enviados desde un formulario HTML).
// Un middleware es un concepto utilizado en desarrollo de software, especialmente en el contexto de servidores y aplicaciones web. Esencialmente, el middleware es un software que se coloca en el "medio" entre una solicitud de un cliente y la respuesta del servidor. Su función principal es realizar alguna forma de procesamiento antes de que la solicitud llegue al controlador final que maneja la respuesta.
app.use(express.urlencoded({ extended: true }));
// Middleware que permite manejar datos en formato JSON. Esto es útil para recibir datos JSON en el cuerpo de las solicitudes HTTP.
app.use(express.json());

// Aqui definimos una ruta ger para la url raiz '/'. rep es el objeto de solicitud (request) y resp el objeto de respuesta (response)
app.get('/', (req, res) => {
  // Aqui envia como respuesta de nuestra direccion url a la que llamamos poniendo dos barras bajas y dirname y despues /index.html
  res.sendFile(__dirname + '/index.html');
});

// Aqui definimos una ruta post para la url raiz '/', utilizamos una función asincrona para manejar operaciones que tardan en completarse y le pasamos como parametros la solicitud de peticion y la respuesta
app.post('/', async (req, res) => {
  // Llamamos a la funcion que crea la base de datos y esperamos a que se complete
  await crearBaseDeDatos();
  // Llamamos a la funcion que crea la coleccion llamada en este caso "Usuarios" y esperamos que se complete
  await crearColeccion("Usuarios");
  // Y llamamos a la funcion de insertar registro que va insertar los datos de first_name que se encuentra en el name del input del formulario que esta en index.html, si le damos otro valor a ese name tenemos que llamar con el valor de name; y lo mismo con el resto de datos
  await insertarDocumento('Usuarios', { nombre: req.body.first_name, apellido: req.body.last_name, email:req.body.email});
  //console.log('First Name:', req.body.first_name, '\nLast Name: ', req.body.last_name, '\nEmail: ', req.body.email);

  // Esto hace que se pinte en el navegador el texto indicado entre " " y los datos en string del json que contiene los parametros que el usuario a ingresado en el body de la pagina y que se han guardado en la base de datos
  res.send("Insertados en la tabla Usuarios los siguientes datos: " +JSON.stringify(req.body));
});

// Aqui se inicia el servidor y hace que la aplicación escuche en el puerto 3000 para recibir solicitudes HTTP.
app.listen(3000);

// Conclusion: Este código crea un servidor web usando Express y define dos rutas (GET y POST) para interactuar con una base de datos MongoDB.

// La ruta GET (/) envía un archivo index.html como respuesta.

// La ruta POST (/) realiza varias operaciones con la base de datos: crea una base de datos, crea una colección "Usuarios", e inserta un nuevo documento en esa colección utilizando los datos recibidos en el cuerpo de la solicitud. Finalmente, envía una respuesta con los datos insertados.