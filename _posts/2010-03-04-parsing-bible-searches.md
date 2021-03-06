---
layout: post
title: Parsing Bible Searches
categories: [posts, hascode]
---
My most recent endeavor is to make stellar Bible API. This post is to explain some of the pains I took to handle some different searches for the API.

When searching the Bible, there's a lot of different input that a user may provide. For example, a user may type:

* Jesus
* John
* Jesus John
* Jesus John Peter
* Jesus John 1
* Jesus 1 John 2
* Jesus 1 John 2 sin
* Jesus 1 John 2:1-10
* John 1
* John 1:1
* John 1:1-10
* John 1:1-10 love
* the love

And on and on the list goes. So basically, we're looking at the following different input:

* Keyword
* Common word
* Bible book
* Chapter
* Leading number on a Bible book (the '1' in 1 John)
* Chapter:Verse combo
* Chapter:Verse-Verse range combo

My Bible database with verses contains a single table which contains the version, book, book order, chapter, verse, and verse text. Rather than having multiple tables with version has many books, which has many chapters, which has many verses, I decided to go with a single table. I mainly did this for speed, as the extra lookup are unnecessary.  Additionally, the verses table would have to have the chapter, book, and version foreign keys in them anyway, so it's kind of pointless to separate it all out. That said, let's take a look at how I'm parsing the data. The code builds two different searches, one for passages, and one based on all input as keywords. Here's the code, and we'll dissect it below.

{% highlight python %}
common_words = ['a','e','i','o','u','an','and','as','is','it','of','or','the']
terms = q.split()
new_terms, common_words_used, args, kargs, books = [], [], [], [], []
verses = None
for term in terms:
  if term in common_words:
    common_words_used.append(term)
  else:
    new_terms.append(term)
if len(common_words_used) > 0:
  notice = "The following words are too common and were not included in the search: "
  for word in common_words_used:
    notice += "'" + word + "' "
  notices.append(notice)
if len(new_terms) == 0:
  errors.append("Enter a search term.")
elif len(new_terms) == 1 and not new_terms[0].isnumeric() and len(new_terms[0]) > 2:
  books = Verse().get_book_names_from_abbr(v, new_terms[0])
  kargs.append(Q(verseText__icontains=new_terms[0]))
else:
  book, chapter, verse, verse2 = None, None, None, None
  for i,term in enumerate(new_terms):
    if not term.isnumeric() and len(term) < 3:
      if term not in common_words_used:
        common_words_used.append(term)
        notices.append("The word '" + term + "' is too short and was not included in the search.")
    else:
      kargs.append(Q(verseText__icontains=term))
      if term.isnumeric():
        i_prev = i - 1
        i_next = i + 1
        if i_prev >= 0:
          prev_term = new_terms[i_prev]
          book_names = Verse().get_book_names_from_abbr(v, prev_term)
          if len(book_names) > 0:
            chapter = new_terms[i]

        if book is None:
          try:
            next_term = new_terms[i_next]
            book_names = Verse().get_book_names_from_abbr(v, new_terms[i] + " " + next_term)
            if len(book_names) > 0:
              book = book_names[0]
          except:
            pass

      else:
        book_names = Verse().get_book_names_from_abbr(v, term)
        result = re.match(r'^(?P<chapter>\d+)(:)?(?P<verse>\d+)?(\-)?(?P<verse2>\d+)?$', term)
        if result is not None:
          chapter = result.group('chapter')
          verse = result.group('verse')
          verse2 = result.group('verse2')
        if len(book_names) == 0 and result is None:
          args.append(Q(verseText__icontains=term))
        elif len(book_names) > 0:
          for book_name in book_names:
            if book_name not in books:
              books.append(book_name)

  if book is not None:
    args.append(Q(book__iexact=book))
  if chapter is not None:
    args.append(Q(chapter__iexact=chapter))
  if verse is not None and (verse2 is None or verse2 < verse):
    args.append(Q(verse__iexact=verse))
  elif verse2 is not None:
    args.append(Q(verse__in=range(int(verse),int(verse2)+1)))

  if chapter is not None and len(args) > 0 and len(books) > 0:
    verses = Verse.objects.filter(version__iexact=v).filter(Q(book__in=books)).filter(*args)

if len(errors) == 0 and len(kargs) > 0:
  keyverses = Verse.objects.filter(version__iexact=v).filter(*kargs)
{% endhighlight %}

So let's break it down:

{% highlight python %}
common_words = ['an','and','as','is','it','of','or','the']
terms = q.split()
new_terms, common_words_used, args, kargs, books = [], [], [], [], []
verses = None
{% endhighlight %}
Here we're just defining the variables and splitting up q, which was the search criteria in the <code>GET</code> request.

{% highlight python %}
for term in terms:
  if term in common_words:
    common_words_used.append(term)
  else:
    new_terms.append(term)
if len(common_words_used) > 0:
  notice = "The following words are too common and were not included in the search: "
  for word in common_words_used:
    notice += "'" + word + "' "
  notices.append(notice)
{% endhighlight %}
Next, we pull out the common words and add a notice for the user.

{% highlight python %}
if len(new_terms) == 0:
  errors.append("Enter a search term.")
elif len(new_terms) == 1 and not new_terms[0].isnumeric() and len(new_terms[0]) > 2:
  books = Verse().get_book_names_from_abbr(v, new_terms[0])
  kargs.append(Q(verseText__icontains=new_terms[0]))
