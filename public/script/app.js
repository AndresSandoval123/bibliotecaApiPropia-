/* Fetch para ver todos los libros con el endpoint de la api ya creado */
async function obtenerTodosLosLibros() {
  try {
      const response = await fetch('/api/libro/todos');
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const libros = await response.json();
      /* console.log(libros); */
      mostrarLibros(libros);
  } catch (error) {
      console.error('Error:', error);
  }
}
obtenerTodosLosLibros();

function mostrarLibros(libros){
  let todos = document.getElementById("todos");
  for(i in libros){
    todos.innerHTML += `
      <div class="todos">
      <img src="${libros[i].caratula}"></img>
      <p>${libros[i].ISBN}</p>
      </div>`
  }
}
/* Div para la respuesta */
let rtaOpciones = document.getElementById("rtaOpciones");
/* Prestar libro */
let btnPrestar = document.getElementById("btnPrestar");
btnPrestar.addEventListener("click", async ()=>{
  let codigo = document.getElementById("codigo").value

  try{
    const response = await fetch(`/api/libro/prestar/${codigo}`, {
      method: "POST"
    });
    const libro = await response.json();
    rtaOpciones.innerHTML = `<p>${libro}</p>`
  }catch (error) {
    console.error('Error:', error);
  }
  document.getElementById("codigo").value ="";
})

/* Devolver libro */
let btnDevolver = document.getElementById("btnDevolver");
btnDevolver.addEventListener("click", async ()=>{
  let codgDevolver = document.getElementById("codgDevolver").value
  try{
    const response = await fetch(`/api/libro/devolver/${codgDevolver}`, {
      method: "POST"
    });
    const libro = await response.json();
    rtaOpciones.innerHTML = `<p>${libro}</p>`
  }catch (error) {
    console.error('Error:', error);
  }
  document.getElementById("codgDevolver").value ="";
})



/* Div para la respuesta */

let rtaConsulta = document.getElementById("rtaConsulta");

/* Consultar libros prestados */
let btnLiPrestados = document.getElementById("btnLiPrestados");
btnLiPrestados.addEventListener("click", async ()=>{
  rtaConsulta.innerHTML = '';
  try{
    const response = await fetch(`/api/libros/prestados`);

    const libro = await response.json();
    for( i in libro){
      rtaConsulta.innerHTML += `
      <p>Codigo: ${libro[i].ISBN}</p> 
      <p>Libro: ${libro[i].titulo}</p>
      <br>
      `
    }
  }catch (error) {
    console.error('Error:', error);
  }
})

/* Consultar libros prestados */
let btnDisponibles = document.getElementById("btnDisponibles");
btnDisponibles.addEventListener("click", async ()=>{
  rtaConsulta.innerHTML = '';
  try{
    const response = await fetch(`/api/libros/disponibles`);

    const libro = await response.json();
    for( i in libro){
      rtaConsulta.innerHTML += `
      <p>Codigo: ${libro[i].ISBN}</p> 
      <p>Libro: ${libro[i].titulo}</p>
      <br>
      `
    }
  }catch (error) {
    console.error('Error:', error);
  }
})

