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
$sql = "SELECT * FROM capitulo ORDER BY codCapitulo";
$resultados = mysqli_query($conexion, $sql);

$datos = '<thead><tr><th id="codCapituloConsultarCapitulosTabla" name="codCapituloConsultarCapitulosTabla" onclick="javascript:hacerSortable()">Código capítulo</th><th id="nombCapituloConsultarCapitulosTabla" name="nombCapituloConsultarCapitulosTabla" onclick="javascript:hacerSortable()">Código capítulo</th></tr></thead><tbody>';

while ($fila = mysqli_fetch_array($resultados)) {
    $datos .= '<tr><td>' . $fila["codCapitulo"] . '</td><td>' . $fila["nombCapitulo"] . '</td></tr>';
}

$datos .= "</tbody>";
// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
