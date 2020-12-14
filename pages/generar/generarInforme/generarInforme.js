"use strict";

function rellenarSelectCapitulosGenerarInforme() {
    if (selectTipoDocumentoGenerar.value != -1) {
        $.get("generar/generarInforme/getCapitulos.php", null, procesoRespuestaGetCapitulosGenerarInforme, 'html');
    } else {
        $('#divCapitulosGenerarInforme').hide("normal");
        $('#divProcedimientosGenerarInforme').hide("normal");
        $('#divDocumentosGenerarInforme').hide("normal");
        $('#divGenerarInforme').hide("normal");
    }
}

function procesoRespuestaGetCapitulosGenerarInforme(sHTML) {
    $("#selectCapitulosGenerarInforme").html(sHTML);
    $('#divCapitulosGenerarInforme').show("normal");
    $('#divProcedimientosGenerarInforme').hide("normal");
    $('#divDocumentosGenerarInforme').hide("normal");
    $('#divGenerarInforme').hide("normal");
}

function rellenarSelectProcedimientosGenerarInforme() {
    if (selectCapitulosGenerarInforme.value != -1) {
        $.get("generar/generarInforme/getProcedimientos.php", { capituloSeleccionado: selectCapitulosGenerarInforme.value }, procesoRespuestaGetProcedimientosGenerarInforme, 'html');
    } else {
        $('#divProcedimientosGenerarInforme').hide("normal");
        $('#divDocumentosGenerarInforme').hide("normal");
        $('#divGenerarInforme').hide("normal");
    }
}

function procesoRespuestaGetProcedimientosGenerarInforme(sHTML) {
    $("#selectProcedimientosGenerarInforme").html(sHTML);
    $('#divProcedimientosGenerarInforme').show("normal");
    $('#divDocumentosGenerarInforme').hide("normal");
    $('#divGenerarInforme').hide("normal");
}

function rellenarSelectDocumentosGenerarInforme() {
    if (selectTipoDocumentoGenerar.value == 2) {
        if (selectProcedimientosGenerarInforme.value != -1) {
            $.get("generar/generarInforme/getDocumentos.php", { procedimientoSeleccionado: selectProcedimientosGenerarInforme.value }, procesoRespuestaGetDocumentosGenerarInforme, 'html');
        } else {
            $('#divDocumentosGenerarInforme').hide("normal");
            $('#divGenerarInforme').hide("normal");
        }
    } else if (selectTipoDocumentoGenerar.value == 1) {
        $('#divGenerarInforme').show("normal");
    }
}

function procesoRespuestaGetDocumentosGenerarInforme(sHTML) {
    $("#selectDocumentosGenerarInforme").html(sHTML);
    $('#divDocumentosGenerarInforme').show("normal");
    $('#divGenerarInforme').hide("normal");
}

function desplegarDivGenerarInforme() {
    if (selectDocumentosGenerarInforme.value != -1) {
        $('#divGenerarInforme').show("normal");
    } else {
        $('#divGenerarInforme').hide("normal");
    }
}

function descargarInformeArbol() {
    if (selectTipoDocumentoGenerar.value == 1) {
        $.get("generar/generarInforme/informeArbol.php", { procedimientoSeleccionado: selectProcedimientosGenerarInforme.value }, procesoRespuestaGenerarInformeArbol, 'html');
    } else if (selectTipoDocumentoGenerar.value == 2) {
        $.get("generar/generarInforme/versionesDocumento.php", { documentoSeleccionado: selectDocumentosGenerarInforme.value }, procesoRespuestaGenerarVersionesDocumento, 'html');
    }
}

function procesoRespuestaGenerarInformeArbol(sHTML) {
    var doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(30, 20, "Arbol Documental del procedimiento: " + selectProcedimientosGenerarInforme.value);

    var StringDividido = sHTML.split("<br>");
    var tamano = 40;
    var par = 0;
    doc.setFontSize(14);

    for (var i = 0; i < StringDividido.length - 1; i++) {
        if (par == 0) {
            doc.text(10, tamano, "-" + StringDividido[i]);
            tamano = tamano + 10;
            par = 1;
        } else {
            doc.text(15, tamano, StringDividido[i]);
            tamano = tamano + 15;
            par = 0;
        }
    }

    doc.save('Arbol Documental.pdf');
}

function procesoRespuestaGenerarVersionesDocumento(sHTML) {
    var doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(30, 20, "Versiones del documento: " + selectDocumentosGenerarInforme.value);

    var StringDividido = sHTML.split("<br>");
    var tamano = 40;
    var par = 0;
    doc.setFontSize(14);

    for (var i = 0; i < StringDividido.length - 1; i++) {
        if (par == 0) {
            doc.text(10, tamano, "-" + StringDividido[i]);
            tamano = tamano + 10;
            par = 1;
        } else {
            doc.text(15, tamano, StringDividido[i]);
            if (par == 1) {
                tamano = tamano + 10;
                par = 2;
            } else {
                tamano = tamano + 15;
                par = 0;
            }
        }
    }

    doc.save('Versiones Documento.pdf');
}