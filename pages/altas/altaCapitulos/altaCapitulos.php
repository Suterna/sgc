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

$sql = "SELECT * FROM capitulo ORDER BY codCapitulo DESC";
$resultado = mysqli_query($conexion, $sql);

$datos = "";
$i = 0;
while ($fila = mysqli_fetch_array($resultado)) {
    if ($i < 1) {
        $datos .= $fila["codCapitulo"];
        $i++;
    }
}

if ($datos == "") {
    $sql = "INSERT INTO capitulo (codCapitulo, nombCapitulo) VALUES ('1', '" . $_POST["nombreCapitulo"] . "');";
    $resultado = mysqli_query($conexion, $sql);
} else {
    $datos++;

    $sql = "INSERT INTO capitulo (codCapitulo, nombCapitulo) VALUES ('$datos', '" . $_POST["nombreCapitulo"] . "');";
    $resultado = mysqli_query($conexion, $sql);
}

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada correctamente";
}

echo json_encode($respuesta);

mysqli_close($conexion);
