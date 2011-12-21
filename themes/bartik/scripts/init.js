var initCounter = 0;
var initSuccess = 0;
function magazineInit(){
	buildMag('1');
	buildNav(0, 0);
	animateNav();
}

function animateNav(){
	if(initCounter < 50 && initSuccess < 2){
		initCounter++;
		setTimeout('animateNav()', 50);
		return;
	}
	$('#custom-menu>div').each(function(){
		$(this).bind('hover', '');
		$(this).bind('click', function(){
			$(this).find('ul').animate(
				{
					height: ['toggle', 'easeOutBounce'], 
					paddingBottom: 10
				}, 
				1000,
				function() {
				}
			)
		})
	});
	$('#custom-menu>div').each(function(){
		$(this).click();
	})

}

function buildNav(offset, click){
	if(!offset){
		var offset = 0;
	}
	var nextPage = parseInt(offset) + 1;
	var prevPage = parseInt(offset) + 1;
	var nid;
	$.ajax({
		url:'?q=comics/&page=' + offset,
		success: function(data) {
			initSuccess++;
			$('#comic-nav').html(data);
			$('#comic-nav-elems>li').each(function(i){
				nid = $(this).find('.nid').text();
				$(this).find('img').bind("click", function(){
					buildMag("'" + nid + "'");
				});
			});
			$.each($('.pager>*>a'), function(i, value) {
					$(this)[i].setAttribute('href', '#');
			});
			$('.pager-previous>a').bind('click', function(){
				buildNav(prevPage, 1);
			});
			$('.pager-next>a').bind('click', function(){
				buildNav(nextPage, 1);
			});
		}
	})
}

function buildMag(id){
	$.getJSON('?q=comic-contents/' + id, function(data) {
		initSuccess++;
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
			width:    824,
			height:   618,
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
