<?php
	if ($pager){
		print('<div class="pager1">');
			print $pager;
		print('</div>');
	}
	if ($rows){
		print($rows);
	}
	if ($pager){
		print('<div class="pager2">');
			print $pager;
		print('</div>');
	}
?>