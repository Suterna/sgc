"use strict";

function inicio() {
    if (localStorage["perfil"] == -1) {
        window.location = "login.html";
    }
    sesion.innerHTML = localStorage["sesion"];
    if (localStorage["perfil"] == 1 || localStorage["perfil"] == 2) {
        herramientas.innerHTML += '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Altas</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="javascript:abrirAltaCapitulos();">Capítulos</a> <a class="dropdown-item" href="javascript:abrirAltaProcedimientos();">Procedimientos</a> <a class="dropdown-item" href="javascript:abrirAltaDocumentos();">Documentos</a> <a class="dropdown-item" href="javascript:abrirAltaVersiones();">Versiones</a> </div></li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Gestionar</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="javascript:abrirModificarCapitulo();">Capítulos</a> <a class="dropdown-item" href="javascript:abrirModificarProcedimiento();">Procedimientos</a> <a class="dropdown-item" href="javascript:abrirModificarDocumento();">Documentos</a> <a class="dropdown-item" href="javascript:abrirModificarVersion();">Versiones</a> </div></li>';
        if (localStorage["perfil"] == 2) {
            herramientas.innerHTML += '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Usuarios</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="javascript:abrirAltaUsuario();">Crear usuario</a> <a class="dropdown-item" href="javascript:abrirModificarUsuario();">Gestionar</a> </div></li>';
        }
    }
}

$("#logout").click(function() {
    localStorage.setItem("perfil", -1);
    localStorage.setItem("sesion", "");
});

