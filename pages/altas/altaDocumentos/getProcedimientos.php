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
$sql = "SELECT codProcedimiento, nombProcedimiento FROM procedimiento WHERE codCapitulo = ' " . $_GET["capituloSeleccionado"] . " ' ORDER BY codProcedimiento";
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$datos = "<option value='-1'>Seleccione un procedimiento</option>";

while ($fila = mysqli_fetch_array($resultados)) {
    $datos .= '<option value="' . $fila["codProcedimiento"] . '">' . $fila["codProcedimiento"] . ' - ' . $fila["nombProcedimiento"] . '</option>';
}

// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
