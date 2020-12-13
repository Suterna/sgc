"use strict";

rellenarDesplegableCapitulosConsultarVersiones();

function rellenarDesplegableCapitulosConsultarVersiones() {
    $.get("consultar/consultarVersiones/getCapitulos.php", null, procesoRespuestaGetCapitulosConsultarVersiones, 'html');
}

function procesoRespuestaGetCapitulosConsultarVersiones(sHTML) {
    $("#selectCapitulosConsultarVersiones").html(sHTML);
}

function rellenarSelectProcedimientosConsultarVersiones() {
    if (selectCapitulosConsultarVersiones.value != -1) {
        $.get("consultar/consultarVersiones/getProcedimientos.php", { capituloSeleccionado: selectCapitulosConsultarVersiones.value }, procesoRespuestaGetProcedimientosConsultarVersiones, 'html');
    } else {
        $('#divDocumentosConsultarVersiones').hide("normal");
        $('#divProcedimientosConsultarVersiones').hide("normal");
    }
}

function procesoRespuestaGetProcedimientosConsultarVersiones(sHTML) {
    $("#selectProcedimientosConsultarVersiones").html(sHTML);
    $('#divProcedimientosConsultarVersiones').show("normal");
}

function rellenarSelectDocumentosConsultarVersiones() {
    if (selectProcedimientosConsultarVersiones.value != -1) {
        $.get("consultar/consultarVersiones/getDocumentos.php", { procedimientoSeleccionado: selectProcedimientosConsultarVersiones.value }, procesoRespuestaGetDocumentosConsultarVersiones, 'html');
    } else {
        $('#divDocumentosConsultarVersiones').hide("normal");
    }
}

function procesoRespuestaGetDocumentosConsultarVersiones(sHTML) {
    $("#selectDocumentosConsultarVersiones").html(sHTML);
    $('#divDocumentosConsultarVersiones').show("normal");
}

function hacerSortableConsultarVersiones() {
    new Tablesort(document.getElementById('tablaConsultarVersiones'), {
        descending: true
    });
}

$("#btnConsultarVersiones").click(function() {
    if (selectCapitulosConsultarVersiones.value == -1) {
        alert("Debe seleccionar un documento");
    } else {
        rellenarTablaConsultarVersiones();
    }
    return false;
});

function rellenarTablaConsultarVersiones() {
    $.get("consultar/consultarVersiones/consultarVersiones.php", { codDocumento: selectDocumentosConsultarVersiones.value }, respuestaConsultarVersiones, 'html');
}

function respuestaConsultarVersiones(sHTML) {
    $("#tablaConsultarVersiones").html(sHTML);
    $('#divConsultarVersiones').show("normal");
}