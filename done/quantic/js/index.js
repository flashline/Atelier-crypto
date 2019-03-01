
class Photon {
	//new
	constructor(v,b) {
		if ((v!=0 && v!=1) || (b!="ORTHO" && b!="DIAGO")) {
			let str="Invalid base or value !";
			log(str);			
			throw(str);
		}
		this._value = v;
		this._base = b;		
	}
	// get/set
	get base() {
		let str="It isn't possible to get base !";
		log(str);			
		throw(str);
	}
	get value() {
		let str="Use read(<base>) to read value !";
		log(str);			
		throw(str);
	}	
	// Method
	read(b) {		
		if (b!="ORTHO" && b!="DIAGO") {
			let str="Invalid base !";
			log(str);			
			throw(str);
		}
		if (b!=this._base) {
			return this._random();
		}
		else {
			return this._value;
		}
		
	}	
	//private
	_random () {
		return Math.floor(Math.random() * 2);
	};
}
class Bit {
	//new
	constructor(v,b,idx=null) {
		if ((v!=0 && v!=1) || (b!="ORTHO" && b!="DIAGO")) {
			let str="Invalid base or value !";
			log(str);			
			throw(str);
		}
		this._value = v;
		this._base = b;
		this.index = idx;
	}
	// get/set
	get base() {
		return this._base;
	}
	get value() {
		return this._value;
	}
}

class AliceMachine {
	static get name () {
		return "Alice";
	}
	static set buffer (b) {
		AliceMachine._buffer=b;
	}
	static get buffer () {
		return AliceMachine._buffer;
	}
	static set data (b) {
		AliceMachine._data=b;
	}
	static get data () {		
		return AliceMachine._data;
	}
	static set tests (t) {
		AliceMachine._tests=t;
	}
	static get tests () {		
		return AliceMachine._tests;
	}
	static set key (k) {		
		AliceMachine._key=k;
	}
	static get key () {		
		return AliceMachine._key;
	}		
	
