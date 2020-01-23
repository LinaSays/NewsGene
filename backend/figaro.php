<?php 

header('Content-Type: text/html; charset=utf-8');
header("Access-Control-Allow-Origin: *");
ini_set('max_execution_time', 0);
setlocale(LC_ALL,'fr_FR.UTF-8');

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
    $pos = mb_strpos($html_replace, $b);
    $title = $valeur->news->title;
    $loc = str_replace('-', ' ', $valeur->loc);
    if ($pos !== false) {
        $cmd_title = "C:\Users\Alina\AppData\Local\Programs\Python\Python38\python.exe verbs.py $title";
        $cmd_url = "C:\Users\Alina\AppData\Local\Programs\Python\Python38\python.exe verbs.py $loc";
        $return_val_title = exec($cmd_title);
        $return_val_url = exec($cmd_url);
        $results[] = [
            'title' => strval($title),
            'url' => strval($valeur->loc),
            'publication_date' => strval($valeur->news->publication_date),
            'name' => strval($valeur->news->publication->name),
            'verb_title' => strval($return_val_title),
            'verb_url' => strval($return_val_url),
        ];
    }
}

print_r(json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));