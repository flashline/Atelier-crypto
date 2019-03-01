//main
//
log("*** Alice initialisation, key creation and Send message to Bob ***");
// Number of bytes per bloc
const by=4; // 32bits 
// text to be ciphered
var plainTxt="Help me !"; // "Toujours avec le principe de substitution, le bon vieux César y a mis sa patte";//"Help me !"; // 9 chars
log("Plain text : <b>"+plainTxt+"</b>");
//
// key creation
// var key="$^ù*)=}|a"; // OR
var o=createKey (plainTxt.length);
var key=o.key;
var binKey=o.binKey;
log("Key bin : "+binKey);
log("Key text : "+key);
// 
//
// Convert plain text to array of 4 bytes elements
var arrBy= toArrayOfBy(plainTxt,by);
log("Plain text grouped by "+by+" decimal array : ");
logArr(arrBy);
//
// Convert key to array of 4 bytes elements
var keyBy=toArrayOfBy(key,by);
log("Key grouped by "+by+" decimal array : ");
logArr(keyBy);
//
// Ciphering
var cipherArr=cipher (arrBy,keyBy);
log("Ciphered grouped by "+by+" decimal array : ");
logArr(cipherArr);
//
// Alice has given key to Bob
//
log("*** Bob  receive message  ***"); 
// Unciphering
uncipherArr=uncipher(cipherArr,keyBy);
log("Unciphered grouped by "+by+" decimal array (must be equal to plain text decimal array above)  : ");
logArr(uncipherArr);
// Uncipher array to string
var unciphText=arrayByToString (uncipherArr,by) ;
log("Unciphered text (must be equal to plain text above) : <b>"+unciphText+"</b>");
//functions
/**
* Random key creation
* @param  len 			Length of plain text
* @return object with 
* 				key 	Created key
*				binKey 	binary string of key (only to display it)
*/
function createKey (len) {
	var key="";var binKey8=""; var binKey=""; var splitter=".";
	for (i=0;i<len*8;i++) {		
		var bit=random();
		binKey8+=""+bit; // binKey8+= String(bit);
		if ( i%8==7) {
			if (i==(len*8)-1) splitter="";
			var c = parseInt(binKey8, 2);
			key+=String.fromCharCode(c);
			binKey+=binKey8+splitter;			
			binKey8="";
		}
	}	
	//log("len key="+key.length);
	//log("len binKey8="+binKey.length);
	return {binKey:binKey,key:key};
}
function random () {
	return Math.floor(Math.random() * 2);
};

/**
* Creation of an aray of 4 bytes (32 bits) elements
* @param  str 		A text string (message or key)
* @param  by		Number of  bytes (by=4) 					
* @return An array of 32 bits elements
*/
function toArrayOfBy (str,by) {
	var arrOut=[]; var c=0;	
	for (i=0;i<str.length;i++) {
		c=c*256+str.substr(i,1).charCodeAt(0) ;
		if (i%by==(by-1)) {
			arrOut.push(c);	c=0;
		}		
	}
	if (c!=0) arrOut.push(c);	
	return arrOut;	
}
/**
* Ciphering 
* @param  msgArr 			Message's 32 bits elements array
* @param  keyArr			Key's 32 bits elements array					
* @return Ciphered message in 32 bits elements array
*/
function cipher (msgArr,keyArr) {
	var arrOut=[]; var j=0;
	for (var i in msgArr) {
		if (j>keyArr.length-1) j=0 ;
		arrOut.push((msgArr[i] ^ keyArr[j]));
		//log("msgArr[i]="+msgArr[i]+" / keyArr[j]="+keyArr[j]);
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
	var arrOut=[]; var j=0;
	for (var i in cipherArr) {
		if (j>keyArr.length-1) j=0 ;
		arrOut.push((cipherArr[i] ^ keyArr[j]));
		//log("cipherArr[i]="+cipherArr[i]+" / keyArr[j]="+keyArr[j]);
		j++;
	}
	return arrOut;
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
			c=nBy%256; 								// extract current right byte value
			if (c!=0) {  
				strBy=String.fromCharCode(c)+strBy; // put char at the left of tmp string
				nBy=Math.floor(nBy/256);			// suppress right byte
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
function logArr (arr) {
	if(arr.length==0) log(">> vide !");
	for (var i in arr) {
		log(" ["+arr[i]+"]");
	}	
}
function $ (id) { 
	return document.getElementById(id);
}

