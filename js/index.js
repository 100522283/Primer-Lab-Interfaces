import {cambiar_idioma, inicializar_pagina} from "./Traducciones.mjs";

window.onload = function() {
    inicializar_pagina();
    
    // Cargar tamaño de fuente guardado
    const tamanoGuardado = localStorage.getItem('tamano_fuente') || '16px';
    document.documentElement.style.setProperty('--font-size', tamanoGuardado);
    const seleccionar_tamano = document.getElementById('tamano');
    if (seleccionar_tamano) {
        seleccionar_tamano.value = tamanoGuardado;
        seleccionar_tamano.addEventListener('change', function(event) {
            document.documentElement.style.setProperty('--font-size', event.target.value);
            localStorage.setItem('tamano_fuente', event.target.value);
        });
    }
    
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

    // Modo daltónico
    const selectDaltónico = document.getElementById('daltónico-select');
    if (selectDaltónico) {
        selectDaltónico.addEventListener('change', function() {
            const modo = event.target.value;
            // Remover clases anteriores
            document.body.classList.remove('daltónico', 'protanopia', 'deuteranopia', 'tritanopia', 'acromatopsia');
            if (modo !== 'normal') {
                document.body.classList.add(modo);
            }
            localStorage.setItem('modo_daltónico', modo);
        });
        // Cargar estado guardado
        const daltónicoGuardado = localStorage.getItem('modo_daltónico') || 'normal';
        selectDaltónico.value = daltónicoGuardado;
        if (daltónicoGuardado !== 'normal') {
            document.body.classList.add(daltónicoGuardado);
        }
    }
}