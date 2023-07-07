var items = null;
var ixImg = 0;

// -------------------------------------------------------

function openLightBox(n) {
	items = null;
	ixImg = 0;
	
	var show = n.getElementsByClassName("img-list")[0];
	if(show != null)
	{
		items = show.getElementsByTagName("img");
	}
	
	document.getElementById("LightBox").style.display = "block";

	if(items == null)
	{
		document.getElementById("LightBox-prev").style.display = "none";
		document.getElementById("LightBox-next").style.display = "none";
		if(n.tagName=="A") __showLightBoxImage("LightBox-img", n.href);
		else if(n.tagName=="IMG") __showLightBoxImage("LightBox-img", n.src);
	}
	else
	{
		document.getElementById("LightBox-prev").style.display = "block";
		document.getElementById("LightBox-next").style.display = "block";
		showLightBoxItem(0);
	}

	return false;	
}

// -------------------------------------------------------

function closeLightBox() {
	items = null;
	document.getElementById("LightBox").style.display = "none";
}

// -------------------------------------------------------

function showLightBoxItem(n) {
	__showLightBoxItem("LightBox-img",n);
}

// -------------------------------------------------------

function __showLightBoxItem(id, n) {
	ixImg += n;
	if(ixImg < 0) ixImg = items.length - 1;
	else if(ixImg >= items.length) ixImg = 0;
	__showLightBoxImage(id,items[ixImg].src);
}

// -------------------------------------------------------

function __showLightBoxImage(id, s) {
	
  var i = document.getElementById(id);
  if(s!=null) i.src=s;
  
  i.style.width= "100vw";
  i.style.height= "100vh";
  var maxW = i.width;
  var maxH = i.height;
  
  i.style.width= "100%";
  i.style.height= "auto";
  if(i.height > maxH)
  {
    i.style.width= "auto";
    i.style.height= "100%";
  }
  // + patch for version embedded in html
  else
  {
    i.style.transform = "translateY(70px)";
  }
  // - patch for version embedded in html
 }
