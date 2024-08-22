const { text } = require("body-parser");
const fs = require("fs"); //importa el modulo fs de node.js, proporciona funciones para intectural con los acchivos como leer y escribrir.
const path = require("path"); // Ayuda a trabajar con rutas de archivos y directorios.

//Metodo o funcion que nos muestra los libros que estan en el archivo json.
function cargarLibros(){
  const datosJson = path.join(__dirname,"../data/libros.json");
  const datos = fs.readFileSync(datosJson, "utf8"); //permite leer el contenido del archivo JSON y procesarlo adecuadamente.
  return JSON.parse(datos)
}

//Metodo para guardar los libros
function guardarLibros(libros) {
  const datosJson = path.join(__dirname, '../data/libros.json');
  fs.writeFileSync(datosJson, JSON.stringify(libros, null, 2), 'utf8');
}

// Metodo para ver todos los libros
function verTodos(){
  return cargarLibros();
}


// Metodo para ver los libros por isbn (id)
function verLibroPorIsbn(isbn){
  const libros = cargarLibros();
  const libroEncontrado = libros.filter(libro => libro.ISBN === isbn) //Filto por el isbn o id del libro
  if(libroEncontrado.length === 0){
    return "Libro no existe"
  }else{
    return libroEncontrado
  }
}

// Metodo para buscar los libros por categorias
function categotia(text){
  const libros = cargarLibros();
  return libros.filter(libro => libro.categoria === text )
}

// Metodo para prestar libro
function prestarLibro(isbn){
  const libros = cargarLibros();
  const libro = libros.find(libro => libro.ISBN === isbn);

  if(libro && !libro.prestado){
    libro.prestado = true;
    guardarLibros(libros)
    return `Libro: ${libro.titulo} <br> Codigo ${libro.ISBN} <br> Prestamo Ok <br> Cuidado 👍🏻`;
  }else{
    return `EL libro ya se presto o no existe 😅`;
  }
}

// Metodo para devolver libro
function devolver(isbn){
  const libros = cargarLibros();
  const libro = libros.find(libro => libro.ISBN === isbn);

  if(libro && libro.prestado){
    libro.prestado = false;
    guardarLibros(libros)
    return `Libro: ${libro.titulo} <br> Codigo ${libro.ISBN} <br> Devuelto <br> Gracias 😁`;
  }else{
    return "El libro no se encuentra prestado"
  }
}

// Metodo para ver los libros disponibles
function verDisponibles(){
  const libros = cargarLibros();
  return libros.filter(libro => !libro.prestado);
  
}

// Metodo para ver los libros prestados
function verPrestados(){
  const libros = cargarLibros();
  return libros.filter(libro => libro.prestado);
}

// Exportar las funciones para su uso
module.exports ={
  verTodos,
  verLibroPorIsbn,
  categotia,
  prestarLibro,
  devolver,
  verDisponibles,
  verPrestados
};

