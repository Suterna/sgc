"use strict";

function inicio() {
    if (localStorage["perfil"] == -1) {
        window.location = "login.html";
    }
    sesion.innerHTML = localStorage["sesion"];
    if (localStorage["perfil"] == 1 || localStorage["perfil"] == 2) {
        herramientas.innerHTML += '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Altas</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="#">Capítulos</a> <a class="dropdown-item" href="#">Procedimientos</a> <a class="dropdown-item" href="#">Documentos</a> <a class="dropdown-item" href="#">Versiones</a> </div></li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bajas</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="#">Capítulos</a> <a class="dropdown-item" href="#">Procedimientos</a> <a class="dropdown-item" href="#">Documentos</a> <a class="dropdown-item" href="#">Versiones</a> </div></li><li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Modificar</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="#">Capítulos</a> <a class="dropdown-item" href="#">Procedimientos</a> <a class="dropdown-item" href="#">Documentos</a> <a class="dropdown-item" href="#">Versiones</a> </div></li>';
        if (localStorage["perfil"] == 2) {
            herremientas.innerHTML += '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Usuarios</a> <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item" href="#">Crear usuario</a> <a class="dropdown-item" href="#">Gestionar</a> </div></li>';
        }
    }
}

$("#logout").click(function() {
    console.log("entra");
    localStorage.setItem("perfil", -1);
    localStorage.setItem("sesion", "");
});