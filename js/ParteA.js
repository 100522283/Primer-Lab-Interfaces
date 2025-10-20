import{ComprobarNombre}from"./LoginFucniones.mjs"
import{ComprobarApellido} from "./LoginFucniones.mjs";
import{ComprobarLogin}from"./LoginFucniones.mjs";
import{ComprobarContraseña} from "./LoginFucniones.mjs";
import{ComprobarCorreo} from "./LoginFucniones.mjs";
import{ComprobarFoto} from "./LoginFucniones.mjs";
import{RangoFecha} from "./FuncionesTipicas.mjs";
import{GuardarDatosLogin} from "./FuncionesTipicas.mjs";


let politica = false;
function AceptarPolitica(){
    event.preventDefault();
    if (politica === true){
        politica = false;
    }
    else{
        politica = true;
    }
}
function EnviarDatos() {
    event.preventDefault();
    let nombre=  $("#datosNombre").val();
    let apellidos = $("#datosApellidos").val();
    let correo = $("#datosCorreo").val();
    let correoConfirmar = $("#datosCorreoConfirmar").val();
    let foto = $("#foto").val()
    let contraseña = $("#datosContraseña").val();
    let login = $("#datosLogin").val();
    let cumple = $("#datosCumpleaños").val();
    let fechaInicio = "01-01-1995";
    let fechaFin = new Date();

    if (ComprobarNombre(nombre) === false) {
        $("#textoConfirmar").text("Nombre incorrecto")
        console.log("Error: Nombre incorrecto")
    }
    else if (ComprobarApellido(apellidos) === false) {
        $("#textoConfirmar").text("Apellido incorrecto")
        console.log("Error: Apellido incorrecto");
    }
    else if (ComprobarCorreo(correo) === false) {
        $("#textoConfirmar").text("Correo incorrecto")
        console.log("Error: Correo incorrecto");
    }
    else if(correoConfirmar !== correo){
        $("#textoConfirmar").text("Correos diferentes")
        console.log("Error: Correos diferentes");
    }
    else if(RangoFecha(cumple,fechaInicio,fechaFin) === false){
        $("#textoConfirmar").text("Fecha fuera de rango")
        console.log("Error: Fecha fuera de rango");
    }
    else if (ComprobarLogin(login) === false) {
        $("#textoConfirmar").text("Login incorrecto");
        console.log("Error: Login incorrecto");
    }
    else if (ComprobarContraseña(contraseña) === false) {
        $("#textoConfirmar").text("Contraseña incorrecta")
        console.log("Error: Contraseña incorrecta");
    }
    else if (ComprobarFoto(foto) === false) {
        $("#textoConfirmar").text("Foto Incorrecta")
        console.log("Error: Foto incorrecta");
    }
    else if (politica === false) {
        $("#textoConfirmar").text("Politica no aceptada")
        console.log("Error: Política no aceptada");
    }
    else {
        console.log("✅ Todos los datos son correctos");
        $("#textoConfirmar").text("Todo Correcto")
        GuardarDatosLogin(nombre,apellidos,correo,contraseña,login);
        window.location.href = "ParteB.html";

    }


}

$("#formularioGuardar").click(EnviarDatos)
$("#datosPolitica").click(AceptarPolitica)
