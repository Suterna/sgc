"use strict";

rellenarDesplegableCapitulosModificarCapitulo();

function rellenarDesplegableCapitulosModificarCapitulo() {
    $.get("modificar/modificarCapitulo/getCapitulos.php", null, procesoRespuestaGetCapitulosModificarCapitulo, 'html');
}

function procesoRespuestaGetCapitulosModificarCapitulo(sHTML) {
    $("#selectCapitulosModificarCapitulo").html(sHTML);
}

$("#btnModificarCapitulo").click(function() {
    if (selectCapitulosModificarCapitulo.value == -1) {
        alert("Debe seleccionar un capítulo");
    } else {
        $("div:not('#frmActualizarCapitulo')").parent("section").hide("normal");

        if ($('#frmActualizarCapitulo').length == 0) {
            $("<div>").appendTo('#formularios').load("modificar/modificarCapitulo/actualizarCapitulo.html",
                function() {
                    $.getScript("modificar/modificarCapitulo/actualizarCapitulo.js");
                });
            localStorage.setItem("rellenarFormularioCapitulo", selectCapitulosModificarCapitulo.value);
            formModificarCapitulo.reset();
        } else {
            localStorage.setItem("rellenarFormularioCapitulo", selectCapitulosModificarCapitulo.value);
            $('#frmActualizarCapitulo').parent().show("normal");
        }
    }
    return false;
});

$("#btnBorrarCapitulo").click(function() {
    if (selectCapitulosModificarCapitulo.value == -1) {
        alert("Debe seleccionar un capítulo");
    } else {
        let confirmacion = confirm("¿Está seguro de qué desea borrar este capítulo? (También se borrarán los procedimientos, documentos y versiones asociados)");
        if (confirmacion) {
            var oBorrarCapitulo = {
                codCapitulo: selectCapitulosModificarCapitulo.value
            };
            $.post("../pages/modificar/modificarCapitulo/borrarCapitulo.php", oBorrarCapitulo, respuestaBorrarCapitulo, 'json');
        } else {
            return false;
        }
    }
    return false;
});

function respuestaBorrarCapitulo(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        alert(oDatos.mensaje);
        return false;
    } else {
        alert(oDatos.mensaje);
        formModificarCapitulo.reset();
        $("#frmModificarCapitulo").parent().hide("normal");
    }
}