<?php

use Slim\Http\Request;
use Slim\Http\Response;

$brandbar_exists = file_exists("../templates/brandbar.twig");

$app->get('/', function (Request $request, Response $response) {
    global $brandbar_exists;
    $viewData = [
        'brandbar_exists' => $brandbar_exists
    ];

    return $this->get('view')->render($response, 'index.twig', $viewData);
})->setName('root');

?>
