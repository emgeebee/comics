<?php
	$length = count($rows);
	$i = 0;
	foreach ($rows as $id => $row){
		$i++;
		print('{');
		print($row);
		print('}');
		if($i < $length){
			print(',');
		}
	}
?>
