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

$sql = "DELETE FROM registro WHERE codRevision = '" . $_POST["codRevision"] . "'";
$resultado = mysqli_query($conexion, $sql);

if ($resultado == 1) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Versión borrada correctamente";
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "No se ha podido borrar la versión";
}

echo json_encode($respuesta);

mysqli_close($conexion);
