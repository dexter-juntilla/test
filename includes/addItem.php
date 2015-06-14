<?php

if($_GET['action'] === "addItem"){

	$stmt = $db->prepare('INSERT INTO items(items) VALUES(?)');
	$stmt->execute([$_GET['item']]);

	$stmt2 = $db->prepare('SELECT * FROM items ORDER BY id DESC LIMIT 1');
	$stmt2->execute();

	$result_set = $stmt2->fetchAll(PDO::FETCH_ASSOC);
	header('Content-Type: application/json');
	echo json_encode($result_set);	
}
