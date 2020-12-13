<?php

// Configuración BASE DE DATOS MYSQL
$servidor = "localhost";
$basedatos = "sgc";
$usuario = "root";
$password = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password, $basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT codCapitulo, nombCapitulo FROM capitulo ORDER BY codCapitulo";
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$datos = "<option value='-1'>Seleccione un capítulo</option>";

while ($fila = mysqli_fetch_array($resultados)) {
    $datos .= '<option value="' . $fila["codCapitulo"] . '">' . $fila["codCapitulo"] . ' - ' . $fila["nombCapitulo"] . '</option>';
}

// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
