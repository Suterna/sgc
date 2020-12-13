"use strict";

rellenarDesplegableCapitulosModificarProcedimiento();

function rellenarDesplegableCapitulosModificarProcedimiento() {
    $.get("modificar/modificarProcedimiento/getCapitulos.php", null, procesoRespuestaGetCapitulosModificarProcedimiento, 'html');
}

function procesoRespuestaGetCapitulosModificarProcedimiento(sHTML) {
    $("#selectCapitulosModificarProcedimiento").html(sHTML);
}

function rellenarDesplegableProcedimientosModificarProcedimiento() {
    $.get("modificar/modificarProcedimiento/getProcedimientos.php", { capituloSeleccionado: selectCapitulosModificarProcedimiento.value }, procesoRespuestaGetProcedimientosModificarProcedimiento, 'html');
}

function procesoRespuestaGetProcedimientosModificarProcedimiento(sHTML) {
    $("#selectProcedimientosModificarProcedimiento").html(sHTML);
}

function cargarSelectProcedimientosModificarProcedimiento() {
    if (selectCapitulosModificarProcedimiento.value != -1) {
        rellenarDesplegableProcedimientosModificarProcedimiento();
        $('#divSelectProcedimientosModificarProcedimiento').show("normal");
    } else {
        $('#divSelectProcedimientosModificarProcedimiento').hide("normal");
    }
}

$("#btnModificarProcedimiento").click(function() {
    if (selectCapitulosModificarProcedimiento.value == -1 || selectProcedimientosModificarProcedimiento.value == -1) {
        alert("Debe seleccionar un procedimiento");
    } else {
        $('#divSelectProcedimientosModificarProcedimiento').hide("normal");
        $("div:not('#frmActualizarProcedimiento')").parent("section").hide("normal");

        if ($('#frmActualizarProcedimiento').length == 0) {
            $("<div>").appendTo('#formularios').load("modificar/modificarProcedimiento/actualizarProcedimiento.html",
                function() {
                    $.getScript("modificar/modificarProcedimiento/actualizarProcedimiento.js");
                });
            localStorage.setItem("rellenarFormularioProcedimiento", selectProcedimientosModificarProcedimiento.value);
            formModificarProcedimiento.reset();
        } else {
            localStorage.setItem("rellenarFormularioProcedimiento", selectProcedimientosModificarProcedimiento.value);
            $('#frmActualizarProcedimiento').parent().show("normal");
        }
    }
    return false;
});

$("#btnBorrarProcedimiento").click(function() {
    if (selectCapitulosModificarProcedimiento.value == -1 || selectProcedimientosModificarProcedimiento.value == -1) {
        alert("Debe seleccionar un procedimiento");
    } else {
        let confirmacion = confirm("¿Está seguro de qué desea borrar este procedimiento? (También se borrarán los documentos y versiones asociados)");
        if (confirmacion) {
            var oBorrarProcedimiento = {
                codProcedimiento: selectProcedimientosModificarProcedimiento.value
            };
            $.post("../pages/modificar/modificarProcedimiento/borrarProcedimiento.php", oBorrarProcedimiento, respuestaBorrarProcedimiento, 'json');
        } else {
            return false;
        }
    }
    return false;
});

function respuestaBorrarProcedimiento(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        alert(oDatos.mensaje);
        return false;
    } else {
        alert(oDatos.mensaje);
        formModificarProcedimiento.reset();
        $('#divSelectProcedimientosModificarProcedimiento').hide("normal");
        $("#frmModificarProcedimiento").parent().hide("normal");
    }
}