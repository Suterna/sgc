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
$sql = "SELECT * FROM usuarios WHERE codUsuario = " . $_POST["codUsuario"];
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$datos = [];

while ($fila = mysqli_fetch_array($resultados)) {
    $datos['rfCodUsuario'] = $fila["codUsuario"];
    $datos['rfNombreUsuario'] = $fila["nombreUsuario"];
    $datos['rfNombre'] = $fila["nombre"];
    $datos['rfApellidos'] = $fila["apellidos"];
    $datos['rfPerfil'] = $fila["perfil"];
    $datos['rfContraseña'] = $fila["contraseña"];
}

// Devuelvo el fragmento HTML
echo json_encode($datos);

mysqli_close($conexion);
