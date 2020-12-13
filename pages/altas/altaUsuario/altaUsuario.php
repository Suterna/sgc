<?php

// Configuración BASE DE DATOS MYSQL
$servidor = "localhost";
$basedatos = "sgc";
$usuario = "root";
$password = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password, $basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");
mysqli_query($conexion, "utf8");

$sql = "SELECT * FROM usuarios WHERE nombreUsuario = '" . $_POST["nombreUsuario"] . "'";
$resultado = mysqli_query($conexion, $sql);

$datos = "";

while ($fila = mysqli_fetch_array($resultado)) {
    $datos .= $fila["nombreUsuario"];
}

if ($datos != "") {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "El nombre de usuario ya esta registrado, introduzca uno distinto";
} else {
    $sql = "INSERT INTO usuarios (nombreUsuario, nombre, apellidos, contraseña, perfil) VALUES ('" . $_POST["nombreUsuario"] . "', '" . $_POST["nombre"] . "', '" . $_POST["apellidos"] . "', '" . $_POST["contraseña"] . "', '" . $_POST["perfil"] . "');";
    $resultado = mysqli_query($conexion, $sql);

    if ($resultado) {
        $respuesta["error"] = 0;
        $respuesta["mensaje"] = "Alta realizada correctamente";
    }
}

echo json_encode($respuesta);

mysqli_close($conexion);
