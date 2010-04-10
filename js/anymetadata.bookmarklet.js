var ls = 'localStorage' in window;
if (ls){
//modify this so it doesn't append these every time bookmarklet is pressed
_j2=document.createElement('SCRIPT');
_j2.type='text/javascript';
_j2.src='http://code.google.com/p/jsonovich/source/browse/trunk/modules/json2.js';
//I'd like to find a better source for json2
document.getElementsByTagName('head')[0].appendChild(_j2);
_jq=document.createElement('SCRIPT');
_jq.id="_amd_jq";
_jq.type='text/javascript';
_jq.src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(_jq);
_jqui=document.createElement('SCRIPT');
_jqui.id="_amd_jqui";
_jqui.type='text/javascript';
_jqui.src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js';
document.getElementsByTagName('head')[0].appendChild(_jqui);
_jquicss=document.createElement('LINK');
_jquicss.type='text/css';
_jquicss.rel='stylesheet';
_jquicss.href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/themes/base/jquery-ui.css';
document.getElementsByTagName('head')[0].appendChild(_jquicss);

//use intervals to make sure the scripts are appended before using them.
var amdJqIntId = 0, amdJquiIntId = 0;
function checkLoaded(id, intervalId, callback){
  var item = document.getElementById(id);
  if (item){
    clearInterval(intervalId);
    if (callback)
      callback();
  }
}
function checkJq(){
  checkLoaded("_amd_jq", amdJqIntId, function(){
    amdJquiIntId = setInterval(function(){checkLoaded("_amd_jqui", amdJquiIntId, nowReady());},500);
  });
}
amdJqIntId = setInterval(function(){checkJq()},500);
checkJq();
//jquery etc is loaded
function nowReady(){
  var $amdDate = $('<span class="_amd_date"></span>'),
      $amdText = $('<input type="text" class="_amd_text" name="_adm_line" /><br />'),
      $amdTA   = $('<textarea class="_amd_text" name="_amd_text"></textarea><br />'),
      $amdDialog = $('<div id="_amd_dialog"></div>').dialog({autoOpen:false,title:'Add Any MetaData',width:500,dialogClass:'_amd_dialog',closeOnEscape:false});
  createDialog();

  function createDialog(){
    var $amdOpts = $('<a href="#" class="_amd_add" data-type="text">add text</a> <a href="#" class="_amd_add" data-type="textarea">add textarea</a><br />'),
        $amdSave = $('<input class="_amd_save" id="_amd_save" type="button" value="Save to Domain">');
    $amdDialog.append($amdOpts).append($amdSave);

    var _amd = localStorage.getItem('_amd');
    if (_amd){
      var _amdObjs = JSON.parse(_amd);
      for (var i=0; i < _amdObjs.length; i++){
        var _amdObj = _amdObjs[i], $clone;
	if (_amdObj.type === "text"){
	  $clone = $amdText.clone();
	  $clone.val(_amdObj.value);
	}
	else if (_amdObj.type === "textarea"){
	  $clone = $amdTA.clone();
	  $clone.html(_amdObj.value);
	}
	var $obj = $clone.before($amdDate.clone());
	$obj.filter("._amd_date").html(_amdObj.date);
	$("#_amd_save").before($obj);
      }
    }

    $amdDialog.dialog('open');
  };

  $("._amd_save").click(function(){
    //get the form values
    var values = [];
    $("._amd_text").each(function(){
      var $this = $(this),
	  value = $this.val(),
	  type = $this.attr("type"),
	  date = $this.prev('._amd_date').html();
      if (value !== '')
        values.push({'value':value,'type':type,'date':date});
    });

    localStorage.setItem('_amd',JSON.stringify(values));
    $amdDialog.dialog('close').remove();
  });

  $("._amd_add").click(function(){
    var type = $(this).attr("data-type"), $clone, date = new Date();
    if (type === "text"){
      $clone = $amdText.clone();
    }
    else if (type === "textarea"){
      $clone = $amdTA.clone()
    }
    var $obj = $clone.before($amdDate.clone());
    $obj.filter("._amd_date").html(date.toDateString());
    $("#_amd_save").before($obj);
    return false;
  });

  $(".ui-dialog-titlebar-close").click(function(){
    $amdDialog.dialog('close').remove();
  });
}//end nowReady
}//end local storage if
else{
  alert("This browser doesn't support local storage.");
}