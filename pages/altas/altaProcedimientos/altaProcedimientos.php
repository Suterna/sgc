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

$sql = "SELECT * FROM procedimiento WHERE codCapitulo = ' " . $_POST["codCapitulo"] . " ' ORDER BY codProcedimiento DESC";
$resultado = mysqli_query($conexion, $sql);

$datos = "";
$i = 0;
while ($fila = mysqli_fetch_array($resultado)) {
    if ($i < 1) {
        $datos .= $fila["codProcedimiento"];
        $i++;
    }
}

if ($datos == "") {
    $sql = "INSERT INTO procedimiento (codProcedimiento, codCapitulo, nombProcedimiento, descProcedimiento) VALUES ('PR" . $_POST["codCapitulo"] . "-1', '" . $_POST["codCapitulo"] . "', '" . $_POST["nombreProcedimiento"] . "', '" . $_POST["descripcion"] . "');";
    $resultado = mysqli_query($conexion, $sql);
} else {
    $datos++;

    $sql = "INSERT INTO procedimiento (codProcedimiento, codCapitulo, nombProcedimiento, descProcedimiento) VALUES ('$datos', '" . $_POST["codCapitulo"] . "', '" . $_POST["nombreProcedimiento"] . "', '" . $_POST["descripcion"] . "');";
    $resultado = mysqli_query($conexion, $sql);
}

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada correctamente";
}

echo json_encode($respuesta);

mysqli_close($conexion);
