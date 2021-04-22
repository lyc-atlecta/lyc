var showStarted = false;
var ix = 0;

function darken() {
  document.getElementById('div-end').style.zIndex  = "9";
  document.getElementById('div-end').style.opacity = 1;
}

function showNext() {
  var s = 'img-show-' + ix;
  var e = document.getElementById(s);
  if(e == null){
	  darken();
	  return;
  }
  e.style.opacity = 1;
  ix++;
  setTimeout(showNext,10000);
}


function startShow() {
  if (showStarted) return false;
  showStarted = true;
  showNext();
  return false;
}
