// Para iniciar sesión la funcion lee los inputs y los compara con los
// datos de local storage para ver si el usuario existe o no
function iniciar_sesion() {
    event.preventDefault()
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("contrasena").value;
    let usuarios = localStorage.getItem("DatosUsuarios");

    if (usuarios === null) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    usuarios = JSON.parse(usuarios);
    let usuario_encontrado = false;
    let i = 0;
    while (i < usuarios.length && usuario_encontrado === false) {
        if (usuarios[i].login === usuario && usuarios[i].contraseña === password) {
            localStorage.setItem("usuario_logueado", JSON.stringify(usuarios[i]));
            usuario_encontrado = true;
        }
        i += 1
    }

    if (usuario_encontrado) {
        window.location.href = "ParteB.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

window.onload = function() {
    document.getElementById("login").onclick = iniciar_sesion;
    // Para el carrusel vamos ocultando todos los packs menos el que tiene
    // el indice actual. El indice cambia al pulsar las flechas o cada 2
    // segundos, lo que pase antes.
    const packs = document.querySelectorAll(".pack_carrusel");
    const flecha_izq = document.getElementById("flecha_izq");
    const flecha_der = document.getElementById("flecha_der");
    let indice = 0;
    let temporizador;

    function enseñar_pack() {
        packs.forEach((pack) => {
            pack.classList.add('oculto');
        });
        packs[indice].classList.remove('oculto');
    }

    function siguiente() {
        indice = indice + 1;
        if (indice >= packs.length) {
            indice = 0;
        }
        enseñar_pack();
    }

    function empezar_temporizador() {
        temporizador = setInterval(siguiente, 2000);
    }

    flecha_der.onclick = function() {
        siguiente();
        clearInterval(temporizador);
        empezar_temporizador();
    };

    flecha_izq.onclick = function() {
        indice = indice - 1;
        if (indice < 0) {
            indice = packs.length - 1;
        }
        enseñar_pack();
        clearInterval(temporizador);
        empezar_temporizador();
    };

    enseñar_pack();
    empezar_temporizador();
}