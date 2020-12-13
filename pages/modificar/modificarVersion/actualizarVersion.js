"use strict";

rellenarFormularioVersion();

function rellenarFormularioVersion() {
    var oRellenarFormularioVersion = {
        codRevision: localStorage["rellenarFormularioVersion"]
    };

    $.post("modificar/modificarVersion/rellenarFormularioVersion.php", oRellenarFormularioVersion, procesoRespuestaRellenarFormularioVersion, 'json');
}

function procesoRespuestaRellenarFormularioVersion(datos) {
    actualizarVersionCodVersion.value = datos.rfavCodVersion;
    actualizarVersionDescVersion.value = datos.rfavdescVersion;
}

$("#btnActualizarVersion").click(function() {
    if (actualizarVersionDescVersion.value == "") {
        actualizarVersionRespuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        actualizarVersionRespuesta.innerHTML = "";
        var oActualizarVersion = {
            codRevision: actualizarVersionCodVersion.value,
            descVersion: actualizarVersionDescVersion.value
        };
        $.post("modificar/modificarVersion/actualizarVersion.php", oActualizarVersion, respuestaActualizarVersion, 'json');
    }
    return false;
});

function respuestaActualizarVersion(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        actualizarVersionRespuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formActualizarVersion.reset();
        $("#frmActualizarVersion").parent().hide("normal");
    }
}

$("#btnCancelarVersion").click(function() {
    actualizarVersionRespuesta.innerHTML = "";
    localStorage.setItem("rellenarFormularioVersion", -1);

    $("div:not('#frmModificarVersion')").parent("section").hide("normal");

    formModificarVersion.reset();

    $('#frmModificarVersion').parent().show("normal");

    return false;
});