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
    $sql = "SELECT * FROM documento";
} else if ($_GET["codProcedimiento"] == -1) {
    $codProcedimientoProvisional = "PR" . $_GET["codCapitulo"] . "-";
    $sql = "SELECT * FROM documento WHERE codProcedimiento LIKE '" . $codProcedimientoProvisional . "%'";
} else {
    $sql = "SELECT * FROM documento WHERE codProcedimiento = '" . $_GET["codProcedimiento"] . "'";
}
$resultado = mysqli_query($conexion, $sql);

$datos = '<thead><tr><th id="codDocumentoConsultarDocumentosTabla" name="codDocumentoConsultarDocumentosTabla" onclick="javascript:hacerSortableConsultarDocumentos()">Código documento</th><th id="codProcedimientoConsultarDocumentosTabla" name="codProcedimientoConsultarDocumentosTabla" onclick="javascript:hacerSortableConsultarDocumentos()">Código procedimiento</th><th id="nombDocumentoConsultarDocumentosTabla" name="nombDocumentoConsultarDocumentosTabla" onclick="javascript:hacerSortableConsultarDocumentos()">Nombre documento</th><th>Ver documento</th></tr></thead><tbody>';

while ($fila = mysqli_fetch_array($resultado)) {
    $datos .= '<tr><td>' . $fila["codDocumento"] . '</td><td>' . $fila["codProcedimiento"] . '</td><td>' . $fila["nombDocumento"] . '</td><td><a href="' . $fila["enlace"] . '" target="_blank"><img src="../images/lupa.png" width="40px" height="40px"></a></td></tr>';
}

$datos .= "</tbody>";
// Devuelvo el fragmento HTML
echo $datos;

mysqli_close($conexion);
