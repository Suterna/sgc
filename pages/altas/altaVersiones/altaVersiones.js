"use strict";

rellenarDesplegableCapitulosVersiones();

function rellenarDesplegableCapitulosVersiones() {
    $.get("../pages/altas/altaVersiones/getCapitulos.php", null, procesoRespuestaGetCapitulosVersiones, 'html');
}

function procesoRespuestaGetCapitulosVersiones(sHTML) {
    $("#selectCapitulosVersiones").html(sHTML);
}

function rellenarSelectProcedimientosVersiones() {
    $.get("../pages/altas/altaVersiones/getProcedimientos.php", { capituloSeleccionado: selectCapitulosVersiones.value }, procesoRespuestaGetProcedimientosVersiones, 'html');
}

function procesoRespuestaGetProcedimientosVersiones(sHTML) {
    $("#selectProcedimientosVersiones").html(sHTML);
}

function rellenarSelectDocumentosVersiones() {
    $.get("../pages/altas/altaVersiones/getDocumentos.php", { procedimientoSeleccionado: selectProcedimientosVersiones.value }, procesoRespuestaGetDocumentosVersiones, 'html');
}

function procesoRespuestaGetDocumentosVersiones(sHTML) {
    $("#selectDocumentosVersiones").html(sHTML);
}

function cargarSelectProcedimientosVersiones() {
    if (selectCapitulosVersiones.value != -1) {
        rellenarSelectProcedimientosVersiones();
        $('#divSelectProcedimientosVersiones').show("normal");
    } else {
        $('#divSelectProcedimientosVersiones').hide("normal");
        $('#divSelectDocumentosVersiones').hide("normal");
        $('#divDescripcionVersion').hide("normal");
        $('#divDocumentoVersiones').hide("normal");
    }
}

function cargarSelectDocumentosVersiones() {
    if (selectProcedimientosVersiones.value != -1) {
        rellenarSelectDocumentosVersiones();
        $('#divSelectDocumentosVersiones').show("normal");
    } else {
        $('#divSelectDocumentosVersiones').hide("normal");
        $('#divDescripcionVersion').hide("normal");
        $('#divDocumentoVersiones').hide("normal");
    }
}

function cargarFormularioVersiones() {
    if (selectDocumentosVersiones.value != -1) {
        $('#divDescripcionVersion').show("normal");
        $('#divDocumentoVersiones').show("normal");
    } else {
        $('#divDescripcionVersion').hide("normal");
        $('#divDocumentoVersiones').hide("normal");
    }
}

$("#btnAltaVersion").click(function() {
    if (descripcionVersion.value == "" || documentoVersiones.value == "") {
        respuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var formData = new FormData();
        var files = $('#documentoVersiones').prop('files')[0];
        formData.append('file', files);

        $.ajax({
            url: "../pages/altas/altaVersiones/subirVersiones.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(linkDrive) {
                var oAltaVersion = {
                    codCapitulo: selectCapitulosVersiones.value,
                    codProcedimiento: selectProcedimientosVersiones.value,
                    codDocumento: selectDocumentosVersiones.value,
                    descripcionVersion: descripcionVersion.value,
                    enlaceVersion: linkDrive
                };
                $.post("../pages/altas/altaVersiones/altaVersiones.php", oAltaVersion, respuestaAltaVersiones, 'json');
            }
        });
    }
    return false;
});

function respuestaAltaVersiones(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        respuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formAltaVersiones.reset();
        $('#divSelectProcedimientosVersiones').hide();
        $('#divSelectDocumentosVersiones').hide();
        $('#divDescripcionVersion').hide();
        $('#divDocumentoVersiones').hide();
        $("#frmAltaVersiones").parent().hide("normal");
    }
}