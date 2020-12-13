"use strict";

rellenarFormulario();

function rellenarFormulario() {
    var oRellenarFormulario = {
        codUsuario: localStorage["rellenarFormulario"]
    };

    $.post("modificar/modificarUsuario/rellenarFormulario.php", oRellenarFormulario, procesoRespuestaRellenarFormulario, 'json');
}

function procesoRespuestaRellenarFormulario(datos) {
    actualizarNombreUsuario.value = datos.rfNombreUsuario;
    actualizarNombre.value = datos.rfNombre;
    actualizarApellidos.value = datos.rfApellidos;
    actualizarPerfil.value = datos.rfPerfil;
    actualizarContraseña.value = datos.rfContraseña;
}

$("#btnActualizarUsuario").click(function() {
    if (actualizarNombreUsuario.value == "" || actualizarNombre.value == "" || actualizarApellidos.value == "" || actualizarPerfil.value == -1 || actualizarContraseña.value == "") {
        actualizarRespuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var oActualizarUsuario = {
            nombreUsuario: actualizarNombreUsuario.value,
            nombre: actualizarNombre.value,
            apellidos: actualizarApellidos.value,
            perfil: actualizarPerfil.value,
            contraseña: actualizarContraseña.value
        };
        $.post("modificar/modificarUsuario/actualizarUsuario.php", oActualizarUsuario, respuestaActualizarUsuario, 'json');
    }
    return false;
});

function respuestaActualizarUsuario(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        actualizarRespuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formActualizarUsuario.reset();
        $("#frmActualizarUsuario").parent().hide("normal");
    }
}

$("#btnCancelarUsuario").click(function() {
    actualizarRespuesta.innerHTML = "";
    localStorage.setItem("rellenarFormulario", -1);

    $("div:not('#frmModificarUsuario')").parent("section").hide("normal");

    formModificarUsuario.reset();

    $('#frmModificarUsuario').parent().show("normal");

    return false;
});