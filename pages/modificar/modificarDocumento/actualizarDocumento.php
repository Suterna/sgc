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

$sql = "UPDATE documento SET nombDocumento = '" . $_POST["nombDocumento"] . "' WHERE codDocumento = '" . $_POST["codDocumento"] . "'";
$resultado = mysqli_query($conexion, $sql);

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Actualización realizada correctamente";
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al actualizar";
}

echo json_encode($respuesta);

mysqli_close($conexion);