	// static 
	static create (n=1) {
		AliceMachine.buffer=[];
		AliceMachine.data=[];
		for (var i=0;i<n;i++) {
			var b,v,p,bit,index; 
			if (AliceMachine._random()==0) b="ORTHO" ; else b="DIAGO" ;
			v=AliceMachine._random() ;
			p=new Photon(v,b);			
			AliceMachine.buffer.push(p);
			index=AliceMachine.data.length;
			bit=new Bit(v,b,index);	
			AliceMachine.data.push(bit);
		}		
	}	
	static sendOnline () {
		Online.buffer=AliceMachine.buffer;	
		AliceMachine.buffer=[];
	}	
	// out of quantic. Sent on normal canal
	// sent percent % of the total key
	static sendTestBits(percent=0.10) {
		var arr=[]; 
		var testNb=Math.floor(AliceMachine.data.length*percent); var index,bit;
		for (var i=0;i<testNb;i++) {
			index=Math.floor(Math.random() * AliceMachine.data.length);
			while (AliceMachine.alreadyExists (arr,index)) {
				index=Math.floor(Math.random() * AliceMachine.data.length);
			}
			var bit=AliceMachine.data[index]; bit.index=index ;
			//var o={value:AliceMachine.data[index].value,base:AliceMachine.data[index].base,index:index};
			arr.push(bit);
		}
		AliceMachine.tests=arr.slice(0);
		return arr;	
	}
	static sendBases() {
		var arr=[];
		for (var i in AliceMachine.data) {
			arr.push(AliceMachine.data[i].base);
		}
		return arr;	
	}
	static alreadyExists (arr,index) {
		var exists=false;
		for (var i in arr) {
			if (index==arr[i].index) {
				exists=true;
				break;
			}			
		}
		return exists;	
	}
	static extractKey () {
		var arr=AliceMachine.data.slice(0);
		for (var i in AliceMachine.tests) {
			arr[AliceMachine.tests[i].index].index=-1;
		}
		var bases=BobMachine.sendBases();
		for ( i in bases) {
			if (arr[i].index!=i && arr[i].index!=-1) {
				let str="Index error";
				log(str);			
				throw(str);
			}
			if (bases[i]!=arr[i].base) arr[i].index=-1;
		}
		AliceMachine.key=[];
		for ( i in arr) {
			if (arr[i].index!=-1) AliceMachine.key.push(arr[i]);
			if (AliceMachine.key.length==BobMachine.keyLen) break;
		}
	}
	//private
	static _random () {
		return Math.floor(Math.random() * 2);
	}
}
class Online {
	static set buffer (b) {
		Online._buffer=b.slice(0);		
	}
	static get buffer () {
		return Online._buffer ;
	}
	static get nextPhoton () {
		var p=Online.buffer[0];
		Online.buffer.splice(0,1);
		return p;
	}	
}
class BobMachine {
	static get name () {
		return "&nbsp;&nbsp;Bob";
	}
	//get/set
	static set data (d) {		
		BobMachine._data=d;
	}	
	static get data () {		
		return BobMachine._data;
	}		
	static get tests () {		
		return BobMachine._tests;
	}	
	static get globalTests () {		
		return BobMachine._globalTests;
	}	
	static get sameBaseTests () {		
		return BobMachine._sameBaseTests;
	}		
	static get summary  ()  {		
		return BobMachine._summary ;
	}
	static set key (k) {		
		BobMachine._key=k;
	}	
	static get key () {		
		return BobMachine._key;
	}		
	static get keyLen () {		
		return BobMachine.key.length;
	}		
	
	
	// static 
	static readOnline () {
		BobMachine.data=[];
		while (Online.buffer.length>0) {
			var p=Online.nextPhoton; var b; var v, bit, index;
			if (BobMachine._random()==0) b="ORTHO" ; else b="DIAGO" ;
			v=p.read(b);
			index=BobMachine.data.length;
			bit=new Bit(v,b,index);			
			BobMachine.data.push(bit);
		}		
	}	
	static testAliceData (percent=.2) {
		BobMachine._summary={};
		BobMachine._sameBaseTests=[];BobMachine._diffBaseTests=[];BobMachine._globalTests=[];
		var aBit,bBit,error  ; var sameBaseNbr=0 ; var sameBaseErr=0 ; var diffBaseNbr=0 ; var diffBaseErr=0 ; 
		BobMachine._tests=AliceMachine.sendTestBits(percent);
		for (var i in BobMachine.tests) {
			aBit=BobMachine.tests[i];
			bBit=BobMachine.data[aBit.index];
			if (aBit.value!=bBit.value) error=true; else error=false ;
			if (aBit.base==bBit.base) {
				sameBaseNbr++;
				if(error) sameBaseErr ++ ;
				BobMachine.sameBaseTests.push({aliceBit:aBit,bobBit:bBit,error:error});
			}
			BobMachine.globalTests.push({aliceBit:aBit,bobBit:bBit,error:error});
		}		
		var sameBasePercent = Math.round(sameBaseErr/sameBaseNbr*10000)/100		; 
		var diffBasePercent = Math.round(diffBaseErr/diffBaseNbr*10000)/100		; 
		BobMachine.summary.sameBaseNbr=sameBaseNbr;
		BobMachine.summary.sameBaseErr=sameBaseErr;
		BobMachine.summary.sameBasePercent=sameBasePercent;		
		
	}
	static extractKey (kLen) {		
		var arr=BobMachine.data.slice(0);
		for (var i in BobMachine.tests) {
			arr[BobMachine.tests[i].index].index=-1;
		}
		var bases=AliceMachine.sendBases();
		for ( i in bases) {
			if (arr[i].index!=i && arr[i].index!=-1) {
				let str="Index error";
				log(str);			
				throw(str);
			}
			if (bases[i]!=arr[i].base) arr[i].index=-1;
		}
		BobMachine.key=[];
		for ( i in arr) {
			if (arr[i].index!=-1) BobMachine.key.push(arr[i]);
			if (BobMachine.key.length==kLen) break;
		}		
	}
	static sendBases() {
		var arr=[];
		for (var i in BobMachine.data) {
			arr.push(BobMachine.data[i].base);
		}
		return arr;	
	}
	//private
	static displayVerif (machine,sameOrAllTests) {		
		//
		var str;
		var o=BobMachine.createEmptyTable (machine) ;
		var tb=o.tb; var trBase=o.trBase; var trValue=o.trValue; var bit,otherBit ;
		for (var i in sameOrAllTests) {
			if (machine.name=="Alice" ) {
				bit=sameOrAllTests[i].aliceBit; otherBit=null ;
				//log("1 otherBit="+otherBit);
			}
			else {
				bit=sameOrAllTests[i].bobBit;
				otherBit=sameOrAllTests[i].aliceBit;
			}
			var th=document.createElement("th") ;
			trBase.appendChild(th);
			if (bit.base=="ORTHO") str="+";
			else str="x";
			th.innerHTML=str; 
			if (otherBit!=null && bit.base!=otherBit.base) th.style.color="red";
			//
			th=document.createElement("th") ;
			trValue.appendChild(th);
			th.innerHTML=""+bit.value; 
			if (otherBit!=null && bit.value!=otherBit.value) th.style.color="red";
		}
		$("main").appendChild(document.createElement("hr"));
	}
	static createEmptyTable (machine) {
		var tb=$("tableProto").cloneNode();
		tb.id=machine.name+"Test";
		$("main").appendChild(tb);
		var trBase=document.createElement("tr") ;
		trBase.className="bases";
		tb.appendChild(trBase);
		var th=document.createElement("th") ;
		trBase.appendChild(th);
		th.innerHTML=machine.name;
		th.style.width="100px";
		//
		var trValue=document.createElement("tr") ;
		trValue.className="value";
		tb.appendChild(trValue);
		th=document.createElement("th") ;
		trValue.appendChild(th);
		th.innerHTML="&nbsp;";		
		return {tb:tb,trBase:trBase,trValue:trValue};
	}
	static displayTitle (txt) {
		var el=document.createElement("h2"); 
		$("main").appendChild(el);			
		el.innerHTML=txt;	
	}
	static displayRecap () {
		$("summary").style.display="block";
		var s=BobMachine.summary;
		$("sameBaseNbr").innerHTML=s.sameBaseNbr;
		$("sameBaseErr").innerHTML=s.sameBaseErr;
		if 		(s.sameBasePercent>10) $("sameBasePercent").style.color="red";
		else if (s.sameBasePercent!=0) $("sameBasePercent").style.color="orange";
		$("sameBasePercent").innerHTML=s.sameBasePercent;
	}
	//
	
