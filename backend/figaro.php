<?php 

header("Access-Control-Allow-Origin: *");

$url = 'https://www.lefigaro.fr/sitemap_news.xml'; // sitemap
$html = htmlentities(file_get_contents('https://www.lefigaro.fr/')); // homepage
$html_replace = str_replace('&quot;', '"', $html);

$data = file_get_contents($url); 
$xml_string = str_replace('news:', '', $data);
$xml_string2 = str_replace('https://www.lefigaro.fr/', '', $xml_string);
$xml = simplexml_load_string($xml_string2);

$json = json_encode($xml, JSON_PRETTY_PRINT);
//print_r($json);

$results = array();
foreach ($xml->url as $clé => $valeur) {
    $a = explode("a href=\"", $html_replace);
    $b = strval($valeur->loc);
    $pos = strpos($html_replace, $b);
    if ($pos !== false) {
        $results[] = $valeur;
    }
}

print_r(json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));