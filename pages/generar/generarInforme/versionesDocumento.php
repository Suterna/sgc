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

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT * FROM registro WHERE codDocumento = '" . $_GET["documentoSeleccionado"] . "' ORDER BY codRevision";
$resultados = mysqli_query($conexion, $sql);

$datos = "";

while ($fila = mysqli_fetch_array($resultados)) {
    $datos .= 'Código de la versión: ' . $fila["codRevision"] . '<br>Descripción: ' . $fila["descVersion"] . '<br>Enlace: ' . $fila["enlaceVersion"] . '<br>';
}

// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
