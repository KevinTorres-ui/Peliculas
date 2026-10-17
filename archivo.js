const inputPelicula = document.getElementById('inputPelicula');
const btnBuscar = document.getElementById('btnBuscar');
const pError = document.getElementById('pError');

const resNombre = document.getElementById('txtNombre');
const resAño = document.getElementById('txtAño');
const resResena = document.getElementById('txtResena');
const resActores = document.getElementById('txtActores');
const imgPoster = document.getElementById('imgPoster');
const seccionResultado = document.getElementById('seccionResultado');

async function peticion() {
    const valorUser = inputPelicula.value.trim();

    if (valorUser === "") {
        mostrarError('* No se ingresó el título', 3000);
        return;
    }

    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(valorUser)}&plot=full&apikey=30063268`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            mostrarData(data);
        } else {
            mostrarError('* Película no encontrada', 3000);
        }

    } catch (error) {
        mostrarError('* Error de conexión', 3000);
    }
}

function mostrarData(data) {
    pError.textContent = ''; 
    seccionResultado.style.display = 'block';

    resNombre.textContent = data.Title;
    resAño.textContent = data.Year;
    resResena.textContent = data.Plot;
    resActores.textContent = data.Actors;
    imgPoster.src = data.Poster;
}

function mostrarError(mensaje, tiempo) {
    pError.textContent = mensaje;
    seccionResultado.style.display = 'none';

    setTimeout(() => {
        pError.textContent = '';
    }, tiempo);
}

btnBuscar.addEventListener('click', peticion);