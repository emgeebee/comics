<?php
	foreach ($fields as $id => $field){
		print('<span class="' . $id . '">');
			print($field->content);
		print('</span>');
	}
?>
