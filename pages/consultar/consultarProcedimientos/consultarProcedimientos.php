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

if ($_GET["codCapitulo"] == -1) {
    $sql = "SELECT * FROM procedimiento";
} else {
    $sql = "SELECT * FROM procedimiento WHERE codCapitulo = '" . $_GET["codCapitulo"] . "'";
}
$resultado = mysqli_query($conexion, $sql);

$datos = '<thead><tr><th id="codProcedimientoConsultarProcedimientosTabla" name="codProcedimientoConsultarProcedimientosTabla" onclick="javascript:hacerSortableConsultarProcedimientos()">Código procedimiento</th><th id="codCapituloConsultarProcedimientosTabla" name="codCapituloConsultarProcedimientosTabla" onclick="javascript:hacerSortableConsultarProcedimientos()">Código capítulo</th><th id="nombProcedimientoConsultarProcedimientosTabla" name="nombProcedimientoConsultarProcedimientosTabla" onclick="javascript:hacerSortableConsultarProcedimientos()">Nombre procedimiento</th><th id="descProcedimientoConsultarProcedimientosTabla" name="descProcedimientoConsultarProcedimientosTabla" onclick="javascript:hacerSortableConsultarProcedimientos()">Descripción procedimiento</th></tr></thead><tbody>';

while ($fila = mysqli_fetch_array($resultado)) {
    $datos .= '<tr><td>' . $fila["codProcedimiento"] . '</td><td>' . $fila["codCapitulo"] . '</td><td>' . $fila["nombProcedimiento"] . '</td><td>' . $fila["descProcedimiento"] . '</td></tr>';
}

$datos .= "</tbody>";
// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
