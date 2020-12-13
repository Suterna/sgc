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

$sql = "SELECT * FROM registro WHERE codDocumento = '" . $_POST["codDocumento"] . "' ORDER BY codRevision DESC";
$resultado = mysqli_query($conexion, $sql);

$datos = "";
$i = 0;
while ($fila = mysqli_fetch_array($resultado)) {
    if ($i < 1) {
        $datos .= $fila["codRevision"];
        $i++;
    }
}
if ($datos == "") {
    $documentoSub = substr($_POST["codDocumento"], 3);

    $sql = "INSERT INTO registro (codRevision, codDocumento, fecha, descVersion, enlaceVersion) VALUES ('V" . $documentoSub . "-1', '" . $_POST["codDocumento"] . "', CURDATE(),'" . $_POST["descripcionVersion"] . "', '" . $_POST["enlaceVersion"] . "');";
    $resultado = mysqli_query($conexion, $sql);
    $sql = "UPDATE documento SET enlace = '" . $_POST["enlaceVersion"] . "' WHERE codDocumento = '" . $_POST["codDocumento"] . "'";
    $resultado = mysqli_query($conexion, $sql);
} else {
    $datos++;
    $versionSub = substr($datos, 3);

    $sql = "INSERT INTO registro (codRevision, codDocumento, fecha, descVersion, enlaceVersion) VALUES ('$datos', '" . $_POST["codDocumento"] . "', CURDATE(),'" . $_POST["descripcionVersion"] . "', '" . $_POST["enlaceVersion"] . "');";
    $resultado = mysqli_query($conexion, $sql);
    $sql = "UPDATE documento SET enlace = '" . $_POST["enlaceVersion"] . "' WHERE codDocumento = '" . $_POST["codDocumento"] . "'";
    $resultado = mysqli_query($conexion, $sql);
}

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada correctamente";
}

echo json_encode($respuesta);

mysqli_close($conexion);
