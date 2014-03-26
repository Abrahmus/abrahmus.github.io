
$(document).ready(function(){
  var bubbleContainer = $('#body');
  var f = new Fountain(900, 100, bubbleContainer);
  f.IsFixedPoint(false);
  f.start();
});

var Fountain = function(horizontalPosition, nBubbles, container){
  var fixedPoint = true;

  this.IsFixedPoint = function(fp){ fixedPoint = fp; }

  this.start = function(){
    this.interval = setInterval(generateBubble, 150);
  }

  var pool = [];
  for (var i=0; i<nBubbles; ++i)
    pool.push($('<div />', {class:'bubble'}));

  function generateBubble(){
    var element = pool.shift();
    pool.push(element);

    var viewPort = getViewport();
    container.append(element);

    // generate offset
    if(fixedPoint){
      element.css('left', horizontalPosition + 'px');
    } else {
      var offset = getRandomNumber(0, viewPort[0]);
      element.css('left', offset + 'px');
    }
    
    // generate scale
    var transform = getRandomNumber(40, 60);
    // generate opacity
    var opacity = getRandomNumber(10, 50)/100;
    // animation
    var moveClouds = getRandomNumber(10, 30);
    var sideways = getRandomNumber(1, 5);
    var animationValue = 'moveclouds ' + moveClouds + 's ease infinite, sideWays ' + sideways + 's ease-in-out infinite alternate';

    var size = getRandomNumber(5, 20) + 'px';
    element.css({
      '-webkit-transform': 'scale(' + transform/100 + ')',
      '-moz-transform': 'scale(' + transform/100 + ')',
      'transform': 'scale(' + transform/100 + ')',
      'opacity': (transform - 30)/100,

      'width': size,
      'height': size,

      '-webkit-animation': animationValue,
      '-moz-animation': animationValue,
      '-o-animation': animationValue
    });
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

