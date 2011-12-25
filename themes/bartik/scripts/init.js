var initCounter = 0;
var initSuccess = 0;
function magazineInit(){
	//buildMag('1');
	isBookmark();
	buildNav(0, 0);
	initNav();
	$('#comic-nav').jSlickmenu();
}

function initNavUL(div, time){
	div.parent().find('ul').animate(
		{
			height: ['toggle', 'easeOutBounce'], 
			paddingBottom: 10
		}, 
		time,
		function() {
		}
	)
}

function initNavElement(elem){
	elem.bind('hover', '');
	elem.bind('click',
		function(){
			initNavUL(elem, 1000);
		}
	);
}

function initNav(){
	if(initCounter < 50 && initSuccess < 1){
		initCounter++;
		setTimeout('initNav()', 50);
		return;
	}
	$('#custom-menu>div>span').each(function(){
		initNavElement($(this));
	})
	$('#custom-menu>div>span').each(function(){
		$(this).click();
	})
}

function buildNav(offset, click){
	$('#comic-nav>*>a').bind("click", '');
	if(!offset){
		var offset = 0;
	}
	var nextPage = parseInt(offset) + 1;
	var prevPage = parseInt(offset) - 1;
	$.ajax({
		url:'?q=comics/&page=' + offset,
		success: function(data) {
			initSuccess++;
			$('#comic-nav').html(data);
			$('#comic-nav>li').each(function(i){
				$(this).find('img').bind({
					"click":function(){
						var nid = $(this).parent().parent().find('.nid').text();
						var title = $(this).parent().parent().find('.title').text();
						buildMag(nid, true, title, 0);
					},
					"mouseenter":function(){
						$(this).parent().parent().parent().addClass('fade');
						$(this).parent().parent().addClass('selected');
					},
					"mouseout":function(){
						$(this).parent().parent().parent().removeClass('fade');
						$(this).parent().parent().removeClass('selected');
					}
				});
			})
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

function isBookmark(){
	if(window.location.href){
		var locationArray = window.location.href.split('#');
		var page;
		var magId;
		var title;
		if(!locationArray[1]){
			return;
		}
		var magArray = locationArray[1].split('/');
		if(!magArray[1] || !magArray[0]){
			return;
		} else {
			magId = magArray[1];
			title = magArray[0];
		}
		if(!magArray[2]){
			page = 1;
		} else {
			page = magArray[2]
		}
		buildMag(magId, false, title, page);
	}
}

function updateURL(newPage, newMag, newId){
	if(window.location.href){
		var locationArray = window.location.href.split('#');
		if(!locationArray[1]){
			locationArray = [window.location.href, "/"];
		}
		var magArray = locationArray[1].split('/');
		if(!newPage){
			var page = magArray[2];
		} else{
			var page = newPage;
		}
		if(!newMag){
			var magId = magArray[1];
			var mag = magArray[0];
		} else {
			var magId = newId;
			var mag = newMag;
		}
		window.location.href = locationArray[0] + '#' + mag + '/' + magId + '/' + page;
	}
}

function buildMag(id, click, title, page){
	$('.b-selector-page').remove();
	$('.b-load>div').remove();
	updateURL(page, title, id);
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
			width:    824,
			height:   618,
			menu: '#custom-menu',
			pagePadding: 0,
			manual: false,
			pageSelector: true,
			closed: true,
	        covers: false,
			autoCenter: true,
			speed:1000,
			after: function(opts){
				updateURL(opts.curr);
			}
		});
		$("#magazine").booklet(parseInt(page));

		if(click){
			initNavElement($('#custom-menu>.b-selector-page>span'));
		}
	});
}

$(document).ready(magazineInit);
