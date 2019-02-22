//main
var start=Date.now();
// Init vars and public key creation by Alice
log("*** Alice initialisation ***"); 
var p = 503 ; const by=2 ; // 20063 ; use with by=3 // 503 ; use with by=2 // 67 ; use with by=1 //
var q = 563 ; 			 // 25633 ; use with by=3 // 563 ; use with by=2 // 41 ; use with by=1 //
var n = p*q ;
const len16=5; // len of hexa bloc. (16^len16 > n) (i.e. 16^5 = 1,048,576 > n)
var phi= phiOf (p,q) ;
var e=primeOf(phi,p,q);
// Alice give public key to Bob.
log("Alice give public key to Bob");
log("Public key (e , p*q) = ("+e+" , "+(n)+")");
// test if bloc are smaller than n
if (Math.pow(256,by)>n) {
	var str="Public key n="+n+" too small !";
	log(str );
	throw(str);
}
log("*** Bob create, cipher end send message to Alice ***"); 
// create plain text
var plainTxt="Help me !";
log("Plain text : <b>"+plainTxt+"</b>");
//
// Store and group plain text in array
var arrBy= toArrayOfBy(plainTxt,by);
log("Plain text grouped by "+by+" 16 bits elements array : ");
logArr(arrBy);
//
// ciphering
var cipherArr=cipher (arrBy,e,n);
log("Ciphered text array : ");
logArr(cipherArr);
//
// Store cipher array in hexa string blocs
var cipheredTxt=toHexaString(cipherArr,len16);
log("Ciphered hexa string of "+len16+" digits  : ");
log16(cipheredTxt,len16);
//
log("*** Alice receive message  ***"); 
// compute d (private key with n)
var d=dCompute(phi,p,q,e);
log("d est égal à "+d);
//
// Convert ciphered hexa string to decimal array
var decArr=toDecArray(cipheredTxt,len16);
log("Ciphered text converted to decimal array (must be equal to ''Ciphered text array'' above) : ");
logArr(decArr);
//
// unciphering
uncipherArr=uncipher(decArr,d,(p*q)) ;
log("Unciphered text array : ");
logArr(uncipherArr);
//
// Convert unciphered text to plain text
var unciphText=arrayByToString(uncipherArr,by);
log("Unciphered text : (must be equal to ''Plain text'' above) : <b>"+unciphText+"</b>");
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
* @param pp		first prime number
* @param qq		second prime number
* @return the e number
*/
function primeOf(phii,pp,qq) {
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
function toArrayOfBy (str,by) {
	var arrOut=[]; var c=0;	
	for (i=0;i<str.length;i++) {
		c=c*256+str.substr(i,1).charCodeAt(0) ;
		if (i%by==(by-1)) {
			arrOut.push(new BigNumber(c));	
			c=0;
		}		
	}
	if (c!=0) arrOut.push(new BigNumber(c));	
	return arrOut;	
}
/**
* Ciphering with public key (e,n)
* @param arr	16 bits elements array with plain text
* @param ee		Number e of public key
* @param nn		Number n (p*q)
* @return 16 bits elements array with ciphered text
*/
function cipher (arr,ee,nn) {
	// TODO	
}
/**
* Creation of an hexa string before send ciphered text
* @param  arr 		A text string 
* @param  len16		Number hexa digits (len16=5) 					
* @return Ciphered text as hexa string
*/
function toHexaString (arr,len16) {
	var hxChars="0123456789abcdef"; // Hexa digits from 0 to f
	var hxStr="";
	for (var i in arr) {				// for each value in array
		var v=arr[i]; var str16="";			// store in v
		while (v>0) {						// while value hasn't been processed
			var d=v%16; 					// extract right value from 0 to 15
			var ch=hxChars.substr(d,1);  	// find corresponding hexa digit
			str16=ch+str16; 				// store right to left the hexa digit
			v=Math.floor(v/16); 			// put in v the left rest
		}
		for (var j=str16.length;j<len16;j++) {
			str16="0"+str16; // zero left padding
		}
		hxStr+=str16;
	}
	return hxStr;
}
/**
* Compute of number d of private key (d,n)
* @param phii	(p-1) * (q-1) 
* @param pp		first prime number p
* @param qq		second prime number q
* @param e		Number e (idem in public key)
* @return the d number
*/
function dCompute(phii,pp,qq,e) {
	// TODO
}
/**
* Convert hexa string ciphered text into array
* @param  str 		hexa string
* @param  len16		Number hexa digits (len16=5) 					
* @return Ciphered array
*/
function toDecArray (str,len16) {
	var arr=[];
	for (var i=0;i< str.length ; i+=len16) { // i target the first right digit of hexa string
		var str16=str.substr(i,len16);			// get the hexa string of 5 digits
		var v=Number('0x'+str16) ;				// convert to decimal
		arr.push(v);							// store in returned array
	}
	return arr;
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

function log (o) {
	$("info").innerHTML+=o+"<br/>";
}
function log16 (hexa,len16) {
	var out="";var splitter=".";
	for (var p=0;p<hexa.length;p+=len16) {
		if (p==hexa.length-len16) splitter="";
		out+=hexa.substr(p,len16)+splitter;		
	}
	$("info").innerHTML+=out+"<br/>";
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


