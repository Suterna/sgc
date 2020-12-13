"use strict";

$("#btnAltaCapitulos").click(function() {
    if (nombreCapitulo.value == "") {
        respuesta.innerHTML = "Debe rellenar todos los campos";
    } else {
        respuesta.innerHTML = "";
        var oAltaCapitulos = {
            nombreCapitulo: nombreCapitulo.value
        };
        $.post("../pages/altas/altaCapitulos/altaCapitulos.php", oAltaCapitulos, respuestaAltaCapitulos, 'json');
    }
    return false;
});

function respuestaAltaCapitulos(oDatos, sStatus, oXHR) {
    if (oDatos.error) {
        respuesta.innerHTML = oDatos.mensaje;
        return false;
    } else {
        alert(oDatos.mensaje);
        formAltaCapitulos.reset();
        $("#frmAltaCapitulos").parent().hide("normal");
    }
}