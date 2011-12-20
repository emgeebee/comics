<?php
	$length = count($fields);
	$i = 0;
	foreach ($fields as $id => $field){
		$i++;
		print('"');
		print($id);
		print('":"');
		print($field->content);
		print('"');
		if($i < $length){
			print(',');
		}
	}
?>
