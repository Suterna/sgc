"use strict";

rellenarDesplegableCapitulosConsultarProcedimientos();

function rellenarDesplegableCapitulosConsultarProcedimientos() {
    $.get("consultar/consultarProcedimientos/getCapitulos.php", null, procesoRespuestaGetCapitulosConsultarProcedimientos, 'html');
}

function procesoRespuestaGetCapitulosConsultarProcedimientos(sHTML) {
    $("#selectCapitulosConsultarProcedimientos").html(sHTML);
}

function hacerSortableConsultarProcedimientos() {
    new Tablesort(document.getElementById('tablaConsultarProcedimientos'), {
        descending: true
    });
}

$("#btnConsultarProcedimientos").click(function() {
    if (selectCapitulosConsultarProcedimientos.value == -2) {
        alert("Debe seleccionar un capítulo");
    } else {
        rellenarTablaConsultarProcedimientos();
        $('#divConsultarProcedimientos').show("normal");
    }
    return false;
});

function rellenarTablaConsultarProcedimientos() {
    $.get("consultar/consultarProcedimientos/consultarProcedimientos.php", { codCapitulo: selectCapitulosConsultarProcedimientos.value }, respuestaConsultarProcedimientos, 'html');
}

function respuestaConsultarProcedimientos(sHTML) {
    $("#tablaConsultarProcedimientos").html(sHTML);
}