	static _random () {
		return Math.floor(Math.random() * 2);
	}
}
class YvesMachine {
	//get/set
	static set data (d) {		
		YvesMachine._data=d;
	}	
	static get data () {		
		return YvesMachine._data;
	}	
	static readOnline () {
		YvesMachine.data=[];
		while (Online.buffer.length>0) {
			var p=Online.nextPhoton; var b; var v,bit; 
			if (YvesMachine._random()==0) b="ORTHO" ; else b="DIAGO" ;
			v=p.read(b); 
			bit=new Bit(v,b);
			//var p=new Photon(v,b);
			YvesMachine.data.push(bit);
		}		
	}	
	static sendOnline () {
		for (var i in YvesMachine.data) {
			var b=YvesMachine.data[i];
			var p=new Photon(b.value,b.base);
			Online.buffer.push(p);
		}
	}
	
	//private
	static _random () {
		return Math.floor(Math.random() * 2);
	}
}
class DebugView {
	// static 
	static display (machine,arr=null) {		
		//
		if (arr==null) arr=machine.data;
		var str;
		var o=DebugView.createEmptyTable (machine) ;
		var tb=o.tb; var trBase=o.trBase; var trValue=o.trValue;
		for (var i in arr) {
			var th=document.createElement("th") ;
			trBase.appendChild(th);
			if (arr[i].base=="ORTHO") str="+";
			else str="x"; 
			th.innerHTML=str; 	
			//
			th=document.createElement("th") ;
			trValue.appendChild(th);
			th.innerHTML=""+arr[i].value; 
			if (i%5==0) th.style.backgroundColor="orange";
			if (i%10==0) th.style.backgroundColor="yellow";
		}
		$("main").appendChild(document.createElement("hr"));
	}
	static displayTitle (txt) {
		var el=document.createElement("h2"); 
		$("main").appendChild(el);			
		el.innerHTML=txt;	
	}
	//private
	static createEmptyTable (machine) {
		var tb=$("tableProto").cloneNode();
		tb.id=machine.name;
		$("main").appendChild(tb);
		var trBase=document.createElement("tr") ;
		trBase.className="bases";
		tb.appendChild(trBase);
		var th=document.createElement("th") ;
		trBase.appendChild(th);
		th.innerHTML=machine.name;
		th.style.width="50px";
		//
		var trValue=document.createElement("tr") ;
		trValue.className="value";
		tb.appendChild(trValue);
		th=document.createElement("th") ;
		trValue.appendChild(th);
		th.innerHTML="&nbsp;";		
		return {tb:tb,trBase:trBase,trValue:trValue};
	}	
	
}


//main

