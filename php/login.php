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

$user = $_POST["usuario"];
$pass = $_POST["password"];

$sql = "SELECT perfil FROM usuarios where nombreUsuario = '$user' AND contraseña = '$pass';";
$resultado = mysqli_query($conexion, $sql);

$datos = "";

while ($fila = mysqli_fetch_array($resultado)) {
    $datos .= $fila["perfil"];
}

echo $datos;

mysqli_close($conexion);
