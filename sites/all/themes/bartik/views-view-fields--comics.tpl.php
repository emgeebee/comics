<?php
	foreach ($fields as $id => $field){
		print('<span class="' . $id . '">');
			print('<div>');
				print($field->content);
			print('</div>');
		print('</span>');
	}
?>
