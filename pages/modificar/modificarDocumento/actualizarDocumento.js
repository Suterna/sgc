"use strict";

rellenarFormularioDocumento();

function rellenarFormularioDocumento() {
    var oRellenarFormularioDocumento = {
        codDocumento: localStorage["rellenarFormularioDocumento"]
    };

    $.post("modificar/modificarDocumento/rellenarFormularioDocumento.php", oRellenarFormularioDocumento, procesoRespuestaRellenarFormularioDocumento, 'json');
}

function procesoRespuestaRellenarFormularioDocumento(datos) {
    actualizarDocumentoCodDocumento.value = datos.rfadCodDocumento;
    actualizarDocumentoNombDocumento.value = datos.rfadNombDocumento;
}

$("#btnActualizarDocumento").click(function() {
    if (actualizarDocumentoNombDocumento.value == "") {
        actualizarDocumentoRespuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        actualizarDocumentoRespuesta.innerHTML = "";
        var oActualizarDocumento = {
            codDocumento: actualizarDocumentoCodDocumento.value,
            nombDocumento: actualizarDocumentoNombDocumento.value
        };
        $.post("modificar/modificarDocumento/actualizarDocumento.php", oActualizarDocumento, respuestaActualizarDocumento, 'json');
    }
    return false;
});

function respuestaActualizarDocumento(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        actualizarDocumentoRespuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formActualizarDocumento.reset();
        $("#frmActualizarDocumento").parent().hide("normal");
    }
}

$("#btnCancelarDocumento").click(function() {
    actualizarDocumentoRespuesta.innerHTML = "";
    localStorage.setItem("rellenarFormularioDocumento", -1);

    $("div:not('#frmModificarDocumento')").parent("section").hide("normal");

    formModificarDocumento.reset();

    $('#frmModificarDocumento').parent().show("normal");

    return false;
});