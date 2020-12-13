"use strict";

rellenarFormularioCapitulo();

function rellenarFormularioCapitulo() {
    var oRellenarFormularioCapitulo = {
        codCapitulo: localStorage["rellenarFormularioCapitulo"]
    };

    $.post("modificar/modificarCapitulo/rellenarFormularioCapitulo.php", oRellenarFormularioCapitulo, procesoRespuestaRellenarFormularioCapitulo, 'json');
}

function procesoRespuestaRellenarFormularioCapitulo(datos) {
    actualizarCapituloCodCapitulo.value = datos.rfacCodCapitulo;
    actualizarCapituloNombCapitulo.value = datos.rfacNombCapitulo;
}

$("#btnActualizarCapitulo").click(function() {
    if (actualizarCapituloNombCapitulo.value == "") {
        actualizarCapituloRespuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        actualizarCapituloRespuesta.innerHTML = "";
        var oActualizarCapitulo = {
            codCapitulo: actualizarCapituloCodCapitulo.value,
            nombCapitulo: actualizarCapituloNombCapitulo.value
        };
        $.post("modificar/modificarCapitulo/actualizarCapitulo.php", oActualizarCapitulo, respuestaActualizarCapitulo, 'json');
    }
    return false;
});

function respuestaActualizarCapitulo(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        actualizarCapituloRespuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formActualizarCapitulo.reset();
        $("#frmActualizarCapitulo").parent().hide("normal");
    }
}

$("#btnCancelarCapitulo").click(function() {
    actualizarCapituloRespuesta.innerHTML = "";
    localStorage.setItem("rellenarFormularioCapitulo", -1);

    $("div:not('#frmModificarCapitulo')").parent("section").hide("normal");

    formModificarCapitulo.reset();

    $('#frmModificarCapitulo').parent().show("normal");

    return false;
});