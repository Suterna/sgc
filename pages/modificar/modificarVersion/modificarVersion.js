"use strict";

rellenarDesplegableCapitulosModificarVersion();

function rellenarDesplegableCapitulosModificarVersion() {
    $.get("modificar/modificarVersion/getCapitulos.php", null, procesoRespuestaGetCapitulosModificarVersion, 'html');
}

function procesoRespuestaGetCapitulosModificarVersion(sHTML) {
    $("#selectCapitulosModificarVersion").html(sHTML);
}

function rellenarDesplegableProcedimientosModificarVersion() {
    $.get("modificar/modificarVersion/getProcedimientos.php", { capituloSeleccionado: selectCapitulosModificarVersion.value }, procesoRespuestaGetProcedimientosModificarVersion, 'html');
}

function procesoRespuestaGetProcedimientosModificarVersion(sHTML) {
    $("#selectProcedimientosModificarVersion").html(sHTML);
}

function rellenarDesplegableDocumentosModificarVersion() {
    $.get("modificar/modificarVersion/getDocumentos.php", { procedimientoSeleccionado: selectProcedimientosModificarVersion.value }, procesoRespuestaGetDocumentosModificarVersion, 'html');
}

function procesoRespuestaGetDocumentosModificarVersion(sHTML) {
    $("#selectDocumentosModificarVersion").html(sHTML);
}

function rellenarDesplegableVersiones() {
    $.get("modificar/modificarVersion/getVersiones.php", { documentoSeleccionado: selectDocumentosModificarVersion.value }, procesoRespuestaGetVersiones, 'html');
}

function procesoRespuestaGetVersiones(sHTML) {
    $("#selectVersiones").html(sHTML);
}

function cargarSelectProcedimientosModificarVersion() {
    if (selectCapitulosModificarVersion.value != -1) {
        rellenarDesplegableProcedimientosModificarVersion();
        $('#divSelectProcedimientosModificarVersion').show("normal");
    } else {
        $('#divSelectProcedimientosModificarVersion').hide("normal");
        $('#divSelectDocumentosModificarVersion').hide("normal");
        $('#divSelectVersion').hide("normal");
    }
}

function cargarSelectDocumentosModificarVersion() {
    if (selectProcedimientosModificarVersion.value != -1) {
        rellenarDesplegableDocumentosModificarVersion();
        $('#divSelectDocumentosModificarVersion').show("normal");
    } else {
        $('#divSelectDocumentosModificarVersion').hide("normal");
        $('#divSelectVersion').hide("normal");
    }
}

function cargarSelectVersiones() {
    if (selectDocumentosModificarVersion.value != -1) {
        rellenarDesplegableVersiones();
        $('#divSelectVersion').show("normal");
    } else {
        $('#divSelectVersion').hide("normal");
    }
}

$("#btnModificarVersion").click(function() {
    if (selectCapitulosModificarVersion.value == -1 || selectProcedimientosModificarVersion.value == -1 || selectDocumentosModificarVersion.value == -1 || selectVersiones.value == -1) {
        alert("Debe seleccionar una verisión");
    } else {
        $('#divSelectProcedimientosModificarVersion').hide("normal");
        $('#divSelectDocumentosModificarVersion').hide("normal");
        $('#divSelectVersion').hide("normal");
        $("div:not('#frmActualizarVersion')").parent("section").hide("normal");

        if ($('#frmActualizarVersion').length == 0) {
            $("<div>").appendTo('#formularios').load("modificar/modificarVersion/actualizarVersion.html",
                function() {
                    $.getScript("modificar/modificarVersion/actualizarVersion.js");
                });
            localStorage.setItem("rellenarFormularioVersion", selectVersiones.value);
            formModificarVersion.reset();
        } else {
            localStorage.setItem("rellenarFormularioVersion", selectVersiones.value);
            $('#frmActualizarVersion').parent().show("normal");
        }
    }
    return false;
});

$("#btnBorrarVersion").click(function() {
    if (selectCapitulosModificarVersion.value == -1 || selectProcedimientosModificarVersion.value == -1 || selectDocumentosModificarVersion.value == -1 || selectVersiones.value == -1) {
        alert("Debe seleccionar una verisión");
    } else {
        let confirmacion = confirm("¿Está seguro de qué desea borrar esta versión?");
        if (confirmacion) {
            var oBorrarVersion = {
                codRevision: selectVersiones.value
            };
            $.post("../pages/modificar/modificarVersion/borrarVersion.php", oBorrarVersion, respuestaBorrarVersion, 'json');
        } else {
            return false;
        }
    }
    return false;
});

function respuestaBorrarVersion(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        alert(oDatos.mensaje);
        return false;
    } else {
        alert(oDatos.mensaje);
        formModificarVersion.reset();
        $('#divSelectProcedimientosModificarVersion').hide("normal");
        $('#divSelectDocumentosModificarVersion').hide("normal");
        $('#divSelectVersion').hide("normal");
        $("#frmModificarVersion").parent().hide("normal");
    }
}