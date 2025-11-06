function RangoFecha(fecha, inicio, fin){
    // esta funcion comprueba que una fecha esta dentro de un rango, se pueden insertar strings o de tipo objeto date
    fecha = new Date(fecha);
    inicio = new Date(inicio);
    fin = new Date(fin);
    console.log(fecha);
    console.log(inicio);
    console.log(fin);
    if ( fecha >= inicio && fecha <= fin){
        return true;
    }
    else{
        return false;
    }
}
function GuardarDatosLogin(nombre, apellidos, correo, contraseña, login, foto){
    let nuevosDatos = {nombre: nombre, apellidos: apellidos, correo: correo, contraseña: contraseña, login: login, foto: foto};
    let DatosGuardados = localStorage.getItem("DatosUsuarios");
    if ( DatosGuardados == null) {
        console.log("vacio")
        DatosGuardados = [];
    }
    else{
        DatosGuardados = JSON.parse(DatosGuardados);
    }
    DatosGuardados.push(nuevosDatos);
    let DatosGuardadosStr = JSON.stringify(DatosGuardados);
    console.log(DatosGuardados);
    localStorage.setItem("DatosUsuarios", DatosGuardadosStr);
    localStorage.setItem("usuario_logueado", JSON.stringify(nuevosDatos))

}

//Convierte la foto a base64
function convertirFoto(foto) {
    return new Promise((resolve, reject) => {
        if (!foto) {
            resolve("");
            return;
        }

        let reader = new FileReader();

        reader.onload = function(e) {
            resolve(e.target.result);
        };

        reader.onerror = function() {
            reject("Error al leer la foto");
        };

        reader.readAsDataURL(foto);
    });
}


export{RangoFecha};
export {GuardarDatosLogin};
export{convertirFoto}
