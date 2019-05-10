//main
//easyGCD(29,21); breakPoint();
BigNumber.config({ POW_PRECISION: 0 }) ; // No limit of significative digits
//
//
// vars declaration
const MAX_POW=9999;
const START_E= 788 ; // 788; // 3 ; 
//
var n,phi,e,d,plainTxt,arrBy,cipherArr;
var p,q;
p=239 ; q=293 ; const by=2 ; 
//
// p=67 ; q=71 ; const by=1 ;
//
// p=107 ; q=113 ; const by=1 ;
//
// p=239 ; q=293 ; const by=2 ;
//
// p=503; q=563 ; const by=2 ; 
//
// p=18539 ; q=18787 ; const by=3 ;
//
// p=20063 ; q=25633 ; const by=3 ; 
//
// p=35698781 ; q=35702123 ; const by=5 ; 
//
// p=356987927 ; q = 356991587 ; by=5 ; 
//
// p=789456129313 ; q = 789456123943 ; by=5 ;      
//
// p=989456129273	 ; q = 989456129297 ; by=5 ;  
//   
// p=989456129273 ; q=989456129339 ; by=6 ;  
//
// p=895412375647 ; q=895412380189 ; by=6; // bug 
//
//
$("alicePrivate").addEventListener("click",alicePrivate);
$("bobSend").addEventListener("click",bobSend);
$("aliceReceive").addEventListener("click",aliceReceive);
$("bobSend").disabled = true;
$("aliceReceive").disabled = true;
//
//
// Public key creation by Alice
log("*** Création de la clé publique par Alice ***"); 
n = computeN(p,q);
phi= phiOf (p,q) ;
e=primeOf(phi,START_E);
//
log("p="+p);
log("q="+q);
log("phi="+phi);
log();
// Alice give public key to Bob.
log("Alice donne la clé publique à Bob");
log("=> Clé publique (e,n) = ("+e+" , "+n+")");   
// test if bloc are less than n
if (Math.pow(256,by)>n) error("Public key's n="+n+" too small !");
//
//
// Listener functions
function alicePrivate (evt) {
	evt.target.disabled = true;
	$("bobSend").disabled = false;
	log();
	log("*** Alice calcul l'élément <b>d</b> de sa clé secrète  ***"); 
	// compute d (private key with n)
	d=dCompute(e,phi);
	//log("d est égal à "+d);
	log("=> Clé privée (d,n) = ("+d+" , "+n+")");  	
}
//////////////////////////
function bobSend(evt) {
	evt.target.disabled = true;
	$("aliceReceive").disabled = false;
	log();
	log("*** Bob crée, chiffre et envoie son message à Alice ***"); 
	// create plain text
	plainTxt="Help me Alice. I'm lost!"; // plainTxt="HelpMe Alix HelpMe"; // 
	//var plainTxt=toUnicode("Help me, Plœase  Alice I'm lost!")
	log("Message en clair : <b>"+plainTxt+"</b>");
	log("Longueur du texte : "+plainTxt.length);
	//
	// Store and group plain text in array
	arrBy= stringToArrayBy(plainTxt,by);
	log("Tableau des caractères groupés "+by+" par "+by+" ("+(by*8)+" bits)");
	logArr(arrBy);
	//
	// ciphering
	cipherArr=cipher (arrBy,e,n);
	log("Tableau chiffré par Bob : ");
	logArr(cipherArr);
}
//////////////////////////
function aliceReceive (evt) {
	evt.target.disabled = true;
	log();
	log("*** Alice reçoit et déchiffre le message puis enfourche son destrier pour sauver Bob ! ***"); 
	// unciphering
	uncipherArr=uncipher(cipherArr,d,n) ;
	log("Tableau déchiffré (doit être égal à ''Tableau des caractères groupés "+by+" par "+by+"'' ci-dessus) ");
	logArr(uncipherArr);
	//
	// Convert unciphered text to plain text
	var unciphText=arrayByToString(uncipherArr,by);
	log("Message dégroupé (doit être égal ''Message en clair'' ci-dessus)  : <b>"+unciphText+"</b>");
}
//
//
//functions
/**
* @param pp	First integer
* @param qq	Second integer
* @return N part of public key (p*q)
*/
function computeN (pp,qq) {
	// TODO	
	
}
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
* @return the e number
*/
function primeOf(phii,min=0) {
	min=Math.abs(min); if (min<3) min=3; var gcdPhi;
	if (min>=phii) error("Minimum for e : "+min+" is greater than phi : "+phii+" !"); 
	// TODO	
	
}
/**
* Compute the Greatest Common Denominator between a and b
* @param a	First integer
* @param b	Second integer
* @return the GCD
*/
function easyGCD (a,b) {
	// TODO
   
}
function GCD (a,b) {
	// To Explain
	var r=a%b;	
	while (r!=0) {
		a=b;	
		b=r; 
		r=a%b;		
	}
	return b;
}
/**
* Creation of an array of 2 bytes elements
* @param  str 		A text string 
* @param  by		Number of  bytes (by=2) 					
* @return An array of 16 bits elements
*/
function stringToArrayBy (str,by) {
// To explain
	var arrOut=[]; var nc=0;var c;
	for (i=0;i<str.length;i++) {
		c=str.charCodeAt(i);
		if (c>255) error("If message  contains unicode 16 bits char, you have to use toUnicode() ");
		nc=nc*256+c ;							// or nc=nc*0b100000000+c ; //
		if (i%by==(by-1) || i==str.length-1) {
			arrOut.push(nc);	nc=0;
		}		
	}
	return arrOut;	
}
/**
* Compute of number d of private key (d,n)
* @param ee		Number e (of public key)
* @param phii	(p-1) * (q-1) 
* @return the d number
*/
function dCompute(ee,phii) {
	//TODO
	
}
// Best way to find 'd' :
function extendedEuclide(a,b) {
	b=new BigNumber(b.toString());
	a=new BigNumber(a.toString());
	var phii=b;
	var x=new BigNumber(1);
	var xx=new BigNumber(0);
	var y=new BigNumber(0); var yy=new BigNumber(1);			
	while (!b.eq(0)) {
		var q=a.dividedToIntegerBy(b) ; 
		var o=store(a.mod(b),b); a=o.v2 ; b=o.v1 ;
		var o=store(x.minus(q.times(xx)),xx); x=o.v2 ; xx=o.v1 ;
		var o=store(y.minus(q.times(yy)),yy); y=o.v2 ; yy=o.v1 ;
	}
	if (x.isNegative()) x=x.plus(phii);
	return x.toFixed();
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
	// To Explain
	var oc=1;	
	ed=new BigNumber(ed.toString());
	ic=new BigNumber(ic.toString());
	nn=new BigNumber(nn.toString());
	while(ed.gt(0)) { 										// while(ed>0) {
		if (!(ed.mod(2).eq(0))) oc=ic.times(oc).mod(nn); 	// if (ed%2==0) oc = (ic * oc) % nn	
		ic=ic.times(ic).mod(nn); 							// ic = ic * ic % nn	
		ed=ed.dividedToIntegerBy(2) ;						// ed=Math.floor(ed/2);		
	}
	return oc.toFixed();									// return oc
}
/**
* Reconstruction of plain text
* @param  arr 		Unciphered array
* @param  by		Number of  bytes (by=4) 					
* @return Original text reconstituted
*/
function arrayByToString (arr,by) {
	// To Explain
	var str=""; var strBy=""; var c;
	for (var i=0;i<arr.length;i++) {
		var nc=arr[i];	
		while (nc!=0) {
			c=nc%256; 							// or c=nc%0b100000000; // mettre le car. à gauche de la string tempo // extract current right byte value
			strBy=String.fromCharCode(c)+strBy; // mettre le car. à gauche de la string tempo// put char at the left of tmp string 
			nc=Math.floor(nc/256);				// ou nc=Math.floor(nc/0b100000000); // suppression de l'octet de droite. // suppress right byte			 
		}
		str+=strBy;strBy="";					// On range la string tempo de 4 car. dans la string finale.
	}
	return str;									// retour du message en clair.	
}
function toUnicode(str) {
	var nc; var utf;
	for (i=0;i<str.length;i++) {
		nc=str.substr(i,1).charCodeAt(0);
		if (nc>255) {
			str=str.substr(0,i)+"&#"+nc+";"+str.substr(i+1);
		}
	}
	return str;
}
//
//util functions
function log (o="") {
	$("info").innerHTML+=o+"<br/>";
}
function logArr (arr) {
	if(arr.length==0) log(">> vide !");
	for (var i in arr) {
		log("&nbsp;&nbsp; ["+arr[i]+"]");
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


