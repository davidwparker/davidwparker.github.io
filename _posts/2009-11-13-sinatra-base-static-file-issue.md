---
layout: post
title: Sinatra Base Static File Issue
categories: [posts, hascode]
---
I'm currently working on a fun project in [Sinatra](http://sinatrarb.com) and I came across something that was an issue.

Summary: using <code>sinatra/base</code>, you have to be sure to <code>set :static, true</code> and <code>set :public, 'public'</code> or your CSS and JavaScript files will not be found (404 errors).

On to the code... I have two projects, each with their own app.rb and config.ru:

### App 1

**app.rb**

{% highlight ruby %}
require 'sinatra'
require 'mustache/sinatra'

set :views,     'templates/'
set :mustaches, 'views/'

get '/' do
  @title = "jQuery + Sinatra + Mustache"
  mustache :index
end
{% endhighlight %}

**config.ru**

{% highlight ruby %}
require 'app2'

use Rack::ShowExceptions

run Sinatra.application
{% endhighlight %}

### App 2

**app.rb**

{% highlight ruby %}
require 'sinatra'
require 'sinatra/base'
require 'mustache/sinatra'

class App < Sinatra::Base
  register Mustache::Sinatra

  set :views,     'templates/'
  set :mustaches, 'views/'

  get '/' do
    @title = "jQuery + Sinatra + Mustache"
    mustache :index
  end
end
{% endhighlight %}

**config.ru**

{% highlight ruby %}
require 'app'

use Rack::ShowExceptions

run App.new
{% endhighlight %}

Obviously, the big difference is that one is a Sinatra application, and the other is an Sinatra extension.  My issue came about because the Sinatra extension would not find the corresponding CSS and JavaScript files in the <code>public</code> folder for that extension.

The fix is quite simple and is applied to App 2's **app.rb** file.  Just add these two lines:

{% highlight ruby %}
  set :static, true
  set :public, 'public'
{% endhighlight %}

like so: **app.rb**

{% highlight ruby %}
require 'sinatra'
require 'sinatra/base'
require 'mustache/sinatra'

class App < Sinatra::Base
  register Mustache::Sinatra

  set :views,     'templates/'
  set :mustaches, 'views/'
  #these are both required by Sinatra::Base
  # to find static files
  set :static, true
  set :public, 'public'

  get '/' do
    @title = "jQuery + Sinatra + Mustache"
    mustache :index
  end
end
{% endhighlight %}

Now the extension will be able to see the public folder and pull files from it.  In case you're interested, the code in Sinatra that tests these two attributes is at approximately <code>line 1000</code>, after the comment <code># static files route</code>, where it tests <code>pass unless options.static? && options.public?</code>.  I'm not sure if this is the desired behaviour or not and I have not found anything in the documentation about this.  I plan on contacting the Sinatra authors though to find out, or to at least be sure that they put this up in their documentation.

In the meantime, I hope this helps.
