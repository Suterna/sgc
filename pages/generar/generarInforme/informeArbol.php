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
$sql = "SELECT * FROM documento WHERE codProcedimiento = '" . $_GET["procedimientoSeleccionado"] . "' ORDER BY codDocumento";
$resultados = mysqli_query($conexion, $sql);

$datos = "";

while ($fila = mysqli_fetch_array($resultados)) {
    $datos .= 'Código del documento: ' . $fila["codDocumento"] . ' / Nombre documento: ' . $fila["nombDocumento"] . '<br>Enlace: ' . $fila["enlace"] . '<br>';
}

// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
