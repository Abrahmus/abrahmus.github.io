
$(document).ready(function(){

	var bubbleContainer = $('#bubbles');

	//for (var i = 5; i > 0; i--) {
		
		//var f = new Fountain(200 * i, 10, bubbleContainer);

		//f.start();	
	//};
	
	var f = new Fountain(200, 100, bubbleContainer);

	f.IsFixedPoint(false);
		
	f.start();

});

var Fountain = function(horizontalPosition, nBubbles, container){
	
	var horizontalPosition = horizontalPosition;

	var nBubbles = nBubbles;

	var container = container;

	var fixedPoint = true;

	this.IsFixedPoint = function(fp){

		fixedPoint = fp;
	}

	this.start = function(){

		generateBubbles(nBubbles);
	}

	var generateBubbles = function(bubbles){

		var remainingBubbles = bubbles;

		if(remainingBubbles < 1){

			return;
		}

		generateBubble();

		setTimeout(function(){

			generateBubbles(remainingBubbles - 1);

		}, 500);
	}

	var generateBubble = function(){

		var element = $('<div />', {class:'bubble'});

		container.append(element);

		// generate offset
		if(fixedPoint){
			element.css('left', horizontalPosition + 'px');
		} else {
			var offset = getRandomNumber(0, 1000);
			element.css('left', offset + 'px');
		}
		
		// generate scale
		var transform = getRandomNumber(40, 100)/100;

		element.css('-webkit-transform', transform);
		element.css('-moz-transform', transform);
		element.css('transform', transform);

		// generate opacity
		var opacity = getRandomNumber(10, 50)/100;
		element.css('opacity', opacity);

		// animation
		var moveClouds = getRandomNumber(5, 15);
		var sideways = getRandomNumber(1, 5);
		var animationValue = 'moveclouds '+ moveClouds +'s linear infinite, sideWays ' + sideways + 's ease-in-out infinite alternate';
		element.css('-webkit-animation', animationValue);
		element.css('-moz-animation', animationValue);
		element.css('-o-animation', animationValue);
	}
}

function getViewport() {

	var viewPortWidth;
	var viewPortHeight;

	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined'
		&& typeof document.documentElement.clientWidth !=
		'undefined' && document.documentElement.clientWidth != 0) {
		viewPortWidth = document.documentElement.clientWidth,
		viewPortHeight = document.documentElement.clientHeight
	}

	// older versions of IE
	else {
		viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
		viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
	}

	return [viewPortWidth, viewPortHeight];
}

function getRandomNumber(minimum, maximum){
	if(!maximum) {
		max = 100;
	}

	if(!minimum || minimum < 1)
	{
		minimum = 1;
	}

	return (Math.floor(Math.random() * (maximum - minimum + 1)) + minimum);
}