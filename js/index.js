import {cambiar_idioma, inicializar_pagina} from "./Traducciones.mjs";

window.onload = function() {
    inicializar_pagina();
    
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

    const seleccionar_idioma = document.getElementById('idioma');

    if (seleccionar_idioma) {
        seleccionar_idioma.addEventListener('change', function(event) {
            cambiar_idioma(event.target.value);
        });
    }
}