window.onload = function() {

    // Verificamos que se ha iniciado sesión
    let usuario_logueado = localStorage.getItem("usuario_logueado");
    if (!usuario_logueado) {
        window.location.replace("index.html");
        return;
    }

    // Pasamos el nombre y la foto del usuario
    usuario_logueado = JSON.parse(usuario_logueado);
    document.getElementById("nombre_perfil").innerText = usuario_logueado["nombre"];
    document.getElementById("foto_perfil").src = usuario_logueado["foto"];

    // Botón de cerrar sesión
    let boton_logout = document.getElementById("logout");
    boton_logout.onclick = function(event) {
        event.preventDefault();

        if (confirm("¿Desea cerrar sesión?")) {
            localStorage.removeItem("usuario_logueado");
            window.location.href = "index.html";
            }
        };

    // La función comprueba que la longitued del título y texto sea válida,
    // añade el consejo a local storage y restablece los valores de los
    // campos
    function enviar_tip() {
        event.preventDefault()
        let titulo = document.getElementById("nombre_tip").value;
        let texto = document.getElementById("texto_tip").value;

        if (titulo.length < 15 || texto.length < 30) {
            alert("El título o el texto son demasiado cortos");
            return;
        }

        // Guardar tip
        let tips = localStorage.getItem("tips");
        if (tips == null) tips = "[]";
        tips = JSON.parse(tips);

        tips.push({
            titulo: titulo,
            texto: texto,
        });

        localStorage.setItem("tips", JSON.stringify(tips));
        document.getElementById("nombre_tip").value = "";
        document.getElementById("texto_tip").value = "";
        window.location.reload()
    }

    // La función coge los 3 últimos consejos (si los hay), crea un enlace
    // para cada uno y los añade a una lista en el HTML
    function ultimos_tips() {
        let tips = localStorage.getItem("tips");
        if (tips == null) tips = "[]";
        tips = JSON.parse(tips);

        let lista_tips = document.querySelector("#tips_usuarios ul");
        lista_tips.innerHTML = "";

        let principio = tips.length - 3;
        if (principio < 0) principio = 0;

        for (let i = principio; i < tips.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = "<a href='*'>" + tips[i].titulo + "</a>";
            lista_tips.appendChild(li);
        }
    }

    document.getElementById("enviar_tip").onclick = enviar_tip;
    ultimos_tips();

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
