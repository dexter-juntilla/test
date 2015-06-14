<?php
if($_GET['action'] === "changeItem"){

	$stmt = $db->prepare('UPDATE items SET items = ? WHERE id = ?');
	$stmt->execute([$_GET['item'], $_GET['id']]);
}
