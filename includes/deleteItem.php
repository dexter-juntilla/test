<?php

if($_GET['action'] === "deleteItem"){

	$stmt = $db->prepare('DELETE FROM items WHERE id = ?');
	$stmt->execute([$_GET['id']]);
}