import {
    ComprobarApellido,
    ComprobarContraseña,
    ComprobarFoto,
    ComprobarLogin,
    ComprobarNombre
} from "./LoginFucniones.mjs"
import{ComprobarCorreo} from "./LoginFucniones.mjs";
import{ComprobarCVV} from "./LoginFucniones.mjs";
import{ComprobarNumeroTarjeta} from "./LoginFucniones.mjs";
import{RangoFecha} from "./FuncionesTipicas.mjs";
import {cambiar_idioma, inicializar_pagina} from "./Traducciones.mjs";


function EnviarDatos(){
    event.preventDefault();

    let nombre=  $("#datosNombre").val();
    let numeroTarjeta = $("#datosNumeroTarjeta").val();
    let correo = $("#datosCorreo").val();
    let nombreTitular = $("#datosNombreTitular").val();
    let CVV = $("#datosCVV").val();
    let login = $("#datosLogin").val();
    let caducidad = $("#datosCaducidad").val();
    let fechaInicio = new Date();
    let fechaFin = caducidad;
    if (ComprobarNombre(nombre) === false) {
        $("#textoConfirmar").text("Nombre incorrecto");
        console.log("Error: Nombre incorrecto");
    }
    else if (ComprobarCorreo(correo) === false) {
        $("#textoConfirmar").text("Correo incorrecto");
        console.log("Error: Correo incorrecto");
    }
    else if (ComprobarNumeroTarjeta(numeroTarjeta) === false) {
        $("#textoConfirmar").text("Numero de tarjeta incorrecto");
        console.log("Error: Numero de tarjeta incorrecto");
    }
    else if (ComprobarNombre(nombreTitular) === false) {
        $("#textoConfirmar").text("Nombre del titular incorrecto");
        console.log("Error: Nombre del titular incorrecto");
    }
    else if (RangoFecha(caducidad, fechaInicio, fechaFin) === false) {
        $("#textoConfirmar").text("Fecha incorrecta");
        console.log("Error: Fecha incorrecta");
    }
    else if (ComprobarCVV(CVV) === false) {
        $("#textoConfirmar").text("CVV incorrecto");
        console.log("Error: CVV incorrecto");
    }
    else {
        console.log("todo bien");
        $("#textoConfirmar").text("Compra Confirmada")
    }
}
function BorrarDatos(){
    event.preventDefault();
    console.log("gola");
    $("#datosNombre").val("");
    $("#datosCorreo").val("");
    $("#datosNumeroTarjeta").val("");
    $("#datosCaducidad").val("");
    $("#datosCVV").val("");
    $("#datosNombreTitular").val("");
    $("#datosCaducidad").val("")
}

$("#formularioEnviar").click(EnviarDatos);
$("#formularioBorrar").click(BorrarDatos);

window.onload = function(){
    inicializar_pagina();
    const seleccionar_idioma = document.getElementById('idioma');

    if (seleccionar_idioma) {
        seleccionar_idioma.addEventListener('change', function(event) {
            cambiar_idioma(event.target.value);
        });
    }

// 1. OBTENER LA CLAVE ÚNICA DE LA PÁGINA ACTUAL
// Esto será "reseñas_ParteC-noruega", "reseñas_ParteC-rumania", etc.
    const CLAVE_ALMACENAMIENTO = "resenas_" + window.location.pathname.split('/').pop().replace('.html', '');

    function enviar_resena(event) {
        event.preventDefault();

        // Obtener los datos del formulario (adaptado a tu HTML si es necesario)
        let titulo = document.getElementById("nombre_resena").value;
        let texto = document.getElementById("texto_resena").value;

        // Obtener el nombre de usuario logueado (necesario para la reseña)
        const usuarioLogueado = localStorage.getItem("usuario_logueado");
        let nombreUsuario = "Anónimo";
        if (usuarioLogueado) {
            try {
                const user = JSON.parse(usuarioLogueado);
                nombreUsuario = user.nombre || "Usuario"; // Usa el nombre guardado o 'Usuario'
            } catch (e) {
                console.error("Error al parsear el usuario logueado:", e);
            }
        }

        if (titulo.length < 5 || texto.length < 15) {
            alert("El título de la reseña debe tener al menos 5 caracteres y el texto 15.");
            return;
        }

        // 1. Cargar reseñas para ESTA página
        let resenas = localStorage.getItem(CLAVE_ALMACENAMIENTO);
        if (resenas == null) resenas = "[]";
        resenas = JSON.parse(resenas);

        // 2. Añadir la nueva reseña
        resenas.push({
            titulo: titulo,
            texto: texto,
            autor: nombreUsuario,
            fecha: new Date().toLocaleDateString('es-ES') // Añadir fecha
        });

        // 3. Guardar y limpiar formulario
        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(resenas));
        document.getElementById("nombre_resena").value = "";
        document.getElementById("texto_resena").value = "";

        // Recargar la lista de reseñas en lugar de toda la página
        mostrar_resenas();
    }

// Adaptación de ultimos_tips a mostrar_resenas
    function mostrar_resenas() {
        let resenas = localStorage.getItem(CLAVE_ALMACENAMIENTO);
        if (resenas == null) resenas = "[]";
        resenas = JSON.parse(resenas);

        // Seleccionamos el contenedor donde se mostrarán (ajusta el selector si es necesario)
        // Asumiremos que crearás un nuevo <div> con ID "contenedor_resenas"
        let contenedor_resenas = document.getElementById("contenedor_resenas");
        if (!contenedor_resenas) return;

        contenedor_resenas.innerHTML = ""; // Limpiar antes de mostrar

        // Muestra todas las reseñas, las más recientes al principio
        // Recorremos el array de atrás hacia adelante para ver las más nuevas primero
        for (let i = resenas.length - 1; i >= 0; i--) {
            const resena = resenas[i];

            let divResena = document.createElement("div");
            divResena.className = "resena-tarjeta"; // Para darle estilo CSS

            divResena.innerHTML = `
            <h4 class="resena-titulo">${resena.titulo}</h4>
            <p class="resena-meta">Por: <strong>${resena.autor}</strong> el ${resena.fecha}</p>
            <p class="resena-texto">${resena.texto}</p>
            <hr>
        `;
            contenedor_resenas.appendChild(divResena);
        }
    }


// Asignar el evento y mostrar las reseñas al cargar
    document.getElementById("enviar_resena").onclick = enviar_resena;
    mostrar_resenas(); // Llamar al inicio para cargar las existentes
}