function abrirConsultarCapitulos() {
    // Oculto todos los formularios menos este
    $("div:not('#frmConsultarCapitulos')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmConsultarCapitulos').length == 0) {
        $("<div>").appendTo('#formularios').load("consultar/consultarCapitulos/consultarCapitulos.html",
            function() {
                $.getScript("consultar/consultarCapitulos/consultarCapitulos.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmConsultarCapitulos').parent().show("normal");
    }
}

function abrirConsultarProcedimientos() {
    // Oculto todos los formularios menos este
    $("div:not('#frmConsultarProcedimientos')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmConsultarProcedimientos').length == 0) {
        $("<div>").appendTo('#formularios').load("consultar/consultarProcedimientos/consultarProcedimientos.html",
            function() {
                $.getScript("consultar/consultarProcedimientos/consultarProcedimientos.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmConsultarProcedimientos').parent().show("normal");
    }
}

function abrirConsultarDocumentos() {
    // Oculto todos los formularios menos este
    $("div:not('#frmConsultarDocumentos')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmConsultarDocumentos').length == 0) {
        $("<div>").appendTo('#formularios').load("consultar/consultarDocumentos/consultarDocumentos.html",
            function() {
                $.getScript("consultar/consultarDocumentos/consultarDocumentos.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmConsultarDocumentos').parent().show("normal");
    }
}

function abrirConsultarVersiones() {
    // Oculto todos los formularios menos este
    $("div:not('#frmConsultarVersiones')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmConsultarVersiones').length == 0) {
        $("<div>").appendTo('#formularios').load("consultar/consultarVersiones/consultarVersiones.html",
            function() {
                $.getScript("consultar/consultarVersiones/consultarVersiones.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmConsultarVersiones').parent().show("normal");
    }
}

function abrirAltaUsuario() {
    // Oculto todos los formularios menos este
    $("div:not('#frmAltaUsuario')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaUsuario').length == 0) {
        $("<div>").appendTo('#formularios').load("altas/altaUsuario/altaUsuario.html",
            function() {
                $.getScript("altas/altaUsuario/altaUsuario.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaUsuario').parent().show("normal");
    }
}

function abrirAltaCapitulos() {
    // Oculto todos los formularios menos este
    $("div:not('#frmAltaCapitulos')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaCapitulos').length == 0) {
        $("<div>").appendTo('#formularios').load("altas/altaCapitulos/altaCapitulos.html",
            function() {
                $.getScript("altas/altaCapitulos/altaCapitulos.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaCapitulos').parent().show("normal");
    }
}

function abrirAltaProcedimientos() {
    // Oculto todos los formularios menos este
    $("div:not('#frmAltaProcedimientos')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaProcedimientos').length == 0) {
        $("<div>").appendTo('#formularios').load("altas/altaProcedimientos/altaProcedimientos.html",
            function() {
                $.getScript("altas/altaProcedimientos/altaProcedimientos.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaProcedimientos').parent().show("normal");
    }
}

function abrirAltaDocumentos() {
    // Oculto todos los formularios menos este
    $("div:not('#frmAltaDocumentos')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaDocumentos').length == 0) {
        $("<div>").appendTo('#formularios').load("altas/altaDocumentos/altaDocumentos.html",
            function() {
                $.getScript("altas/altaDocumentos/altaDocumentos.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaDocumentos').parent().show("normal");
    }
}

function abrirAltaVersiones() {
    // Oculto todos los formularios menos este
    $("div:not('#frmAltaVersiones')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmAltaVersiones').length == 0) {
        $("<div>").appendTo('#formularios').load("altas/altaVersiones/altaVersiones.html",
            function() {
                $.getScript("altas/altaVersiones/altaVersiones.js");
            });

    } else {
        // Lo muestro si está oculto
        $('#frmAltaVersiones').parent().show("normal");
    }
}

function abrirModificarUsuario() {
    // Oculto todos los formularios menos este
    $("div:not('#frmModificarUsuario')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmModificarUsuario').length == 0) {
        $("<div>").appendTo('#formularios').load("modificar/modificarUsuario/modificarUsuario.html",
            function() {
                $.getScript("modificar/modificarUsuario/modificarUsuario.js");
            });

    } else {
        // Lo muestro si está oculto
        rellenarDesplegableUsuarios();
        $('#frmModificarUsuario').parent().show("normal");
    }
}

function abrirModificarCapitulo() {
    // Oculto todos los formularios menos este
    $("div:not('#frmModificarCapitulo')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmModificarCapitulo').length == 0) {
        $("<div>").appendTo('#formularios').load("modificar/modificarCapitulo/modificarCapitulo.html",
            function() {
                $.getScript("modificar/modificarCapitulo/modificarCapitulo.js");
            });

    } else {
        // Lo muestro si está oculto
        rellenarDesplegableModificarCapitulos();
        $('#frmModificarCapitulo').parent().show("normal");
    }
}

function abrirModificarProcedimiento() {
    // Oculto todos los formularios menos este
    $("div:not('#frmModificarProcedimiento')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmModificarProcedimiento').length == 0) {
        $("<div>").appendTo('#formularios').load("modificar/modificarProcedimiento/modificarProcedimiento.html",
            function() {
                $.getScript("modificar/modificarProcedimiento/modificarProcedimiento.js");
            });

    } else {
        // Lo muestro si está oculto
        rellenarDesplegableCapitulosModificarProcedimiento();
        $('#frmModificarProcedimiento').parent().show("normal");
    }
}

function abrirModificarDocumento() {
    // Oculto todos los formularios menos este
    $("div:not('#frmModificarDocumento')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmModificarDocumento').length == 0) {
        $("<div>").appendTo('#formularios').load("modificar/modificarDocumento/modificarDocumento.html",
            function() {
                $.getScript("modificar/modificarDocumento/modificarDocumento.js");
            });

    } else {
        // Lo muestro si está oculto
        rellenarDesplegableCapitulosModificarDocumento();
        $('#frmModificarDocumento').parent().show("normal");
    }
}

function abrirModificarVersion() {
    // Oculto todos los formularios menos este
    $("div:not('#frmModificarVersion')").parent("section").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmModificarVersion').length == 0) {
        $("<div>").appendTo('#formularios').load("modificar/modificarVersion/modificarVersion.html",
            function() {
                $.getScript("modificar/modificarVersion/modificarVersion.js");
            });

    } else {
        // Lo muestro si está oculto
        rellenarDesplegableCapitulosModificarVersion();
        $('#frmModificarVersion').parent().show("normal");
    }
}