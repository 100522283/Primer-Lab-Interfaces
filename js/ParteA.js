import{ComprobarNombre}from"./LoginFucniones.mjs"
import{ComprobarApellido} from "./LoginFucniones.mjs";
import{ComprobarLogin}from"./LoginFucniones.mjs";
import{ComprobarContraseña} from "./LoginFucniones.mjs";
import{ComprobarCorreo} from "./LoginFucniones.mjs";
import{ComprobarFoto} from "./LoginFucniones.mjs";
import{GuardarDatosLogin} from "./FuncionesTipicas.mjs";
import{convertirFoto} from "./FuncionesTipicas.mjs";


let politica = false;
function AceptarPolitica(){
    //event.preventDefault();
    if (politica === true){
        politica = false;
    }
    else{
        politica = true;
    }
}
async function EnviarDatos() {
    event.preventDefault();
    let nombre=  $("#datosNombre").val();
    let apellidos = $("#datosApellidos").val();
    let correo = $("#datosCorreo").val();
    let correoConfirmar = $("#datosCorreoConfirmar").val();
    let foto = $("#foto").val()
    let foto_archivo = document.getElementById("foto").files[0];
    let contraseña = $("#datosContraseña").val();
    let login = $("#datosLogin").val();

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
        console.log("Todos los datos son correctos");
        $("#textoConfirmar").text("Todo Correcto")


        // Convertimos la foto a base64 para poder guardarla en local storage
        if (foto_archivo) {
            try {
                foto = await convertirFoto(foto_archivo);
            } catch (error) {
                $("#textoConfirmar").text("Error con la foto");
                return;
            }
            GuardarDatosLogin(nombre, apellidos, correo, contraseña, login, foto);
            window.location.href = "ParteB.html";

        }
    }

}

$("#formularioGuardar").click(EnviarDatos)
$("#datosPolitica").click(AceptarPolitica)
