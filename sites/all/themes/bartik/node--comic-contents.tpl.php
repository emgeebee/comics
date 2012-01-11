<?
$arg = explode('/',$_GET['q']);
print views_embed_view('comic_contents', 'comics', $arg[1]);
//render($content);
?>