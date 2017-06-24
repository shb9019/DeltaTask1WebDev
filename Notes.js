var notes = [];
var noteids = [];
var priors = []

function initialize(){
		var createButton = document.createElement("i");
		createButton.setAttribute("class","fa fa-plus fa-5x");
		createButton.setAttribute("aria-hidden","true");
		createButton.setAttribute("id","createButtonNew");
		createButton.setAttribute("onclick","show('','')");
		var butt = document.getElementById("Buttons");
		butt.appendChild(createButton);

		var sortButton = document.createElement("i");
		sortButton.setAttribute("class","fa fa-sort fa-5x");
		sortButton.setAttribute("id","sortButton");
		sortButton.setAttribute("aria-hidden","true");
		sortButton.setAttribute("onclick","sort()");
		butt.appendChild(sortButton);

}

function loadSaved(){
	notes = JSON.parse(localStorage.getItem("notes"));
	noteids = JSON.parse(localStorage.getItem("noteids"));
	priors = JSON.parse(localStorage.getItem("priors"));
	if(notes){
		for(var i=0;i<notes.length;i++){
			makeNote(noteids[i],notes[i],priors[i]);
		}
	}		
	else{
		notes = [];
		noteids = [];
		priors = [];;
	}
}

function show(m,n){
	document.getElementById("createButtonNew").style.display = 'none';
	var intro = document.getElementById("welc0me");
	if(intro){
		document.getElementById("Notes").removeChild(intro);
	}
	var enter = document.createElement("div");
	enter.setAttribute("id","Enter")
		var bar = document.createElement("div");
		bar.setAttribute("id","enterBar");
		bar.setAttribute("onclick","changeColor()");
			var b = document.createElement("div");
			b.setAttribute("id","showId");
				var p = document.createElement("p");
				p.setAttribute("id","IdText");
				var text = document.createTextNode("MAKE NOTE");
				p.appendChild(text);
			b.appendChild(p);
		bar.appendChild(b);

		var form = document.createElement("form");
		form.setAttribute("onSubmit","return false;");
		form.setAttribute("id","fill");
		form.setAttribute("type","submit");
			var noteId = document.createElement("textarea");
			noteId.setAttribute("rows","1");
			noteId.setAttribute("id","enterNoteId");
			noteId.setAttribute("form","fill");
			noteId.setAttribute("placeholder","Note ID (Avoid Spaces)");
			noteId.value = m;
			var note = document.createElement("textarea");
			note.setAttribute("id","enterNote");
			note.setAttribute("rows","5");
			note.setAttribute("form","fill");
			note.setAttribute("value",n);
			note.setAttribute("placeholder","Enter your note here");
			note.value = n;
			

			var submit = document.createElement("input");
			submit.setAttribute("id","submitButton");
			submit.setAttribute("value","Submit");
			submit.setAttribute("onclick","makeNote(document.getElementById('enterNoteId').value,document.getElementById('enterNote').value,document.getElementById('showId').style.color)");

		form.appendChild(noteId);
		form.appendChild(note);
		form.appendChild(submit);	

		var del = document.createElement("i");
		del.setAttribute("id","CheckThis");
		del.setAttribute("onclick","removeEnter()");
		del.setAttribute("class","fa fa-times");
		del.setAttribute("aria-hidden","true");
		del.style.color = "red";
	enter.appendChild(bar);
	enter.appendChild(form);
	enter.appendChild(del);
	document.body.appendChild(enter);
}

function showIntro(){
	if(!document.getElementById("Notes").firstChild){
			var p = document.createElement("p");
				var text = document.createTextNode("Click the + to start making Notes.");
			p.appendChild(text);
			p.setAttribute("id","welc0me");
			document.getElementById("Notes").appendChild(p);	

	}
}

function makeNote(noteId,Note,col){
		checkfor(noteId);
		if(col==''){
			col = 'red';
		}
	var boo = checkvalid(noteId);
	console.log(boo);
	document.getElementById("createButtonNew").style.display = "inline";
	if(document.getElementById("Enter")){
		document.body.removeChild(document.getElementById("Enter"));
		if(boo){
			notes.push(Note);
			noteids.push(noteId);
			priors.push(col);
		}
		updateLocalStorage();
	}
	if(boo){
	var note = document.createElement("div");
		note.setAttribute("class","Note");
		note.setAttribute("id",noteId);
		var head = document.createElement("div");
			head.setAttribute("class","noteHead");
			head.setAttribute("style","background-color:"+col);
			var noteI = document.createElement("p");
				noteI.setAttribute("class","noteId");
				var t = document.createTextNode(noteId);
				noteI.appendChild(t);
			var edit = document.createElement("i");
				edit.setAttribute("class","fa fa-pencil-square-o");
				edit.setAttribute("aria-hidden","true");
				edit.setAttribute("id","editIcon");
				edit.setAttribute("onclick","editNote("+noteId+")");
			var close = document.createElement("i");
				close.setAttribute("class","fa fa-times");
				close.setAttribute("aria-hidden","true");
				close.setAttribute("id","closeIcon");
				close.setAttribute("onclick","deleteNote("+noteId+")")
			head.appendChild(noteI);
			head.appendChild(close);
			head.appendChild(edit);
		var note2 = document.createElement("p");
			note2.setAttribute("class","actualNote");
			note2.setAttribute("id","Something");
			var text = document.createTextNode(Note);
			note2.appendChild(text);
		note.appendChild(head);
		note.appendChild(note2);
	document.getElementById("Notes").appendChild(note);	
	}	

}

