<?php
	foreach ($fields as $id => $field){
		print('<div class="' . $id . '">');
			print($field->content);
		print('</div>');
	}
?>
