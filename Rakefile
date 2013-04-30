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
      puts "building _site complete"
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
    system('rsync -avrz _site/.htaccess nemo7467@www.davidwparker.com:static.davidwparker.com/.htaccess')
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

namespace :post do
  desc "create blog post"
  task :b do
    puts "created blog post"
  end

  desc "create life blog post"
  task :l do
    puts "created life blog post"
  end

  desc "create christianity blog post"
  task :c do
    puts "created christianity blog post"
  end

  desc "create fitness blog post"
  task :f do
    puts "created fitness blog post"
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
