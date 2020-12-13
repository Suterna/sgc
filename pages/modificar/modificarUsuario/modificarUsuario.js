"use strict";

rellenarDesplegableUsuarios();

function rellenarDesplegableUsuarios() {
    $.get("modificar/modificarUsuario/getUsuarios.php", null, procesoRespuestaGetUsuarios, 'html');
}

function procesoRespuestaGetUsuarios(sHTML) {
    $("#selectUsuarios").html(sHTML);
}

$("#btnModificarUsuario").click(function() {
    if (selectUsuarios.value == -1) {
        alert("Debe seleccionar un usuario");
    } else {
        $("div:not('#frmActualizarUsuario')").parent("section").hide("normal");

        if ($('#frmActualizarUsuario').length == 0) {
            $("<div>").appendTo('#formularios').load("modificar/modificarUsuario/actualizarUsuario.html",
                function() {
                    $.getScript("modificar/modificarUsuario/actualizarUsuario.js");
                });
            localStorage.setItem("rellenarFormulario", selectUsuarios.value);
        } else {
            localStorage.setItem("rellenarFormulario", selectUsuarios.value);
            // rellenarFormulario();
            $('#frmActualizarUsuario').parent().show("normal");
        }
    }
    return false;
});

$("#btnBorrarUsuario").click(function() {
    if (selectUsuarios.value == -1) {
        alert("Debe seleccionar un usuario");
    } else {
        let confirmacion = confirm("¿Está seguro de qué desea borrar este usuario?");
        if (confirmacion) {
            var oBorrarUsuario = {
                codUsuario: selectUsuarios.value
            };
            $.post("../pages/modificar/modificarUsuario/borrarUsuario.php", oBorrarUsuario, respuestaBorrarUsuario, 'json');
        } else {
            return false;
        }
    }
    return false;
});

function respuestaBorrarUsuario(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        alert(oDatos.mensaje);
        return false;
    } else {
        alert(oDatos.mensaje);
        $("#frmModificarUsuario").parent().hide("normal");
    }
}