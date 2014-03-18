---
layout: post
title: My Jekyll Rake File
categories: [posts, hascode]
---
Perhaps once I get off my lazy butt, I'll upload my Jekyll setup to Github.  In the meantime, I want to show off my Rake file, which I use to deploy this blog.

{% highlight ruby %}
task :default => [:"site:deploy:dev"]

namespace :site do
  desc "deletes _site"
  task :delete do
    puts "deleting _site"
    system('rm -r _site')
    puts "deleting _site complete"
  end

  desc "build _site"
  namespace :build do
    desc "build and deploy dev"
    task :dev => :delete do
      puts "building _site"
      system('jekyll --server')
    end
    
    desc "build pro"
    task :pro => :delete do
      puts "building production _site"
      system('jekyll')
      puts "building _site complete"
    end

  end
  
  desc "change environment"
  namespace :env do
    desc "change to development environment"
    task :dev do
      puts "change to dev environment"
      updateConfig "env: dev"
    end

    desc "change to production environment"
    task :pro do
      puts "change to pro environment"
      updateConfig "env: pro"
    end
  end

  desc "rsync _site"
  task :rsync => :"build:pro" do
    system('rsync -avrz _site/ nemo7467@www.davidwparker.com:davidwparker.com')
  end

  desc "rsync _site's CSS"
  task :rsync_css => :"build:pro" do
    system('rsync -avrz _site/css nemo7467@www.davidwparker.com:static.davidwparker.com')
  end

  desc "deploy the application"
  namespace :deploy do
    desc "builds the development _site"
    task :dev => [:"env:dev",:"build:dev"] do
      puts "dev site deployed"
    end

    desc "builds the production _site and deploys it"
    task :pro => [:"env:pro",:rsync,:rsync_css] do
      puts "pro site deployed"
    end
  end
end

private 
  def updateConfig(rep)
    lines = IO.readlines("_config.yml");
    lines[-1] = rep
    File.open("_config.yml","w") do |file|
      lines.each do |line|
        file.write(line)
      end
    end
  end
{% endhighlight %}

Basically, the overall gist is that I have ssh keys setup with Dreamhost and I can use a single command to deploy to production <code>rake site:deploy:pro</code>.  I haven't seen too many sites that have a difference for development versus production, but I went ahead and added an env variable in my _config.yml so that I could distinguish where I was working.  The main reason for this is for: 1) google-analytics are not deployed in development and 2) CSS is served from a subdomain within my domain on production.  I really like this approach and it works well for me.  If you have something similar, let me know, as I'd definitely be interested.
