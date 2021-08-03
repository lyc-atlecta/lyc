function debug(s) {
  document.getElementById("debug").value = s;
}
  
function encrypt(txt, salt) {
  return CryptoJS.AES.encrypt(txt, salt);	
}

function decrypt(encrypted, salt) {
  try{
    var decrypted = CryptoJS.AES.decrypt(encrypted, salt);
    return decrypted.toString(CryptoJS.enc.Utf8);  
  }
  catch(e)
  {
	  return "";
  }
}

function getC()
{
  return C;
}

function getU(identer)
{
  if(identer == "enter1") return U1;
  if(identer == "enter2") return U2;
  return null;
}

function refreshQ(ix) {
/*
  var previouIx = ix-1;
  var salt = (ix > 0) ? document.getElementById("r" + previouIx.toString() ).value : "First key";
  document.getElementById("q" + ix.toString() ).innerHTML = decrypt(Q[ix], salt);
  if(document.getElementById("q" + ix.toString() ).innerHTML == ""){
	  document.getElementById("r" + ix.toString() ).value = "";
	  document.getElementById("r" + ix.toString() ).placeholder = "";
  }
  else{
	  var p = document.getElementById("p" + ix.toString());
	  document.getElementById("r" + ix.toString() ).placeholder = p.placeholder;
  }
*/
	  var p = document.getElementById("p" + ix.toString());
	  document.getElementById("r" + ix.toString() ).placeholder = p.placeholder;
}

function refreshC(ix) {
  var previouIx = ix-1;
  var salt = "";
  
  if(ix > 0) {
	salt = document.getElementById("cv" + previouIx.toString() ).value
  }
  else {
    var ixMax = Q.length-1;
    salt = document.getElementById("r" + ixMax.toString() ).value;	 
  }
  var C = getC();
  document.getElementById("ct" + ix.toString()).innerHTML = decrypt(C[ix][0], salt);
  document.getElementById("cv" + ix.toString()).value = decrypt(C[ix][1], salt);
  if(document.getElementById("ct" + ix.toString() ).innerHTML == ""){
	  document.getElementById("cv" + ix.toString() ).value = "";
  }
}

function enableEnter(identer) {
/*
  var ixMax = Q.length-1;
  var salt = document.getElementById("r" + ixMax.toString() ).value;
*/
  var salt = document.getElementById("r0").value;

  var b = document.getElementById("r0").value != "" && decrypt(K, salt)!= "" && document.getElementById("r0").value == decrypt(K, salt); 

  var enter = document.getElementById(identer);
  
  if(enter == null) return;
  
  var U = getU(identer);

  enter.href = decrypt(U, salt)

  enter.style.pointerEvents = (b) ? "auto" : "none";
  enter.style.opacity = (b) ? 1 : 0.2;
}

function enableEnters() {
	enableEnter("enter1");
	enableEnter("enter2");
}

function refreshHeader() {
  var salt = document.getElementById("r0").value;
  document.getElementById("header").innerHTML = decrypt(H, salt);
  if(document.getElementById("header").innerHTML == "") document.getElementById("header").innerHTML = "...";
}

function refreshAll() {
	/*
	for(var ix = 0; ix < Q.length; ix++){
		refreshQ(ix);
	}
	*/
	refreshQ(0);

	/*
	var C = getC();
	for(var ix = 0; ix < C.length; ix++){
		refreshC(ix);
	}
	*/
	//refreshHeader();
	enableEnters();
}

function onKeyUp() {
  refreshAll();
}

function onLoad() {
  document.getElementById("r0").value = "";
  refreshAll();
}

function getMore()
{
  var e = document.getElementById("thoughts");
  e.style.display = "none";
  var m = document.getElementById("more");
  m.style.display = "block";
  return false;
}