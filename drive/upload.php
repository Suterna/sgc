<?php

include_once 'google-api-php-client-2.2.4/vendor/autoload.php';

//configurar variable del entorno
putenv('GOOGLE_APPLICATION_CREDENTIALS=credenciales.json');

$client = new Google_Client();
$client->useApplicationDefaultCredentials();
$client->setScopes(['https://www.googleapis.com/auth/drive.file']);

try {
//instanciamos el servicio
    $service = new Google_Service_Drive($client);

//ruta al archivo
    $file_path = 'word_ejemplo.docx';

//instacia de archivo
    $file = new Google_Service_Drive_DriveFile();
    $file->setName("word_ejemplo.docx");

//obtenemos el mime type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $file_path);

//id de la carpeta donde hemos dado el permiso a la cuenta de servicio
    $file->setParents(array("1aQ1YrEGekjhH6ziouuDfvZ5gH5fmYD7w"));
    $file->setDescription('archivo subido desde php');
    $file->setMimeType($mime_type);

    $result = $service->files->create(
        $file,
        array(
            'data' => file_get_contents($file_path),
            'mimeType' => $mime_type,
            'uploadType' => 'media',
        )
    );

    echo '<a href="https://drive.google.com/open?id=' . $result->id . '" target="_blank">' . $result->name . '</a>';

} catch (Google_Service_Exception $gs) {

    $m = json_decode($gs->getMessage());
    echo $m->error->message;

} catch (Exception $e) {
    echo $e->getMessage();

}
