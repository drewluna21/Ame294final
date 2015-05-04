 
  var PlsaddNew = function()
 {
  dialogInput.set('list'," Enter new todo ! ")
 }
  var doConfirm = function()
 {
  dialogConfirm.set('confAnswer'," Are you sure you want to delete?")
 }
 var dialogInput = 
 {
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
      hide: function()
      {
        document.getElementById("overlay").innerHTML = "";
        document.getElementById("overlay").style.display = "none";
      },
      done: function()
      {
        document.getElementById(dialogInput.id).innerHTML = document.getElementById("overlay").getElementsByTagName('input')[0].value;
        dialogInput.hide();
      },
      cancel:function()
      {
        
        dialogInput.hide();
      }
  }
var dialogConfirm = {
  
  set: function(resultID, question)
  {
    dialogConfirm.id = resultID;
    var output="";
    output = output + "<p>" + question + "</p>";
    output = output + "<br>" + "<a class ='btn btn-default' href='javascript:dialogConfirm.done()'> yes</a>";
    output = output + "<a class ='btn btn-default' href='javascript:dialogConfirm.cancel()'> no </a>";
    document.getElementById("overlay").innerHTML = output;
    document.getElementById("overlay").style.display = "block";
  },
  hide: function(){
    document.getElementById(dialogConfirm.id).innerHTML = dialogConfirm.value;
    document.getElementById("overlay").innerHTML = "";
    document.getElementById("overlay").style.display = "none";
  },
  done: function(){
    dialogConfirm.value = true;     
    dialogConfirm.hide();
  },
  cancel:function(){
    dialogConfirm.value = false;
    dialogConfirm.hide();
  }
}