else:
  book, chapter, verse, verse2 = None, None, None, None
{% endhighlight %}
First we make sure that they provided a search term after removing common words.
Last check before the real parsing, we see if the length is one and it's not a number and it's length is 3 or more, we find any books that it may be, and we assign the term as a something we're going to search for in the keyword search. The <code>else</code> is where the real meat begins.

{% highlight python %}
  for i,term in enumerate(new_terms):
    if not term.isnumeric() and len(term) < 3:
      if term not in common_words_used:
        common_words_used.append(term)
        notices.append("The word '" + term + "' is too short and was not included in the search.")
{% endhighlight %}
In the <code>for</code> loop, we check if any word is not numeric and it's length is shorter than 3. I throw out any searches for these super short words, or partial words. I also add these to <code>common_words_used</code>, for checking against.

{% highlight python %}
    else:
      kargs.append(Q(verseText__icontains=term))
      if term.isnumeric():
        i_prev = i - 1
        i_next = i + 1
        if i_prev >= 0:
          prev_term = new_terms[i_prev]
          book_names = Verse().get_book_names_from_abbr(v, prev_term)
          if len(book_names) > 0:
            chapter = new_terms[i]

        if book is None:
          try:
            next_term = new_terms[i_next]
            book_names = Verse().get_book_names_from_abbr(v, new_terms[i] + " " + next_term)
            if len(book_names) > 0:
              book = book_names[0]
          except:
            pass
{% endhighlight %}
In this chunk, I first assign the term as a keyword, for the keyword search.

Next, I determine if it's a number. This means that the character could be a chapter or a leading number on a Bible book. In that case, we need to look at the previous and next term. I find the previous and next number in the index, and then find the previous terms. As Python's <code>list</code> wraps index lookup (<code>list[-1]</code> is valid and returns the last item in the list), I make sure the previous index number is greater or equal to 0 first. Once I find the previous term, I look up all book names from that term. If there are any, I assign the current term as the chapter number.

If I haven't found a book yet, then I check on the next term. I find book names based on the next term, but I also include the current term, which would be a leading number on a book. If there are any books (which should only ever return 1 or 0), then I assign it to book.

For the next term I have to wrap in <code>try</code> and <code>except</code> statements for when the index is out of bounds. Similarly, I could get the length of new_terms and compare that to make sure I'm within bounds too.

{% highlight python %}
      else:
        book_names = Verse().get_book_names_from_abbr(v, term)
        result = re.match(r'^(?P<chapter>\d+)(:)?(?P<verse>\d+)?(\-)?(?P<verse2>\d+)?$', term)
        if result is not None:
          chapter = result.group('chapter')
          verse = result.group('verse')
          verse2 = result.group('verse2')
        if len(book_names) == 0 and result is None:
          args.append(Q(verseText__icontains=term))
        elif len(book_names) > 0:
          for book_name in book_names:
            if book_name not in books:
              books.append(book_name)
{% endhighlight %}
If the term was not numeric, then it was a keyword, common word, Bible book, or a chapter:verse(-verse range) combo. I already removed the common/short words, so it will either be a Bible book, a keyword, or a chapter+.

First, we get all the books based on the term. Second, we run a regular expression on the term, in the expected chapter:verse-verse2 format, where only chapter is required. If there's a result from the regular expression, then we assign the appropriate variables (chapter, verse, and verse2, if it's a range search).

If there were no results from the regex, and the length of the books is 0, then it must be a keyword. Finally if there are any books, we add them to our book array.

{% highlight python %}
  if book is not None:
    args.append(Q(book__iexact=book))
  if chapter is not None:
    args.append(Q(chapter__iexact=chapter))
  if verse is not None and (verse2 is None or verse2 < verse):
    args.append(Q(verse__iexact=verse))
  elif verse2 is not None:
    args.append(Q(verse__in=range(int(verse),int(verse2)+1)))

  if chapter is not None and len(args) > 0 and len(books) > 0:
    verses = Verse.objects.filter(version__iexact=v).filter(Q(book__in=books)).filter(*args)

if len(errors) == 0 and len(kargs) > 0:
  keyverses = Verse.objects.filter(version__iexact=v).filter(*kargs)
{% endhighlight %}
For the last piece of the puzzle, we finalize building the criteria arguments and then do the actual lookups.

First we assign the given book. Next we assign the chapter. Last, we assign verse if there is no verse 2 or verse 2 is before verse 1. If that's not the case, then we assign a range search.

For the passage search, we never do a passage search if there's only one term given. So if you search for "John", then you'll only get keyword searches, but you will get the books with John in the title listed (John, 1 John, 2 John, 3 John). If you did a search for "1 John", we won't do a passage search without a chapter. We need to have several arguments, so <code>args</code> must be greater than 1, and we should have an array of all the books we want to look in, so that must be greater than 1 as well. We include this even if we have an exact book, which will override the IN statement.

For the keyword search, we first check that we don't have any errors and that there's at least one keyword argument. If so, then we find all the keyword passages based on these.

And that's pretty much it. Overall, it ended up being quite a bit of work to figure out the exact intracies of how a Bible search may work, but it ended up being worth it. I can guarantee there are some crazy searches that won't work with my parsing, but it solves 95% of my use-cases. With search finished, the API is almost finished now.
