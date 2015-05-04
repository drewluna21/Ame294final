var firstName = function()
 {
 	dialogInput.set('firstName'," Enter First Name ")
 }

 var dialogInput = {
	id: null,
	value: null,
		set: function(resultID, question)
	{
		dialogInput.id = resultID;
		var output="";
		output = output + "<p>" + question + "</p>";
		output = output + "<input type='text'/>";
		output = output + "<br>" + "<a class ='btn btn-default' href='javascript:dialogInput.done()'> Done</a>";
		output = output + "<a class ='btn btn-default' href='javascript:dialogInput.cancel()'> Cancel </a>";
		document.getElementById("overlay").innerHTML = output;
		document.getElementById("overlay").style.display = "block";
	},
	hide: function(){
		document.getElementById("overlay").innerHTML = "";
		document.getElementById("overlay").style.display = "none";
	},
	done: function(){
		document.getElementById(dialogInput.id).innerHTML = document.getElementById("overlay").getElementsByTagName('input')[0].value;
		dialogInput.hide();
	},
	cancel:function(){
		
		dialogInput.hide();
	}
}