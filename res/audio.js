function audioPlay(n,b)
{
  if(n==null) return;
  var e=n.getElementsByTagName('audio')[0];
  var i=n.getElementsByClassName('hover-area')[0].getElementsByTagName('img')[0];
  
  if(b) {
    e.load();
    e.play();
	var next = document.getElementById('img-audio-off');
    i.src=next.src;
  }
  else {
    e.pause();
	var next = document.getElementById('img-audio-on');
    i.src=next.src;
  }
}

// -------------------------------------------------------

function audioMuteAll()
{
    var audios = document.getElementsByClassName('audio-ref');
	
    for(ix=0; ix < audios.length; ix++)	
	{
	  audioPlay(audios[ix], false);    
	}
}

// -------------------------------------------------------

function audioToggle(n)
{
  if(n==null) return;
  var e=n.getElementsByTagName('audio')[0];
  var play = e.paused || e.ended;
  if(play) audioMuteAll();
  audioPlay(n,play);
}


