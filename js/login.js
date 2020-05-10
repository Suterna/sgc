'use strict';

$("#acceder").click(function() {
    if (usuario.value == "" || password.value == "") {
        respuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var oLogin = {
            usuario: usuario.value,
            password: password.value
        };
        $.post("../php/login.php", oLogin, respuestaLogin, 'html');
    }
    return false;
});

function respuestaLogin(sHTML) {
    if (sHTML == "") {
        sHTML = -1;
    }
    if (sHTML == 0 || sHTML == 1 || sHTML == 2) {
        respuesta.innerHTML = "";
        localStorage.setItem("perfil", sHTML);
        localStorage.setItem("sesion", usuario.value);
        window.location = "indexForms.html";
    } else {
        respuesta.innerHTML = "Introduzca los datos correctamente";
    }
}