// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListener();

// Funciones
function eventListener() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando se recarga la página o es cargado el documento HTML
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        crearHTML();
        
    });
}

function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    // Validación
    if(tweet === '') {
        mostrarError('¡Imposible! Tweet vacío.');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet // Es igual a tweet: tweet (texto)
    }

    // Añadir al arreglo los tweets
    tweets = [...tweets, tweetObj];
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensajes de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertando el [P] en el DOM
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            // Agregar un botón de eliminar
            const btnDel = document.createElement('A');
            btnDel.classList.add('borrar-tweet');
            btnDel.textContent = 'X';

            // Añadir la función de eliminar
            btnDel.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('LI');
            // Añadiendo texto
            li.innerHTML = tweet.tweet;

            // Asignando boton de eliminar
            li.appendChild(btnDel);

            // Agregándolo al HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id ); // Excepto el cual dimos clic y se reasigna
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}