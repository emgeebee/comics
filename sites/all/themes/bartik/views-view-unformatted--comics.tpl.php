<?php
	$i = 0;
	foreach ($rows as $id => $row){
		$i++;
		print('<li class="li' . $i . '">');
			print($row);
		print('</li>');
	}
?>