function changeColor(){
	var showId = document.getElementById("showId");
	var check = document.getElementById("CheckThis");
	if(showId.style.color=="red"){
		showId.style.color = "yellow";
		showId.style.borderLeft = "5px solid yellow";
		check.style.color = "yellow";
	}
	else if(showId.style.color=="yellow"){
		showId.style.color = "green";
		showId.style.borderLeft = "5px solid green";
		check.style.color = "green";
	}
	else{
		showId.style.color = "red";
		showId.style.borderLeft = "5px solid red";
		check.style.color = "red";
	}
}

function removeEnter(){
	document.body.removeChild(document.getElementById("Enter"));
	showIntro();
	document.getElementById("createButtonNew").style.display = "inline";
}

function deleteNote(a){
	var note = document.getElementById(a.id);
	document.getElementById("Notes").removeChild(note);
	for(var i=0;i<noteids.length;i++){
		if(noteids[i]==a.id){
			noteids.splice(i,1);
			notes.splice(i,1);
			priors.splice(i,1);
			updateLocalStorage();
		}
	}
	showIntro();
}

function editNote(a){
	var note = document.getElementById(a.id);
	document.getElementById("Notes").removeChild(note);
	var noteId = a.id;
	var note = note.children[1].innerHTML;
	show(noteId,note);
}

function checkfor(i){
	var el = document.getElementById(i);
	if(el){
		document.getElementById("Notes").removeChild(el);
	}
}

function checkvalid(s){
	for(var i=0;i<s.length;i++){
		if(s[i]==" "){
			alert('The entered ID is Invalid... Please do not use SPACES');
			return false;
		}
	}
	return true;
}

function updateLocalStorage(){
	localStorage.setItem("noteids",JSON.stringify(noteids));
	localStorage.setItem("notes",JSON.stringify(notes));
	localStorage.setItem("priors",JSON.stringify(priors));
}

function sort(){
	var red = [];
	var yellow = [];
	var green = [];

	for(var i=0;i<priors.length;i++){
		if(priors[i]=='red'){
			red.push(i);
		}
		else if(priors[i]=='yellow'){
			yellow.push(i);
		}
		else if(priors[i]=='green'){
			green.push(i);
		}
	}

	for(var i=0;i<yellow.length-1;i++){
		var min = i;
		for(var j = i+1;j<yellow.length;j++){
			if(noteids[yellow[min]]>noteids[yellow[j]]){
				min = j;
			}
		}

		var temp = yellow[min];
		yellow[min] = yellow[i];
		yellow[i] = temp;
	}

	for(var i=0;i<green.length-1;i++){
		var min = i;
		for(var j = i+1;j<green.length;j++){
			if(noteids[green[min]]>noteids[green[j]]){
				min = j;
			}
		}

		var temp = green[min];
		green[min] = green[i];
		green[i] = temp;
	}

	for(var i=0;i<red.length-1;i++){
		var min = i;
		for(var j = i+1;j<red.length;j++){
			if(noteids[red[min]]>noteids[red[j]]){
				min = j;
			}
		}

		var temp = red[min];
		red[min] = red[i];
		red[i] = temp;
	}

	var tempnotes = [];
	var temppriors = [];
	var tempnoteids = [];
	var tempfull = [];

	for(var i=0;i<red.length;i++){
		tempnotes.push(notes[red[i]]);
		tempnoteids.push(noteids[red[i]]);
		temppriors.push(priors[red[i]]);
	}

	for(var i=0;i<yellow.length;i++){
		tempnotes.push(notes[yellow[i]]);
		tempnoteids.push(noteids[yellow[i]]);
		temppriors.push(priors[yellow[i]]);
	}

	for(var i=0;i<green.length;i++){
		tempnotes.push(notes[green[i]]);
		tempnoteids.push(noteids[green[i]]);
		temppriors.push(priors[green[i]]);
	}

	notes = tempnotes;
	noteids = tempnoteids;
	priors = temppriors;

	updateLocalStorage();

	var not = document.getElementById("Notes");
	while(not.hasChildNodes()){
		not.removeChild(not.firstChild);
	}
	console.log("No Problem");
	loadSaved();
}

initialize();
loadSaved();
showIntro();