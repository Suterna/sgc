"use strict";

rellenarFormularioProcedimiento();

function rellenarFormularioProcedimiento() {
    var oRellenarFormularioProcedimiento = {
        codProcedimiento: localStorage["rellenarFormularioProcedimiento"]
    };

    $.post("modificar/modificarProcedimiento/rellenarFormularioProcedimiento.php", oRellenarFormularioProcedimiento, procesoRespuestaRellenarFormularioProcedimiento, 'json');
}

function procesoRespuestaRellenarFormularioProcedimiento(datos) {
    actualizarProcedimientoCodProcedimiento.value = datos.rfapCodProcedimiento;
    actualizarProcedimientoNombProcedimiento.value = datos.rfapNombProcedimiento;
    actualizarProcedimientoDescProcedimiento.value = datos.rfapDescProcedimiento;
}

$("#btnActualizarProcedimiento").click(function() {
    if (actualizarProcedimientoNombProcedimiento.value == "" || actualizarProcedimientoDescProcedimiento.value == "") {
        actualizarProcedimientoRespuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        actualizarProcedimientoRespuesta.innerHTML = "";
        var oActualizarProcedimiento = {
            codProcedimiento: actualizarProcedimientoCodProcedimiento.value,
            nombProcedimiento: actualizarProcedimientoNombProcedimiento.value,
            descProcedimiento: actualizarProcedimientoDescProcedimiento.value
        };
        $.post("modificar/modificarProcedimiento/actualizarProcedimiento.php", oActualizarProcedimiento, respuestaActualizarProcedimiento, 'json');
    }
    return false;
});

function respuestaActualizarProcedimiento(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        actualizarProcedimientoRespuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formActualizarProcedimiento.reset();
        $("#frmActualizarProcedimiento").parent().hide("normal");
    }
}

$("#btnCancelarProcedimiento").click(function() {
    actualizarProcedimientoRespuesta.innerHTML = "";
    localStorage.setItem("rellenarFormularioProcedimiento", -1);

    $("div:not('#frmModificarProcedimiento')").parent("section").hide("normal");

    formModificarProcedimiento.reset();

    $('#frmModificarProcedimiento').parent().show("normal");

    return false;
});