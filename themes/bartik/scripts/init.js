function magazineInit(){
	buildMag('1');
}

function buildMag(id){

	var magazine = document.createElement('div');
	magazine.id = 'comic';

	$.getJSON('?q=comic-contents/' + id, function(data) {
		var items = [];
		var pageDiv;
		var pageId;
		var image;
		var newChapter;
		data.title;
		data.totalpages;
		/*
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
				newChapter = 1;
				pageDiv = document.createElement('div');
				if(newChapter == 1){
					pageDiv.setAttribute('rel', chapter.title);
					newChapter = 0;
				}
				pageId = key;
				pageDiv.setAttribute('title', chapter.body);
				pageDiv.id = pageId;
				image = document.createElement('img');
				image.setAttribute('src', chapter.field_page);
				$('.b-load').append(pageDiv);
				$('#' + pageId).append(image);
		});
		
		$('#magazine').booklet({
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
