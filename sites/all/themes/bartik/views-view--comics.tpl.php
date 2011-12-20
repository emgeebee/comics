<?php
	if ($rows){
		print($rows);
	}
	if ($pager){
		print('<li class="pager">');
			print $pager;
		print('</li>');
	}
?>