window.onresize = resize;
resize();
$("aliceSend").addEventListener("click",aliceSend);
$("yvesReadAndSend").disabled = true;
$("bobRead").disabled = true;
$("bobTests").disabled = true;
$("bobSummary").disabled = true;
$("bobExtractKey").disabled = true;
$("aliceExtractKey").disabled = true;

/*


*/

// Alice events
function aliceSend(evt) {
	evt.target.disabled = true;
	$("bobRead").disabled = false;
	$("bobRead").addEventListener("click",bobRead);	
	AliceMachine.create(520);	
	AliceMachine.sendOnline ();	
	DebugView.displayTitle("Total des photons envoyés");
	DebugView.display(AliceMachine);
	$("yvesReadAndSend").disabled = false;
	$("yvesReadAndSend").addEventListener("click",yvesReadAndSend);
}
// Yves events
function yvesReadAndSend(evt) {
	evt.target.disabled = true;
	$("bobRead").disabled = false;
	$("bobRead").addEventListener("click",bobRead);
	YvesMachine.readOnline ();
	YvesMachine.sendOnline ();	
}

//
// Bob events
function bobRead(evt) {
	$("yvesReadAndSend").disabled = true;
	evt.target.disabled = true;
	$("bobTests").disabled = false;
	$("bobTests").addEventListener("click",bobTests);
	BobMachine.readOnline ();
	DebugView.displayTitle("Total des photons reçus");
	DebugView.display(BobMachine);
}

	/*
	log("BobMachine.data");
	logArr(BobMachine.data);
	log("Online.buffer");
	logArr(Online.buffer);
	*/
	/**/
//


// Bob events
function bobTests(evt) {
	evt.target.disabled = true;
	$("bobSummary").disabled = false;	
	$("bobSummary").addEventListener("click",bobSummary);	
	var percent=.2;
	BobMachine.testAliceData (percent);
	BobMachine.displayTitle("Test (envoyé sur canal classique) sur "+(percent*100)+"% des bits envoyés ; choisis aléatoirement");
	BobMachine.displayVerif(AliceMachine,BobMachine.globalTests);
	BobMachine.displayVerif(BobMachine,BobMachine.globalTests);
}

//log("BobMachine.tests : "); b nn
//logTests(BobMachine.tests);

//


// Bob events
function bobSummary(evt) {
	evt.target.disabled = true;
	BobMachine.displayTitle("Comparaison des bases identiques" );
	BobMachine.displayVerif(AliceMachine,BobMachine.sameBaseTests);
	BobMachine.displayVerif(BobMachine,BobMachine.sameBaseTests);
	BobMachine.displayRecap();
	if (BobMachine.summary.sameBasePercent>10) {
		BobMachine.displayTitle ("<div style='color:red;'>la transmisssion a été piratée !!</div>");
	} else if (BobMachine.summary.sameBasePercent!=0) {
		BobMachine.displayTitle ("<div style='color:orange;'>Transmission non fiable !</div>");
	} else {
		$("bobExtractKey").disabled = false;	
		$("bobExtractKey").addEventListener("click",bobExtractKey);		
	}
}
function bobExtractKey(evt) {
	evt.target.disabled = true;
	$("aliceExtractKey").disabled = false;	
	$("aliceExtractKey").addEventListener("click",aliceExtractKey);	
	
	BobMachine.extractKey (128);
	DebugView.displayTitle("Clé générée par Bob ( longueur = "+BobMachine.key.length+" bits )" );
	DebugView.display(BobMachine,BobMachine.key);
	
}

function aliceExtractKey(evt) {
	evt.target.disabled = true;
	//
	AliceMachine.extractKey();
	DebugView.displayTitle("Clé générée par Alice ( longueur = "+AliceMachine.key.length+" bits )" );
	DebugView.display(AliceMachine,AliceMachine.key);
}

//util func
function logArr (arr) {
	if(arr.length==0) log(">> vide !");
	for (var i in arr) {
		log(arr[i]._base+" / "+arr[i]._value);
	}	
}
function logTests (arr) {
	if(arr.length==0) log(">> vide !");
	for (var i in arr) {
		log(arr[i].base+" / "+arr[i].value+" at "+arr[i].index);
	}	
}
function log (o) {
	$("info").innerHTML+=o+"<br/>";
}
function $ (id) { 
	return document.getElementById(id);
}
function $$ (str,all="",parent=null) {
	if (parent==null) parent=document;
	if (all=="all") return document.querySelector(str) ;
	else return document.querySelectorAll(str) ; 
}

function resize() {
   $("buttons").style.top=""+(window.innerHeight / 2 +400)+"px";   
 }
// toolsBox
