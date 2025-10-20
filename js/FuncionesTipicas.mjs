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
function GuardarDatosLogin(nombre, apellidos, correo, contraseña, login){
    let nuevosDatos = {nombre: nombre, apellidos: apellidos, correo: correo, contraseña: contraseña, login: login};
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

}
export{RangoFecha};
export {GuardarDatosLogin};