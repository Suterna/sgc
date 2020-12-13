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

$sql = "SELECT * FROM registro WHERE codDocumento = '" . $_GET["codDocumento"] . "'";
$resultado = mysqli_query($conexion, $sql);

$datos = '<thead><tr><th id="codVersionConsultarVersionesTabla" name="codVersionConsultarVersionesTabla" onclick="javascript:hacerSortableConsultarVersiones()">Código versión</th><th id="codDocumentoConsultarVersionesTabla" name="codDocumentoConsultarVersionesTabla" onclick="javascript:hacerSortableConsultarVersiones()">Código documento</th><th id="fechaConsultarVersionesTabla" name="fechaConsultarVersionesTabla" onclick="javascript:hacerSortableConsultarVersiones()">Fecha subida</th><th id="descVersionConsultarVersionesTabla" name="descVersionConsultarVersionesTabla" onclick="javascript:hacerSortableConsultarVersiones()">Descripción versión</th><th>Ver documento</th></tr></thead><tbody>';

while ($fila = mysqli_fetch_array($resultado)) {
    $datos .= '<tr><td>' . $fila["codRevision"] . '</td><td>' . $fila["codDocumento"] . '</td><td>' . $fila["fecha"] . '</td><td>' . $fila["descVersion"] . '</td><td><a href="' . $fila["enlaceVersion"] . '" target="_blank"><img src="../images/lupa.png" width="40px" height="40px"></a></td></tr>';
}

$datos .= "</tbody>";
// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
