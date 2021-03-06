---
layout: book
title:  "Book: Pro Git"
categories: [posts, books]
---
* Read: March 2012
* Rating: 9.0/10

[Pro Git](http://www.amazon.com/dp/1430218339?tag=parker08-20) by Scott Chacon is the best way to really learn Git. Scott has obviously been using Git for a very long time, and he knows the internals, backwards and forwards. If you don't know the difference between rebase and merge or when to use what command, then you should read this book. Knowing how to use your tools to the best of your ability is incredibly important, and Git is no exception. The book can also be read free online at: [http://progit.org/book/](http://progit.org/book/).

## My Notes

I'm not really going to get into the pros/cons or the history of Git here, mostly just technical notes. Feel free to check out "why Git is better than X":http://whygitisbetterthanx.com/ if you're interested in pros/cons.

### Setting up Git:

#### Modify configuration file:
* ~/.gitconfig OR .gitconfig in $HOME on Windows

#### Identity:
* git config --global user.name "David Parker"
* git config --global user.email davidwparker@gmail.com

#### Editor:
* git config --global core.editor emacs

#### Check Settings
* git config --list

### Getting Help:

#### Any of the following commands work:
* git help <verb>
* git <verb> --help
* man git-<verb>

#### Creating a repository:
* git init

#### Cloning a repository:
* git clone <url> <optional different directory>
* git clone https://github.com/davidwparker/opengl-3defense.git <optional different directory>
  * This will clone a git repository into your working directory in directory opengl-3defense
  * Or add a different directory by adding the directory name after the <url>

#### Checking the status of files:
* git status

#### Lifecycle (status) of files:
* untracked | unmodified | modified | staged
* untracked => add => unmodified
* unnmodified => remove => untracked
* unmodified => edit => modified
* modified => stage => staged
* staged => commit => unmodified

#### Adding files:
* git add <filename> OR git add *.<type>

#### Commit new files:
* git commit
* git commit -m 'inline commit message'

#### Staged files:
* A staged file is a file that has previously been committed and has since been changed.

#### Commit staged files:
* Same as commit new files

#### Ignoring files:
* touch .gitignore

#### The rules for the patterns of what can be in the .gitignore file:
* Blank lines or lines starting with # are ignored
* Standard glob patterns work
* You can end patterns with a forward slash (/) to specify a directory
* You can negate a pattern by starting with an exclamation point (!)

#### Diff'ing files:
* git diff
  * git diff is used for multiple reasons, but the most common is to see what has changed but not yet staged.
* git diff --staged
  * If you've added files to staging, and you'd like to see what the diff of those changes, simply use the following:

#### Removing files:
* git rm <file>
  * Note that the file is removed from the filesystem as well (can be kept with --cached flag)

#### Move files:
* git mv <file> <newfile>
  * This is the same as running the commands: git rm --cached orig; mv orig new; git add new

#### Logging:
* git log
  * By default, git log lists commits in a repository in reverse chronological order.

#### Other awesome logging stuff:
* --pretty=format:"YOUR FORMAT"
  * Very powerful way to specify own log output format
* -p => shows diff introduced in each commit
* -# => shows only the last # commits.
* --oneline => shows commits one one line
  * git log --oneline
* many, many more!

#### Undoing changes:
* Changing last commit:
  * git commit --amend

* Unstaging a staged file:
  * git reset HEAD <filename>

* Unmodify a modified file:
  * git checkout -- <filename>
  * Warning: this overwrites the file, so you will lose any changes that you made. You sparingly.

#### Working with remote:
* git remote
  * You can also see the URL git has stored:
* git remote -v

#### Add remote:
* git remote add <shortname> <url>
* git remote add origin git@github.com:davidwparker/git.git

#### Push remote:
* git push <remote name> <branch name>
* git push origin master
  * Pushing will be rejected if someone else has since pushed upstream

#### Fetch remote:
* git fetch origin
  * Fetching from a remote will pull down data you don't have yet.
  * It pulls the data into your local repository, but it doesn't automatically merge it with any of your work, or modify what you're currently working on.

#### Changing remote:
* git remote rename <old> <new>
  * You can easily rename a remote
* git remote rm <name>
  * Or remove a remote

#### Tagging:
* Tagging allows Git to forever remember a snapshot of a repository.
* There are two types of tags in Git:
* Lightweight: a pointer to a specific commit
* Annotated: full objects in the Git database
* It is recommended to use annotated tags.

#### Annotated tag:
* git tag -a <tagname> -m 'a message'

#### List tags:
* git tag

#### Signed tag:
* git tag -s <tagname> -m 'a message'
  * This uses GPG (GNU Privacy Guard)
  * The GPG signature can be seen using:
* git show <tagname>

#### You can verify a signed tag as long as you have the signer's public key:
* git tag -v <tagname>

#### Lightweight tag:
* git tag <tagname>
  * This will create a lightweight tag. Lightweight tags cannot use the -a, -s, or -m flags.

#### Tagging later:
* git log --pretty=oneline
  * If you forgot to tag, you can check your commits with:

* git tag -a <tagname> <checksum>
  * And then tag using the checksum:

#### Pushing tags:
* Tags aren't pushed when doing a push, you need to specify them
  * git push origin <tagname>
  * git push origin --tags
* Use the latter to push all tags

#### Branching:
* One of Git's most powerful features is its branches.
* Git's branches are incredibly lightweight, and it is nearly instantaneous to switch back and forth between branches.
* Git encourages a workflow that branches and merges often, even multiple times a day.

#### Why Branch?
* A realistic workflow may be as follows:
  * Working on an app
  * Create a branch for a story you're working on
  * Do some work
* Then, you get a call for critical hotfix needed:
  * Revert back to production branch
  * Create branch for hotfix
  * Test hotfix and merge the branch, push to production
  * Switch back to original story and continue work

#### Creating a branch:
* git branch <branch name>
  * This creates a pointer to the same commit you're currently on.

#### List branches:
* git branch

#### Switching branches:
* git checkout <branch name>

#### Checkout a branch when creating:
* git checkout -b <branch name>

#### Delete branches:
* git branch -d <branch name>

#### Merging branches (fast forward):
* git merge <branch name>
* If you don't edit a branch, and then merge another branch where you have changed things, then Git performs a fast forward.
* If you do edit a branch, and then merge another branch where you also have made edits, then Git performs a three-way merge: the common ancestor snapshot, the merged branch, and the merging branch.
* If you edit a branch, and attempt to merge another branch where you have edited the same part of the same file, you may end up with a conflict.
  * You can see what has changes with git status
  * Open this file in your editor and you can see where the conflict is:
  * Changes made in HEAD are above ======= and changes made in branch are below.
  * After you change the file as you like, remove thing <<<<<<<, =======, and >>>>>>> lines, then you can add the file normally with git add.

#### Branching (log):
* Now that we have merged, if we do a log, we can actually see the branches (in ASCII, on the left):
* git log --pretty=oneline --graph

#### Branching tricks:
* You can easily see what branches you have already merged with your current branch:
  * git branch --merged

* Or not merged:
  * git branch --no-merged

#### Remote branches:
* Remote branches work similarly to local branches, except that they take the form <origin>/<branch>.
* In general, you must remember to "git fetch" from remote to get the latest.
* From there, you don't get that work in your working directory, but you can merge it with "git merge origin/<new branch>"
* And you must "git push" to push the latest to the remote repository.

#### Rebasing:
* Rebasing is another tool that allows you to integrate changes from one branch to another.
* Rebasing allows you to take all the changes that were committed on one branch and replay them on another branch.
* At this point, you can go back to master and fast forward.
* Flow:
  * git checkout rebased
  * git rebase master
  * git merge rebased

* The most often usecase for rebase is to make sure your commits apply cleanly to a remote branch.
* Rebasing is great for cleaning up when you have made a ton of 'unnecessary' commits.

* If you follow the previous workflow, you'll be ok.
* Otherwise, a warning: do not rebase commits that you have pushed to a public repository.

When you rebase, you're abandoning existing commits and creating new ones that are similar but different.

Only rebase commits that you haven't push publicly.

#### Git on the Server:
* To run a Git server, all you need is to choose protocols you want your server to communicate with:
  * Local
  * SSH
  * Git
  * HTTP(S)

There's much more on specific Git tools, including revision selection, interactive staging, stashing, rewriting history, debugging, submodules, subtree merging, Git configuration, Git attributes, and Git hooks, which I won't be blogging about here. I personally don't use a lot of these (right now), with the exception of stashing.

The chapter on Git internals is also very interesting, which discusses plumbing and porcelain, Git Objects, Git References, packfiles, and more. It's also worth checking out if you'd like to see what the git commands are really doing.

In all, I can't recommend the book enough, especially for those interested in, or those who use but don't really understand, Git.
