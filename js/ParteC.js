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