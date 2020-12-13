"use strict";

rellenarTablaConsultarCapitulos();
hacerSortable();

function rellenarTablaConsultarCapitulos() {
    $.get("consultar/consultarCapitulos/consultarCapitulos.php", null, procesoRespuestaGetTablaConsultarCapitulos, 'html');
}

function procesoRespuestaGetTablaConsultarCapitulos(sHTML) {
    $("#tablaConsultarCapitulos").html(sHTML);
}

function hacerSortable() {
    new Tablesort(document.getElementById('tablaConsultarCapitulos'), {
        descending: true
    });
}