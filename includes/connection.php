<?php

try{
    $db = new PDO('mysql:host=127.0.0.1;dbname=designriver', 'root', 'ayeshraine');
}catch(PDException $e){
    echo $e->getMessage();
}