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

$sql = "SELECT * FROM documento WHERE codProcedimiento = '" . $_POST["codProcedimiento"] . "' ORDER BY codDocumento DESC";
$resultado = mysqli_query($conexion, $sql);

$datos = "";
$i = 0;
while ($fila = mysqli_fetch_array($resultado)) {
    if ($i < 1) {
        $datos .= $fila["codDocumento"];
        $i++;
    }
}

if ($datos == "") {
    $procedimientoSub = substr($_POST["codProcedimiento"], 2);

    $sql = "INSERT INTO documento (codDocumento, codProcedimiento, nombDocumento, enlace) VALUES ('DOC" . $procedimientoSub . "-1', '" . $_POST["codProcedimiento"] . "', '" . $_POST["nombreDocumento"] . "', '" . $_POST["enlace"] . "');";
    $resultado = mysqli_query($conexion, $sql);
    $sql = "INSERT INTO registro (codRevision, codDocumento, fecha, descVersion, enlaceVersion) VALUES ('V" . $procedimientoSub . "-1-1', 'DOC" . $procedimientoSub . "-1', CURDATE(), 'Subida inicial del documento', '" . $_POST["enlace"] . "');";
    $resultado = mysqli_query($conexion, $sql);
} else {
    $datos++;
    $documentoSub = substr($datos, 3);

    $sql = "INSERT INTO documento (codDocumento, codProcedimiento, nombDocumento, enlace) VALUES ('$datos', '" . $_POST["codProcedimiento"] . "', '" . $_POST["nombreDocumento"] . "', '" . $_POST["enlace"] . "');";
    $resultado = mysqli_query($conexion, $sql);
    $sql = "INSERT INTO registro (codRevision, codDocumento, fecha, descVersion, enlaceVersion) VALUES ('V" . $documentoSub . "-1', '$datos', CURDATE(), 'Subida inicial del documento', '" . $_POST["enlace"] . "');";
    $resultado = mysqli_query($conexion, $sql);
}

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada correctamente";
}

echo json_encode($respuesta);

mysqli_close($conexion);
