const express = require("express"); //importa express.
const path = require("path"); // Ayuda a trabajar con rutas de archivos y directorios.
const api = require("./src/api"); //Se importa el modulo api, es quien contiene la lógica para manejar los datos.

const app = express(); // Se crea una instancia que permite definir las rutas.
const port = 3000; //Puerto para las solicitudes.

app.use(express.static(path.join(__dirname, "public"))); //Se establece para que el navegador pueda acceder a los archvios html,css y js desde la carpeta public, que tiene el front.

// Ruta para ver Todos los libros.
app.get("/api/libro/todos", (req, res) => {
  res.json(api.verTodos());
});

// Ruta para ver libros por su ISBN (id).
app.get("/api/libro/:isbn", (req, res) => {
  const libro = api.verLibroPorIsbn(parseInt(req.params.isbn));
  res.json(libro || { mensaje: "Libro no encontrado"});
});

// Ruta para pedir prestado un libro.
app.post("/api/libro/prestar/:isbn",(req,res)=>{
  const libro = api.prestarLibro(parseInt(req.params.isbn));
  res.json(libro)
})

// Ruta para devolver un libro.
app.post("/api/libro/devolver/:isbn",(req,res)=>{
  const libro = api.devolver(parseInt(req.params.isbn));
  res.json(libro ? libro : { mensaje: `No se pudo devolver el libro, ya que no esta prestado`})
})

app.get("/api/libros/disponibles", (req,res)=>{
  const librosDisponibles = api.verDisponibles();
  res.json(librosDisponibles ? librosDisponibles : { mensaje: `No hay libros disponibles`})
})

app.get("/api/libros/prestados", (req,res)=>{
  const librosPrestados = api.verPrestados();
  res.json(librosPrestados ? librosPrestados : { mensaje: `No hay libros prestados`})
})

//Muestra el puerto donde se inicia el servidor.
app.listen(port, ()=>{
  console.log(`Servidor back-end iniciado http://localhost:${port}`);
})