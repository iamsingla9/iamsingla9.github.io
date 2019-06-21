var data_to_display = document.getElementById('name_list');
var result_of_search = document.getElementById('search_list');
var names = [];
var rolls = [];
var ages = [];
var genders = [];

ListAll();
Close();
Close_search();

function ListAll() {
	var data = '';
	if (rolls.length > 0) {
		sorted = rolls.sort(function (a, b) {  return a - b;  });
		for (i = 0; i < sorted.length; i++) {
			data += '<tr>';
			data += '<td>' + rolls[i] + '</td>';
			data += '<td>' + names[i] + '</td>';
			data += '<td>' + ages[i] + '</td>';
			data += '<td>' + genders[i] + '</td>';
			data += '<td colspan="2"><center><button class="btn btn-warning" onclick="Edit(' + i + ')"><span class="glyphicon glyphicon-edit"></span> Edit</button> | <button class="btn btn-danger" onclick="Delete(' + i + ')"><span class="glyphicon glyphicon-trash"></span> Delete</button></center></td>';
			data += '</tr>';
		}
	}
	
	data_to_display.innerHTML = data;
};


function ListSearch(item) {
	
	var data = '';
	var count = null
	for (i = 0; i < rolls.length; i++) {
		if(item == rolls[i]){
			count = i
			}
	}
	if(count != null){
		data += '<tr>';
		data += '<td>' + rolls[count] + '</td>';
		data += '<td>' + names[count] + '</td>';
		data += '<td>' + ages[count] + '</td>';
		data += '<td>' + genders[count] + '</td>';
		data += '<td colspan="2"><center><button class="btn btn-warning" onclick="Edit(' + count + ')"><span class="glyphicon glyphicon-edit"></span> Edit</button> | <button class="btn btn-danger" onclick="Delete(' + count + ')"><span class="glyphicon glyphicon-trash"></span> Delete</button></center></td>';
		data += '</tr>';
	}
	else {
		Close_search();
		window.alert("Roll number not found");
	}
	
	result_of_search.innerHTML = data;
};


function Add() {
    var el = document.getElementById('roll')
	var e2 = document.getElementById('name')
	var e3 = document.getElementById('age')
	var e4 = document.getElementById('gender')
	var roll = el.value;
	var name = e2.value;
	var age = e3.value;
	var gender = e4.value;
	var roll_search_result = Search_roll(roll);
	if(roll_search_result != null) {
		el.value = '';
		e2.value = '';
		e3.value = '';
		window.alert("Roll number already exists, please insert another roll number.");
	}
	else {
		var result = Validate(roll,name,age);
		if(result){
			el.value = '';
			e2.value = '';
			e3.value = '';
			window.alert(result);
		}
		else {
			if (roll && name && age && gender) {
				rolls.push(roll.trim())
				names.push(name.trim());
				ages.push(age.trim())
				genders.push(gender.trim())
				el.value = '';
				e2.value = '';
				e3.value = '';
			}
		}
	}
	ListAll();
};

function Delete(item) {
	Close_search();
	rolls.splice(item, 1);
	names.splice(item, 1);
	ages.splice(item, 1);
	genders.splice(item, 1);
	ListAll();
	
};

function Edit(item) {
	Close_search();
	var el = document.getElementById('edit_roll')
	var e2 = document.getElementById('edit_name')
	var e3 = document.getElementById('edit_age')
	var e4 = document.getElementById('edit_gender')
	el.value = rolls[item];
	e2.value = names[item];
	e3.value = ages[item];
	e4.value = genders[item];
	document.getElementById("edit_roll").disabled = true;
	document.getElementById('edit').style.display = 'block';
	self = this;
	
	document.getElementById('update').onsubmit = function() {
	Close_search();
	var roll = el.value;
	var name = e2.value;
	var age = e3.value;
	var gender = e4.value;
	var result = Validate(roll,name,age);
	if(result){
		window.alert(result);
	}
	else{
		self.names[item] = name
		self.ages[item] = age
		self.genders[item] = gender
		self.ListAll();
		Close();
	}
	}
};

function Search(){
	var el = document.getElementById('search_roll');
	var roll = el.value;
	el.value = '';
	if(roll != '' && !isNaN(roll)) {
		document.getElementById('search_results').style.display = 'block';
		ListSearch(roll)
	}
	else {
		window.alert("Please fill the roll number in numeric format to search.");
	}
}

function Validate(roll,name,age) {
	var result = '';
	var letters = /^[A-Za-z ]+$/;
	if (isNaN(roll) || roll == '' || roll>0){
		result += "Roll number should be numeric.\n";
	}
	
	if(!name.match(letters) || name == ''){  
		result += "Name should be alphabetic.\n";
	}
	
	if(isNaN(age) || age == '' || age>0){  
		result += "Age should be numeric.\n";
	}
		
	return(result);
}

function Search_roll(roll){
	var data = '';
	var count = null
	for (i = 0; i < rolls.length; i++) {
		if(roll == rolls[i]){
			count = i
			}
	}
	return(count);
}


function Close() {
	document.getElementById('edit').style.display = 'none';
}

function Close_search() {
	document.getElementById('search_results').style.display = 'none';
}	
