const dataURL = "https://api.jsonbin.io/b/5e905926172eb643896166e7";
const fieldsDiv = 'form-group';
var gtext = '';

function getTextFromURL(url){
	$.getJSON(url, function(data) {
		gtext = data.text.toString();
		makeFields(data.text,fieldsDiv);
	});
}

function makeFields(txt,fieldsDiv){
	let words = txt.toString().split(' ');
	let futureFields = [];
	for(let w = 0; w < words.length; w++){
		if(words[w].indexOf('{') >= 0 && words[w].indexOf('}') >= 0){
			futureFields[futureFields.length] = words[w].substring(words[w].indexOf('{')+1,words[w].indexOf('}'));
		}
	}
	futureFields = Array.from(new Set(futureFields));// делаем уникальный массив
	
	let res = '';
	for(w = 0; w < futureFields.length; w++){
		res += '<label for="'+futureFields[w]+'">'+futureFields[w]+'</label><input type="text" class="form-control" id="'+futureFields[w]+'" name="'+futureFields[w]+'">';
	}
	$('.'+fieldsDiv).append(res);
}

function handleButton() {
  handleData();
}

function handleData() {
	let result = gtext;
	$('.form-control').each(function(){
		let findstr = '{'+$(this).attr('id')+'}';
		let rex = RegExp(findstr,'g');
		result = result.replace(rex, $(this).val());
	});
	$("#result").text(result);
}

function init() {
	getTextFromURL(dataURL);
	$("#button-fetch").click(handleButton);
}

$(document).ready(init);
