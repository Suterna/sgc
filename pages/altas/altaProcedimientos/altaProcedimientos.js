"use strict";

rellenarDesplegableCapitulos();

function rellenarDesplegableCapitulos() {
    $.get("../pages/altas/altaProcedimientos/getCapitulos.php", null, procesoRespuestaGetCapitulos, 'html');
}

function procesoRespuestaGetCapitulos(sHTML) {
    $("#selectCapitulos").html(sHTML);
}

function cargarFormularioProcedimiento() {
    if (selectCapitulos.value != -1) {
        $('#divNombreProcedimiento').show("normal");
        $('#divDescripcionProcedimiento').show("normal");
    } else {
        $('#divNombreProcedimiento').hide("normal");
        $('#divDescripcionProcedimiento').hide("normal");
    }
}

$("#btnAltaProcedimiento").click(function() {
    if (nombreProcedimiento.value == "" || descripcion.value == "") {
        respuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var oAltaProcedimiento = {
            codCapitulo: selectCapitulos.value,
            nombreProcedimiento: nombreProcedimiento.value,
            descripcion: descripcion.value
        };
        $.post("../pages/altas/altaProcedimientos/altaProcedimientos.php", oAltaProcedimiento, respuestaAltaProcedimiento, 'json');
    }
    return false;
});

function respuestaAltaProcedimiento(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        respuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formAltaProcedimientos.reset();
        $('#divNombreProcedimiento').hide();
        $('#divDescripcionProcedimiento').hide();
        $("#frmAltaProcedimientos").parent().hide("normal");
    }
}