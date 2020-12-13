"use strict";

rellenarDesplegableCapitulosModificarDocumento();

function rellenarDesplegableCapitulosModificarDocumento() {
    $.get("modificar/modificarDocumento/getCapitulos.php", null, procesoRespuestaGetCapitulosModificarDocumento, 'html');
}

function procesoRespuestaGetCapitulosModificarDocumento(sHTML) {
    $("#selectCapitulosModificarDocumento").html(sHTML);
}

function rellenarDesplegableProcedimientosModificarDocumento() {
    $.get("modificar/modificarDocumento/getProcedimientos.php", { capituloSeleccionado: selectCapitulosModificarDocumento.value }, procesoRespuestaGetProcedimientosModificarDocumento, 'html');
}

function procesoRespuestaGetProcedimientosModificarDocumento(sHTML) {
    $("#selectProcedimientosModificarDocumento").html(sHTML);
}

function rellenarDesplegableDocumentosModificarDocumento() {
    $.get("modificar/modificarDocumento/getDocumentos.php", { procedimientoSeleccionado: selectProcedimientosModificarDocumento.value }, procesoRespuestaGetDocumentosModificarDocumento, 'html');
}

function procesoRespuestaGetDocumentosModificarDocumento(sHTML) {
    $("#selectDocumentosModificarDocumento").html(sHTML);
}

function cargarSelectProcedimientosModificarDocumento() {
    if (selectCapitulosModificarDocumento.value != -1) {
        rellenarDesplegableProcedimientosModificarDocumento();
        $('#divSelectProcedimientosModificarDocumento').show("normal");
    } else {
        $('#divSelectProcedimientosModificarDocumento').hide("normal");
        $('#divSelectDocumentosModificarDocumento').hide("normal");
    }
}

function cargarSelectDocumentosModificarDocumento() {
    if (selectProcedimientosModificarDocumento.value != -1) {
        rellenarDesplegableDocumentosModificarDocumento();
        $('#divSelectDocumentosModificarDocumento').show("normal");
    } else {
        $('#divSelectDocumentosModificarDocumento').hide("normal");
    }
}

$("#btnModificarDocumento").click(function() {
    if (selectCapitulosModificarDocumento.value == -1 || selectProcedimientosModificarDocumento.value == -1 || selectDocumentosModificarDocumento.value == -1) {
        alert("Debe seleccionar un documento");
    } else {
        $('#divSelectProcedimientosModificarDocumento').hide("normal");
        $('#divSelectDocumentosModificarDocumento').hide("normal");
        $("div:not('#frmActualizarDocumento')").parent("section").hide("normal");

        if ($('#frmActualizarDocumento').length == 0) {
            $("<div>").appendTo('#formularios').load("modificar/modificarDocumento/actualizarDocumento.html",
                function() {
                    $.getScript("modificar/modificarDocumento/actualizarDocumento.js");
                });
            localStorage.setItem("rellenarFormularioDocumento", selectDocumentosModificarDocumento.value);
            formModificarDocumento.reset();
        } else {
            localStorage.setItem("rellenarFormularioDocumento", selectDocumentosModificarDocumento.value);
            $('#frmActualizarDocumento').parent().show("normal");
        }
    }
    return false;
});

$("#btnBorrarDocumento").click(function() {
    if (selectCapitulosModificarDocumento.value == -1 || selectProcedimientosModificarDocumento.value == -1 || selectDocumentosModificarDocumento.value == -1) {
        alert("Debe seleccionar un documento");
    } else {
        let confirmacion = confirm("¿Está seguro de qué desea borrar este documento? (También se borrarán las versiones asociadas)");
        if (confirmacion) {
            var oBorrarDocumento = {
                codDocumento: selectDocumentosModificarDocumento.value
            };
            $.post("../pages/modificar/modificarDocumento/borrarDocumento.php", oBorrarDocumento, respuestaBorrarDocumento, 'json');
        } else {
            return false;
        }
    }
    return false;
});

function respuestaBorrarDocumento(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        alert(oDatos.mensaje);
        return false;
    } else {
        alert(oDatos.mensaje);
        formModificarDocumento.reset();
        $('#divSelectProcedimientosModificarDocumento').hide("normal");
        $('#divSelectDocumentosModificarDocumento').hide("normal");
        $("#frmModificarDocumento").parent().hide("normal");
    }
}