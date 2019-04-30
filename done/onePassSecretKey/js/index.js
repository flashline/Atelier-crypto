//main
//
log("*** Alice crée son message en clair. ***");
// text to be ciphered
var plainTxt="Please Bob Help me !..." ; 
//var plainTxt=toUnicode("Plœase Help me !") ; // œ // &#339; // "Toujours avec le principe de substitution, le bon vieux César y a mis sa patte";//"Help me !"; // 9 chars
log("Texte clair : <b>"+plainTxt+"</b>");
log("Longueur du texte : "+plainTxt.length);

log();
log("*** Création de la clé (de même longueur que le message) par Alice qu'elle enverra à Bob ***");
// Number of bytes per bloc
const by=4; // 32bits 
//
// key creation
// var key="$^ù*)=}|a"; // OR
var o=createKey (plainTxt.length);
var key=o.key;
var binKey=o.binKey; 
log("Clé affichée en binaire : "+binKey);
log("Clé utilisée : "+key);
log();
//
// breakPoint();
// 
// Convert plain text to array of 4 bytes elements
var arrBy= stringToArrayBy(plainTxt,by);
log("*** Alice regroupe les caractères "+by+" par "+by+" ("+by*8+" bits) dans un tableau");
logArr(arrBy);

//
// Convert key to array of 4 bytes elements
var keyBy=stringToArrayBy(key,by);
log("Les caractères de la clé sont aussi regroupés par "+by);
logArr(keyBy);
//
// breakPoint();
// Ciphering
var cipherArr=cipher (arrBy,keyBy);
log("Le tableau est chiffré : ");
logArr(cipherArr);
log();
//
//breakPoint();
// 
//
// Alice has given key to Bob
//
log("*** Bob  reçoit le message et le déchiffre avec la même clé ***"); 
// Unciphering
uncipherArr=uncipher(cipherArr,keyBy);
log("Tableau déchiffré (doit être égal au tableau 'avant chiffrement' ci-dessus)  : ");
logArr(uncipherArr);

// Uncipher array to string
var unciphText=arrayByToString (uncipherArr,by) ;
log("Text déchiffré (doit être égal au texte initial d'Alice ci-dessus) : <b>"+unciphText+"</b>");
//

//functions
/**
* Random key creation
* @param  len 			Length of plain text
* @return object with 
* 				key 	Created key
*				binKey 	binary string of key (only to display it)
*/
function createKey (len) {
	//TODO
	var key="";var binKey8=""; var k=0; var binKey=""; 
	for (i=0;i<len*8;i++) {		
		var bit=random();		
		k+=bit;
		binKey8+= bit.toString() ; // binKey8+=""+bit; // binkey8=binkey8+String(bit);
		if ( i%8==7) {			
			key+=String.fromCharCode(k);
			binKey+=binKey8+"."; binKey8=""; 
			k=0;
		}
		k=k<<1; // k*=2;
	}	
	return {binKey:binKey,key:key};
}

function random () {
	//TODO
	return Math.floor(Math.random() * 2);
};

/**
* Creation of an array of 4 bytes (32 bits) elements
* @param  str 		A text string (message or key)
* @param  by		Number of  bytes (by=4) 					
* @return An array of 32 bits elements
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
* Ciphering 
* @param  msgArr 			Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array					
* @return Ciphered message in 32 bits elements array
*/
function cipher (msgArr,keyArr) {
	// TODO
	var arrOut=[]; var j=0;
	for (var i in msgArr) {
		if (j>keyArr.length-1) j=0 ;
		arrOut.push((msgArr[i] ^ keyArr[j]));
		j++;
	}
	return arrOut;
}
/**
* Unciphering 
* @param  cipherArr 		Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array					
* @return Unciphered message in 32 bits elements array
*/
function uncipher (cipherArr,keyArr) {
	//TODO	
	return cipher (cipherArr,keyArr) ;
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
			c=nc%256; 							// or c=nc%0b100000000; // extract current right byte value
			strBy=String.fromCharCode(c)+strBy; // put char at the left of tmp string 
			nc=Math.floor(nc/256);				// or nc=Math.floor(nc/0b100000000); // suppress right byte			 
		}
		str+=strBy;strBy="";
	}
	return str;
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




