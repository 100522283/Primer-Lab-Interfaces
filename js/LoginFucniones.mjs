//las siguente funciones has sido hechas sin saber que se podia usar regex
 function ComprobarNombre(nombre) {
    if (nombre.length <= 3){
        return false;
    }
        return true;
}
function ComprobarApellido(apellido) {
    let longitud = apellido.length;
    let letra = "";
    let numCaracteres = 0;
    let espacioEncontrado = false;
    for(let i = 0; i < longitud; i++){
        letra = apellido.charCodeAt(i);
        if(letra == 32){ // El 32 representa el espacio
            if (numCaracteres < 3){ // si este apellido es menso de 3 caracteres returnamos falso
                return false;
            }
            else{
                espacioEncontrado = true;
                numCaracteres = 0;
            }
        }
        numCaracteres += 1;
    }
    if (espacioEncontrado === false || numCaracteres <= 3){ // si solo hay una palabra o la ultima es menor que 3returnamos falso
        return false;
    }
    return true;
}

 function ComprobarCorreo(correo){
    let longitud = correo.length;
    let letra = "";
    let numCaracteres = 0;
    let arrobaEncontrada = false;
    let puntoEncontrado = false;
    for(let i = 0; i < longitud; i++){
        letra = correo.charCodeAt(i);
        if(letra === 64){ // numero para el @

            if (numCaracteres < 3 || arrobaEncontrada === true){ // si el nombre son menos de 3 caracteres o ya habia una @ returnamos falso
                return false;
            }
            arrobaEncontrada = true;
            numCaracteres = 0;
        }
        if(letra === 46){ //numero para el .
            if (numCaracteres < 3 || puntoEncontrado === true){ // si el dominio son menos de 3 o ya habia un punto returnamos falso
                return false;
            }
            puntoEncontrado = true;
            numCaracteres = 0;
        }
        numCaracteres += 1;
    }
    if ( numCaracteres < 3 || arrobaEncontrada === false || puntoEncontrado === false){ // si el dominio es menor que 3 o no hay ni arroba o punto returnamos falso
        return false;
    }
    return true;
}

 function ComprobarLogin(login){
    if (login.length < 5){
        return false;
    }
        return true;
}

 function ComprobarContraseña(contraseña){
    let longitud = contraseña.length;
    if (longitud <= 8){ // no se si es minimo o igual
        return false;
    }
    let letra = "";
    let mayusculaEncontrada = false;
    let minusculaEncontrada = false;
    let numerosTotales = 0;
    let caracterEspecialEncontrado = false;
    for(let i = 0; i < longitud; i++){
        letra = contraseña.charCodeAt(i);
        console.log(letra);
        if(letra >= 48 && letra <= 57){ //sumamos un uno si encontramos un numero 0-9
            numerosTotales += 1;
            console.log("numero encontrado");
        }
        if((letra >= 65 && letra <= 90) || letra === 209){ // miramos si hya mayuscula incluyendo Ñ
            console.log("mayusculaEncontrado");
            mayusculaEncontrada = true;
        }
        if((letra >= 97 && letra <= 122) || letra === 241){ // miramos si hay minusucla incluyendo ñ
            console.log("minuscula encontrada");
            minusculaEncontrada = true;
        }
        if((letra >= 32 && letra <= 47) ||
            (letra >= 58 && letra <= 64) ||
            (letra >= 91 && letra <= 96) ||
            (letra >= 123 && letra <= 126)){ // todos los codigos especiales
            console.log("caracterEspecialEncontrado");
            caracterEspecialEncontrado = true;
        }
    }
    console.log(numerosTotales);
    if( numerosTotales < 2 || caracterEspecialEncontrado === false ||
        minusculaEncontrada === false || mayusculaEncontrada === false){
        console.log("mala contraseña");
        return false;
    }
     console.log("buena contraseña");
    return true;
}
function ComprobarFoto(foto){
    const regex = /\.(png|webp|jpe?g)$/i; // esta funcion ha salido de chatgpt pq el profesor nos dejaba
    return regex.test(foto.trim());
}
function ComprobarNumeroTarjeta(numero){
    let longitud = String(numero).length;
    if (longitud === 13 || longitud === 15 || longitud === 16 || longitud === 19){
        return true;
    }
    return false;
}
function ComprobarCVV(CVV){
    let codigo = String(CVV);
    return /^\d{3}$/.test(codigo);
}


export{ComprobarNombre};
export{ComprobarCorreo};
export{ComprobarLogin};
export{ComprobarContraseña};
export{ComprobarApellido};
export{ComprobarFoto};
export{ComprobarCVV};
export{ComprobarNumeroTarjeta};