"use strict";

$("#btnAltaUsuario").click(function() {
    if (nombreUsuario.value == "" || nombre.value == "" || apellidos.value == "" || perfil.value == -1 || contraseña.value == "") {
        respuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var oAltaUsuario = {
            nombreUsuario: nombreUsuario.value,
            nombre: nombre.value,
            apellidos: apellidos.value,
            perfil: perfil.value,
            contraseña: contraseña.value
        };
        $.post("../pages/altas/altaUsuario/altaUsuario.php", oAltaUsuario, respuestaAltaUsuario, 'json');
    }
    return false;
});

function respuestaAltaUsuario(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        respuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formAltaUsuario.reset();
        $("#frmAltaUsuario").parent().hide("normal");
    }
}