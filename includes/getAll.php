<?php

if($_GET['action'] === "getAll"){
	
	$stmt = $db->prepare('SELECT * FROM items ORDER BY id DESC');
	$stmt->execute();
	$result_set = $stmt->fetchAll(PDO::FETCH_ASSOC);
	header('Content-Type: application/json');
	echo json_encode($result_set);
}
