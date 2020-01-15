<?php 

header("Access-Control-Allow-Origin: *");

$url = 'https://www.lefigaro.fr/sitemap_news.xml';
$data = file_get_contents($url); 
$xml_string = str_replace('news:', '', $data);
$xml = simplexml_load_string($xml_string);
$json = json_encode($xml, JSON_PRETTY_PRINT);
print_r($json);
