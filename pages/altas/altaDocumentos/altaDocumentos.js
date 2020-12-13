"use strict";

rellenarDesplegableCapitulos();

function rellenarDesplegableCapitulos() {
    $.get("../pages/altas/altaDocumentos/getCapitulos.php", null, procesoRespuestaGetCapitulos, 'html');
}

function procesoRespuestaGetCapitulos(sHTML) {
    $("#selectCapitulos").html(sHTML);
}

function rellenarSelectProcedimientos() {
    $.get("../pages/altas/altaDocumentos/getProcedimientos.php", { capituloSeleccionado: selectCapitulos.value }, procesoRespuestaGetProcedimientos, 'html');
}

function procesoRespuestaGetProcedimientos(sHTML) {
    $("#selectProcedimientos").html(sHTML);
}

function cargarSelectProcedimientos() {
    if (selectCapitulos.value != -1) {
        rellenarSelectProcedimientos();
        $('#divSelectProcedimientos').show("normal");
    } else {
        $('#divSelectProcedimientos').hide("normal");
        $('#divNombreDocumento').hide("normal");
        $('#divDocumento').hide("normal");
    }
}

function cargarFormularioDocumentos() {
    if (selectProcedimientos.value != -1) {
        $('#divNombreDocumento').show("normal");
        $('#divDocumento').show("normal");
    } else {
        $('#divNombreDocumento').hide("normal");
        $('#divDocumento').hide("normal");
    }
}

$("#btnAltaDocumento").click(function() {
    if (nombreDocumento.value == "" || documento.value == "") {
        respuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var formData = new FormData();
        var files = $('#documento').prop('files')[0];
        formData.append('file', files);

        $.ajax({
            url: "../pages/altas/altaDocumentos/subirDocumentos.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(linkDrive) {
                var oAltaDocumento = {
                    codCapitulo: selectCapitulos.value,
                    codProcedimiento: selectProcedimientos.value,
                    nombreDocumento: nombreDocumento.value,
                    enlace: linkDrive
                };
                $.post("../pages/altas/altaDocumentos/altaDocumentos.php", oAltaDocumento, respuestaAltaDocumentos, 'json');
            }
        });
    }
    return false;
});

function respuestaAltaDocumentos(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        respuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formAltaDocumentos.reset();
        $('#divSelectProcedimientos').hide();
        $('#divNombreDocumento').hide();
        $('#divDocumento').hide();
        $("#frmAltaDocumentos").parent().hide("normal");
    }
}