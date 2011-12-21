function magazineInit(){
	buildMag('1');
	buildNav();
}

function toggleComicNav() {
	$('#comic-nav').animate(
		{
			height: ['toggle', 'easeOutBounce'], 
			paddingBottom: 10
		}, 
		200,
		function() {
		}
	);
}

function buildNav(offset){
	if(!offset){
		var offset = 0;
	}
	var nextPage = parseInt(offset) + 1;
	var prevPage = parseInt(offset) + 1;
	var nid;
	$.ajax({
		url:'?q=comics/&page=' + offset,
		success: function(data) {
			$('#comic-nav').html(data);
			$('#comic-nav-elems>li').each(function(i){
				nid = $(this).find('.nid').text();
				$(this).find('img').bind("click", function(){
					buildMag("'" + nid + "'");
				});
			});
			toggleComicNav();
			$.each($('.pager>*>a'), function(i, value) {
					$(this)[i].setAttribute('href', '#');
			});
			$('.pager-previous>a').bind('click', function(){
				toggleComicNav();
				buildNav(prevPage);
			});
			$('.pager-next>a').bind('click', function(){
				toggleComicNav();
				buildNav(nextPage);
			});
		}
	})
	$('#comic-nav-handle').hover(toggleComicNav);
}

function buildMag(id){
	$.getJSON('?q=comic-contents/' + id, function(data) {
		var items = [];
		var pageDiv;
		var pageId;
		var image;
		data.title;
		data.totalpages;

		$.each(data, function(key, chapter) {
				pageDiv = document.createElement('div');
				pageId = key;
				pageDiv.setAttribute('title', chapter.body);
				pageDiv.id = pageId;
				image = document.createElement('img');
				image.setAttribute('src', chapter.field_page);
				$('.b-load').append(pageDiv);
				$('#' + pageId).append(image);
		});
		
		$('#magazine').booklet({
			width:    1024,
			height:   768,
			menu: '#custom-menu',
			pagePadding: 0,
			manual: false,
			pageSelector: true,
			closed: true,
	        covers: false,
			autoCenter: true,
			speed:3000
		});
	});
}

$(document).ready(magazineInit);
