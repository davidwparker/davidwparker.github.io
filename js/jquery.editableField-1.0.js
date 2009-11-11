/*
 * jQuery.editableField
 * 
 * Makes any generic element editable.  Make sure that you don't have containing items, 
 *  or you'll end up editing those as well.
 * Note: as it is currently programmed, only one field can be edited at a time.  I'd like
 *  to change this for the future.
 *
 * @version 1.0
 * @author David Parker [davidwparker(at)gmail(dot)com]
 * @copyright Copyright (c) 2009 David Parker
 * @license MIT
 * @demo: http://davidwparker.com/
 *
 * @function editableField(options)
 * @param    options object
 *  @options            default  description
 *   onSubmit  null     callback for something changed
 *   classEditing       editing  class applied to currently element being edited
 *   textCancelLink     cancel   text to be applied to cancel link
 *   popupAttrs         object   attributes to be applied to popup div
 *     class    : editPopup
 *   popupCSS           object   css to be applied to popup div
 *     position : absolute
 *   textAttrs          object   attributes to be applied to input text
 *     class    : editInput
 *   textCSS            object   css to be applied to input text
 *     {}
 *   buttonAttrs        object   attributes to be applied to save button
 *     class    : saveButton
 *     value    : Save
 *   buttonCSS          object   css to be applied to save button
 *     {}
 *   cancelAttrs        object   attributes to be applied to cancel link
 *     class    : cancel
 *     href     : #
 *   cancelCSS          object   css to be applied to cancel link
 *     {}
 * @return   jQuery  object
 *
 */
(function($){
$.fn.extend({
editableField: function(opts){
  var defaults = {
    onSubmit: null,
    classEditing:"editing",
    textCancelLink:"cancel",
    popupAttrs:{class:"editPopup"},
    popupCSS:{position:"absolute"},
    textAttrs:{class:"editInput"},
    textCSS:{},
    buttonAttrs:{
      class:"saveButton push-right-light-1",
      value:"Save"
    },
    buttonCSS:{},
    cancelAttrs:{
      class:"cancel push-right-light-1",
      href:"#"
    },
    cancelCSS:{}
  }, o = $.extend(true, {}, defaults, opts);

  return this.each(function(){
    $(this).click(function(){
      //only enables one popup a time right now
      if ($("."+o.popupAttrs.class).length < 1 ){
        var $this = $(this), oldVal = $this.html(),
        //determine absolute position for popup div and draw it
          pos = $this.position(), left = pos.left+2, top = pos.top+2,
          $popup  = $("<div />").attr(o.popupAttrs).css(o.popupCSS).css({left:left+"px",top:top+"px"}),
          $text   = $("<input type='text' />").attr(o.textAttrs).css(o.textCSS),
          $button = $("<input type='button' />").attr(o.buttonAttrs).css(o.buttonCSS),
          $cancel = $("<a />").attr(o.cancelAttrs).css(o.cancelCSS).html(o.textCancelLink);
        $this.data("oldValue",{OldValue:oldVal});
        $this.addClass(o.classEditing);
        $popup.append($text).append($button).append($cancel).appendTo($("body"));
        
        $("."+o.textAttrs.class).val(oldVal).focus();

        //attach click events
        $button.click(function(){
          var $popup = $(this).parents("."+o.popupAttrs.class),
            oldVal = $("."+o.classEditing).data("oldValue").OldValue,
            val = $popup.find("."+o.textAttrs.class).val();
          $popup.restoreEditableField(val, o.classEditing, o.popupAttrs.class);
          if (oldVal !== val && o.onSubmit)
              o.onSubmit();
        });
        $cancel.click(function(){
          var $popup = $(this).parents("."+o.popupAttrs.class),
            oldVal = $("."+o.classEditing).data("oldValue").OldValue;
          $popup.restoreEditableField(oldVal, o.classEditing, o.popupAttrs.class);
          return false;
        });
      }
    });
  });
},
restoreEditableField: function(val, editing, popup){
  return this.each(function(){
    $("."+editing).html(val).removeClass(editing);
    $(this).remove();
  });
}
});
})(jQuery);
