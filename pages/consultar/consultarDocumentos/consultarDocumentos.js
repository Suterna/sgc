"use strict";

rellenarDesplegableCapitulosConsultarDocumentos();

function rellenarDesplegableCapitulosConsultarDocumentos() {
    $.get("consultar/consultarDocumentos/getCapitulos.php", null, procesoRespuestaGetCapitulosConsultarDocumentos, 'html');
}

function procesoRespuestaGetCapitulosConsultarDocumentos(sHTML) {
    $("#selectCapitulosConsultarDocumentos").html(sHTML);
}

function rellenarSelectProcedimientosConsultarDocumentos() {
    if (selectCapitulosConsultarDocumentos.value > -1) {
        $.get("consultar/consultarDocumentos/getProcedimientos.php", { capituloSeleccionado: selectCapitulosConsultarDocumentos.value }, procesoRespuestaGetProcedimientosConsultarDocumentos, 'html');
    } else {
        $('#divProcedimientosConsultarDocumentos').hide("normal");
    }
}

function procesoRespuestaGetProcedimientosConsultarDocumentos(sHTML) {
    $("#selectProcedimientosConsultarDocumentos").html(sHTML);
    $('#divProcedimientosConsultarDocumentos').show("normal");
}

function hacerSortableConsultarDocumentos() {
    new Tablesort(document.getElementById('tablaConsultarDocumentos'), {
        descending: true
    });
}

$("#btnConsultarDocumentos").click(function() {
    if (selectCapitulosConsultarDocumentos.value == -2) {
        alert("Debe seleccionar un capítulo");
    } else if (selectProcedimientosConsultarDocumentos.value == -2 && selectCapitulosConsultarDocumentos.value != -1) {
        alert("Debe seleccionar un procedimiento");
    } else {
        rellenarTablaConsultarDocumentos();
    }
    return false;
});

function rellenarTablaConsultarDocumentos() {
    $.get("consultar/consultarDocumentos/consultarDocumentos.php", { codCapitulo: selectCapitulosConsultarDocumentos.value, codProcedimiento: selectProcedimientosConsultarDocumentos.value }, respuestaConsultarDocumentos, 'html');
}

function respuestaConsultarDocumentos(sHTML) {
    $("#tablaConsultarDocumentos").html(sHTML);
    $('#divConsultarDocumentos').show("normal");
}