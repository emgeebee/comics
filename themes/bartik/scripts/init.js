function magazineInit(){
	buildMag('1');
	buildNav();
}

function toggleComicNav() {
	$('#comic-nav').animate(
		{
			width: ['toggle', 'swing'],
			height: ['toggle', 'swing']
		}, 
		1000,
		function() {
		}
	);
}

function buildNav(offset){
console.log('here');
	$.ajax({
		url:'?q=comics/' + offset,
		success: function(data) {
			$('#comic-nav').html(data);
			toggleComicNav();
		}
	})
	$('#comic-nav-handle').click(toggleComicNav);
}

function buildMag(id){
	$.getJSON('?q=comic-contents/' + id, function(data) {
		var items = [];
		var pageDiv;
		var pageId;
		var image;
		data.title;
		data.totalpages;
		/*
		var newChapter;
		$.each(data.chapters, function(key, chapter) {
				newChapter = 1;
				$.each(chapter.pages, function(i, page){
					pageDiv = document.createElement('div');
					if(newChapter == 1){
						pageDiv.setAttribute('rel', chapter.title);
						newChapter = 0;
					}
					pageId = key + '-' + i;
					pageDiv.setAttribute('title', page.body);
					pageDiv.id = pageId;
					image = document.createElement('img');
					image.setAttribute('src', page.field_page);
					$('.b-load').append(pageDiv);
					$('#' + pageId).append(image);
				});
		});*/
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
