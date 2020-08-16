if(typeof visited !== 'undefined') {
	var links = document.getElementsByTagName('a');
	for(var link in links) {
		var element = links[link];
		if (isVisited(element.href)) {
			element.style.color = linkColor;
		}
	}	
}

function isVisited(url) {
	if(url) {
		if(isYoutubeUrl(url)) {
			url = formatYoutubeUrl(url);
		}
		var key = getKey(url);
		if(visited[key]) {
			var path = url.replace(key, '');
			return visited[key].includes(path);
		}		
	}
	return false;
}

function getKey(url) {
	return new URL(url).origin;
}

function isYoutubeUrl(url){
	return url.includes('youtube') && url.includes('?');
}


function formatYoutubeUrl(url) {
	var keep = ["v"];
	var urlParts = url.split('?');
	var params = new URLSearchParams(urlParts[1]);	
	for (let k of params.keys()) {
		if(!keep.includes(k)) {
			params.delete(k);
		}
	}	
	params.delete('index');
	params.delete('loop');
	params.delete('fbclid');
	return urlParts[0] + '?' + params.toString();
}