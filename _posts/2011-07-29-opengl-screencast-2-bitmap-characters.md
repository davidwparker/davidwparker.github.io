---
layout: post
title: OpenGL Screencast 2 - Bitmap Characters
categories: [posts, code, hascode]
---
Bitmap Characters are great because they allow us to display text information. We'll be using these convenience methods in future episodes moving forward so that we have easy access to specific data.

The code is available to download on [Github](https://github.com/davidwparker/opengl-screencasts-1)

[Download the screencast, 49.3 MB .mov](https://dl.dropboxusercontent.com/s/uh9rez74f3wp2su/episode-002.mov?dl=1)

## Watch the Screencast

[YouTube](http://www.youtube.com/watch?v=sSRxY7UC54Q)

<iframe width="425" height="349" src="http://www.youtube.com/embed/sSRxY7UC54Q?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>

## Code

file: screencasts.h

{% highlight c %}
#ifndef SCREENCASTS
#define SCREENCASTS

/* standard headers */
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <string.h>
#include <math.h>
#include <time.h>

/* OpenGL and friends */
#ifdef USEGLEW
#include <GL/glew.h>
#endif
#define GL_GLEXT_PROTOTYPES
#ifdef __APPLE__
#include <GLUT/glut.h>
#else
#include <GL/glut.h>
#endif

#include "prototypes.h"

#endif

{% endhighlight %}

file: prototypes.h

{% highlight c %}
/*  Printing convenience (print.c) */
void printv(va_list args, const char* format);
void print(const char* format, ...);
void printAt(int x, int y, const char* format, ...);

{% endhighlight %}

file: print.c

{% highlight c %}
#include "screencasts.h"

#define LEN 8192
void printv(va_list args, const char* format)
{
  char buf[LEN];
  char* ch=buf;
  vsnprintf(buf,LEN,format,args);
  while (*ch)
    glutBitmapCharacter(GLUT_BITMAP_HELVETICA_10,*ch++);
}

void print(const char* format, ...)
{
  va_list args;
  va_start(args,format);
  printv(args,format);
  va_end(args);
}

void printAt(int x, int y, const char* format, ...)
{
  va_list args;
  glWindowPos2i(x,y);
  va_start(args,format);
  printv(args,format);
  va_end(args);
}

{% endhighlight %}

file: 002.c

{% highlight c %}
#include "screencasts.h"

/*  Globals */
double dim=2; /* dimension of orthogonal box */
char *windowName = "Bitmap chars";

/*
 *  Display the scene
 */
void display()
{
  /*  Clear the image */
  glClear(GL_COLOR_BUFFER_BIT);
  /*  Reset previous transforms */
  glLoadIdentity();

  /*  Draw something here */
  glBegin(GL_POLYGON);
  glColor3f(1.0,0.0,0.0);
  glVertex2f( 0.0, 0.5);
  glColor3f(0.0,1.0,0.0);
  glVertex2f( 0.5,-0.5);
  glColor3f(0.0,0.0,1.0);
  glVertex2f(-0.5,-0.5);
  glEnd();

  /*  Bitmap chars */
  glColor3f(1,1,1);
  printAt(5,5,"hello bitmap characters");
  glWindowPos2i(100,20);
  print("and again");

  /*  Flush and swap */
  glFlush();
  glutSwapBuffers();
}

/*
 *  GLUT calls this routine when the window is resized
 */
void reshape(int width,int height)
{
  double w2h = (height>0) ? (double)width/height : 1;
  glViewport(0,0, width,height);
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  glOrtho(-dim*w2h,+dim*w2h, -dim,+dim, -dim,+dim);
  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();
}

/*
 *  Start up GLUT and tell it what to do
 */
int main(int argc,char* argv[])
{
  glutInit(&argc,argv);
  glutInitDisplayMode(GLUT_RGB | GLUT_DOUBLE);
  glutInitWindowSize(500,500);
  glutCreateWindow(windowName);
  glutDisplayFunc(display);
  glutReshapeFunc(reshape);
  glutMainLoop();
  return 0;
}
{% endhighlight %}
