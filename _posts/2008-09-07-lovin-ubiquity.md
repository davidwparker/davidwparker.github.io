---
layout: post
title: Lovin Ubiquity
categories: [posts, hascode]
oldurl: http://davidwparker.com/2008/09/07/lovin-ubiquity/
---
So Mozilla's [Ubiquity](http://labs.mozilla.com/2008/08/introducing-ubiquity/) project is extremely cool.  If you haven't checked it out yet, do it now.  Ubiquity is an extremely efficient way to get around the web.

I wanted an easy way to search rspec documentation.  Not wanting to work too hard, I just forked Jack Dempsey's code (which searched the Ruby documentation) and changed it to handle rspec instead.

{% highlight javascript %}
CmdUtils.CreateCommand({
    name:        "rspec",
    takes:       {"function": noun_arb_text},
    icon:        "http://ruby-doc.org/favicon.ico",
    homepage:    "http://davidwparker.com",
    author:      {name: "Jack Dempsey, fork by David Parker", email: "davidwparker@gmail.com"},
    license:     "MPL,GPL",
    description: "Search rspec functions documentation",
    help:        "Select a rspec function",
    execute: function(directObject) {
        var url       = "http://apidock.com/rspec/search?query={QUERY}&commit=Search"
        var urlString = url.replace("{QUERY}", directObject.text);
        Utils.openUrlInBrowser(urlString);
    },
    preview: function(pblock, directObject) {
        searchText = jQuery.trim(directObject.text);
        if(searchText.length <= 0)
        {
          pblock.innerHTML = "Search rspec function documentation";
          return;
        }
        var previewTemplate = "Search rspec function documentation of ${query}";
        var previewData     = {query: searchText};
        pblock.innerHTML    = CmdUtils.renderTemplate(previewTemplate, previewData);
    }
});
{% endhighlight %}

You can find it [here](http://gist.github.com/9310) on Github if you want to subscribe to it.

Edit: I also just created a decent one for searching on Colourlovers.com.  You can search for colors by colors.  And you can search for palettes by colors/hex.  Here it is:

{% highlight javascript %}
var cs_pa = ["colors","palettes"],
  noun_type_cs_pa = new CmdUtils.NounType( "colors or palettes", cs_pa );
CmdUtils.CreateCommand({
  name: "color",
  description: "Find colors and palettes on Colour Lover.  Search by colors or search by colors or hex for palettes.",
  help: "Try issuing "color blue" or "color #005F6B" by palettes",
  icon: "http://colourlovers.com.s3.amazonaws.com/favicon.ico",
  takes: {"color or hex": noun_arb_text},
  modifiers: { "by": noun_type_cs_pa},
  execute: function( directObj, modifier) {
    var value = directObj.text;
    var by = modifier.by.text;
    var url = "http://www.colourlovers.com/colors/search?hsv=&sortType=rank&sortBy=asc&query={QUERY}";
    if (value){
      if (by){
        if (by.indexOf("palettes") > -1){
          url = url.replace(/colors/g, "palettes");
          url = url + "&hex={HEX}";
        }
      }
      if (value.indexOf("#") > -1){
        value = value.replace("#","");
        url = url.replace("{HEX}", value);
        url = url.replace("{QUERY}", "");
      }
      else{
        url = url.replace("{HEX}", "");
        url = url.replace("{QUERY}", value);
      }
      url = url.replace("{QUERY}", value);
    }
    Utils.openUrlInBrowser(url);
  },
  preview: function( pblock, directObj, modifier) {
    var value = directObj.text;
    var by = modifier.by.text;
    var message = "Searches Colour Lover Colors by color and search Palettes by color/hex.";
    if (value.length > 2){
      if (by){
        if (by.indexOf("palettes") > -1){
          message = message.replace("Lover Colors", "Lover Palettes");
          if (value) {
            if (value.indexOf("#") > -1){
              message = message.replace("by color and search Palettes by color/hex", "by the hex value: " + value);
            }
            else{
              message = message.replace("by color and search Palettes by color/hex", "by the color: " + value);
            }
          }
        }
      }
      else{
        if (value){
          if (value.indexOf("#") > -1){
            message = "Colour Lovers cannot search Colors by hex.";
          }
          else {
            message = message.replace("by color and search Palettes by color/hex", "by the color: " + value);
          }
        }
      }
    }
    pblock.innerHTML = message;
  }
});
{% endhighlight %}

and on [here](http://gist.github.com/9332) on Github
