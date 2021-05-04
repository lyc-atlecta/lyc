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

function getU()
{
  return U;
}

function refreshQ(ix) {
  var previouIx = ix-1;
  var salt = (ix > 0) ? document.getElementById("r" + previouIx.toString() ).value : "First key";
  document.getElementById("q" + ix.toString() ).innerHTML = decrypt(Q[ix], salt);
  if(document.getElementById("q" + ix.toString() ).innerHTML == ""){
	  document.getElementById("r" + ix.toString() ).value = "";
	  document.getElementById("r" + ix.toString() ).placeholder = "";
  }
  else document.getElementById("r" + ix.toString() ).placeholder  = P[ix];
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

function enableEnter() {
  var ixMax = Q.length-1;
  var salt = document.getElementById("r" + ixMax.toString() ).value;

  var b = document.getElementById("r0").value != "" && decrypt(K, salt)!= "" && document.getElementById("r0").value == decrypt(K, salt); 

  var enter = document.getElementById("enter");
  var U = getU();

  enter.href = decrypt(U, salt)

  enter.style.pointerEvents = (b) ? "auto" : "none";
  enter.style.opacity = (b) ? 1 : 0.2;
}

function refreshHeader() {
  var salt = document.getElementById("r0").value;
  document.getElementById("header").innerHTML = decrypt(H, salt);
  if(document.getElementById("header").innerHTML == "") document.getElementById("header").innerHTML = "...";
}

function refreshAll() {
	for(var ix = 0; ix < Q.length; ix++){
		refreshQ(ix);
	}
	var C = getC();
	for(var ix = 0; ix < C.length; ix++){
		refreshC(ix);
	}
	refreshHeader();
	enableEnter();
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