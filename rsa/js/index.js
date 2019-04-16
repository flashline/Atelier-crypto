//main
//BigNumber.config({ RANGE: 100000000 }); // 10 millions of digits
BigNumber.config({ POW_PRECISION: 0 }) ; // No limit of significative digits
var start=Date.now();
// Init vars and public key creation by Alice
log("*** Création de la clé publique par Alice ***"); 
var p,q;
p=239 ; q=293 ; const by=2 ; 
// p=239 ; q=293 ; const by=2 ; 
//
// p=503; q=563 ; const by=2 ; 
//
// p=18539 ; q=18787 ; const by=3 ;
//
// p=20063 ; q=25633 ; const by=3 ; 
//
// p=35698781 ; q=35702123 ; const by=5 ; // modify dCompute call
//
//
var n = p*q ;
var phi= phiOf (p,q) ;
log("Phi="+phi);
var e=primeOf(phi);
//
// Alice give public key to Bob.
log("Alice donne la clé publique à Bob");
log("=> Clé publique  = ("+e+" , "+n+")");   
// test if bloc are less than n
if (Math.pow(256,by)>n) error("Public key's n="+n+" too small !");
log();
//////////////////////////
breakPoint();
//////////////////////////
log("*** Alice calcul l'élément d de sa clé secrète  ***"); 
// compute d (private key with n)
var d=dCompute(e,phi);
log("d est égal à "+d);
log();
//////////////////////////
breakPoint();
//////////////////////////
log("*** Bob crée, chiffre et envoie son message to Alice ***"); 
// create plain text
var plainTxt="Help me. I'm lost!";
log("Message en clair : <b>"+plainTxt+"</b>");
//
// Store and group plain text in array
var arrBy= stringToArrayBy(plainTxt,by);
log("Tableau des caractères groupés "+by+" par "+by+" ("+(by*8)+" bits)");
logArr(arrBy);
//
// ciphering
var cipherArr=cipher (arrBy,e,n);
log("Tableau chiffré par Bob : ");
logArr(cipherArr);
//
//////////////////////////
breakPoint();
//////////////////////////
log();
log("*** Alice reçoit et déchiffre le message  ***"); 
// unciphering
var uncipherArr=uncipher(cipherArr,d,n) ;
log("Tableau déchiffré (doit être égal à 'Tableau des caractères groupés "+by+" par "+by+" ci-dessus) ");
logArr(uncipherArr);
//
// Convert unciphered text to plain text
var unciphText=arrayByToString(uncipherArr,by);
log("Message déchiffré (doit être égal 'Message en clair' ci-dessus)  : <b>"+unciphText+"</b>");
//
/**/
log("Duration="+((Date.now()-start)/1000)+" sec.");

//
//
//functions
/**
* @param pp	First integer
* @param qq	Second integer
* @return Phi
*/
function phiOf (pp,qq) {
	// TODO
	
}

/**
* Creation of number e used to cipher
* @param phii	(p-1) * (q-1) 
* @param min	Start value for e		
* @param pp		first prime number
* @param qq		second prime number
* @return the e number
*/
function primeOf(phii,min=0) {
	min=Math.abs(min); min+=2;min+=2;
	if (min>=phii) error("Minimum for e : "+min+" is greater than phi : "+phii+" !");
	// TODO	
}
/**
* Compute the Greatest Common Denominator between a and b
* @param a	First integer
* @param b	Second integer
* @return the GCD
*/
function GCD (a,b) {
	// TODO	
	
}
/**
* Creation of an array of 2 bytes elements
* @param  str 		A text string 
* @param  by		Number of  bytes (by=2) 					
* @return An array of 16 bits elements
*/
function stringToArrayBy (str,by) {
	var arrOut=[]; var c=0;	
	for (i=0;i<str.length;i++) {
		c=c*256+str.substr(i,1).charCodeAt(0) ;
		if (i%by==(by-1)) {
			arrOut.push(c);	
			c=0;
		}		
	}
	if (c!=0) arrOut.push(c); 
	return arrOut;	
}
/**
* Compute of number d of private key (d,n)
* @param ee		Number e (of public key)
* @param phii	(p-1) * (q-1) 
* @return the d number
*/
function dCompute(ee,phii) {	
	//return extendedEuclide(ee,phii); //ici
	//TODO
	
}
// Best way to find 'd' :
function extendedEuclide(a,b) {
	var phii=b;
	var x=1 ; var xx=0;
	var y=0; var yy=1;			
	while (b!=0) {
		var q=Math.floor(a/b);
		var o=store(a%b,b); a=o.v2 ; b=o.v1 ;
		var o=store(x-q*xx,xx); x=o.v2 ; xx=o.v1 ;
		var o=store(y-q*yy,yy); y=o.v2 ; yy=o.v1 ;			
	}
	if (x<0) x+=phii;
	return x;
}
function store(v1,v2) {
	return {v1:v1,v2:v2};
}
//
function dComputeEasy(ee,phii) {
	// TODO
	
}
/**
* Ciphering with public key (e,n)
* @param arr	16 bits elements array with plain text
* @param ee		Number e of public key
* @param nn		Number n (p*q)
* @return 16 bits elements array with ciphered text
*/
function cipher (arr,ee,nn) {
	//TODO
	
}
/**
* Unciphering with private key (d,n)
* @param arr	16 bits elements array with ciphered text
* @param dd		Number d of private key
* @param nn		Number n (p*q)
* @return 16 bits elements array with unciphered text
*/
function uncipher (arr,dd,nn) {
	// TODO
	
}
/**
* Cipher or uncipher one char
* @param ic		input char (unciphered or ciphered )
* @param ed		key 		(e or d)
* @param nn		Number n (p*q)
* @return 		output char (ciphered or unciphered)
*/
function powMod (ic,ed,nn) {	
	// TODO
	
}
/*
function powMod (ic,ed,nn) {	
	// TODO
	var oc;	
	oc=1;
	ic=new BigNumber(ic.toString());
	ed=new BigNumber(ed.toString());
	nn=new BigNumber(nn.toString());
	while(ed.gt(0)) { 										// while(ed>0) {
		if (!(ed.mod(2).eq(0))) oc=ic.times(oc).mod(nn); 	// if (ed%2==0) oc = (ic * oc) % nn	
		ic=ic.times(ic).mod(nn); 							// ic = ic * ic % nn	
		ed=ed.dividedToIntegerBy(2) ;						// ed=Math.floor(ed/2);		
	}
	return oc.toFixed();
}
*/
/**
* Reconstruction of plain text
* @param  arr 		Unciphered array
* @param  by		Number of  bytes (by=4) 					
* @return Original text reconstituted
*/
function arrayByToString (arr,by) {
	var str=""; var strBy=""; var c;
	for (var i=0;i<arr.length;i++) {
		var nBy=arr[i];	
		for (var j=0;j<by;j++) {
			c=nBy%256;
			 if (c!=0) {
				strBy=String.fromCharCode(c)+strBy;
				nBy=Math.floor(nBy/256);
			 }
		}
		str+=strBy;strBy="";
	}
	return str;
}
//util func

function log (o="") {
	$("info").innerHTML+=o+"<br/>";
}

function logArr (arr) {
	if(arr.length==0) log(">> vide !");
	for (var i in arr) {
		log(" ["+arr[i]+"]");
	}	
}
function $ (id) { 
	return document.getElementById(id);
}
function breakPoint () {
	var str="Break point";
	log(str);
	throw(str);
}
function error (str) {
	log("Fatal error. "+str);
	throw(str);
}


