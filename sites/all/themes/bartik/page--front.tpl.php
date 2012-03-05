<div id="page-wrapper">
	<div id="page">

		<?php if ($messages): ?>
			<div id="messages">
				<div class="section clearfix">
					<?php print $messages; ?>
				</div>
			</div> <!-- /.section, /#messages -->
		<?php endif; ?>

		<?php if ($page['featured']): ?>
			<div id="featured"><div class="section clearfix">
				<?php print render($page['featured']); ?>
			</div></div> <!-- /.section, /#featured -->
		<?php endif; ?>

		<div id="main-wrapper" class="clearfix">
			<div id="sidebar-first" class="column sidebar">

			</div> <!-- /.section, /#sidebar-first -->
			<div id="main" class="clearfix">
				<div id="custom-menu" class="b-menu">
					<h1 id="site-name"<?php if ($hide_site_name) { print ' class="element-invisible"'; } ?>>
						<a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
					</h1>
					<div id="comic-nav-handle" class="b-selector b-comics">
						<span id="" class="b-current">More A-Tomic Comics</span>
						<ul id="comic-nav" class="b-selector">
						</ul>
					</div>
				</div>
				<div id="magazine" class="column">
					<div class='b-load'>
					</div>
				</div>
			</div>
		</div>
		<div id="footer-wrapper">
			<div class="section">
			</div>
		</div> <!-- /.section, /#footer-wrapper -->
	</div>
</div> <!-- /#page, /#page-wrapper -->
