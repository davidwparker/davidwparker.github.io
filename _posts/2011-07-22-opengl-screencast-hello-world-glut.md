---
layout: post
title: OpenGL Screencast 1 - Hello World (Glut)
categories: [posts, code, hascode]
---
I've spent a good bit of time recently doing quite a bit of C and OpenGL and I figured this would be a good time to post some OpenGL screencasts. This first screencast is an introduction to OpenGL 2.1 and GLUT.

The code is available to download on [Github](https://github.com/davidwparker/opengl-screencasts-1)

[Download the screencast, 51.7 MB .mov](https://dl.dropboxusercontent.com/s/q96n5eyd9cvlrpb/episode-001.mov?dl=1)

## Watch the Screencast

[YouTube](http://www.youtube.com/watch?v=QO4NTBWJQLg)

<iframe width="425" height="349" src="http://www.youtube.com/embed/QO4NTBWJQLg?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>

## Resources

* [OpenGL](http://www.opengl.org/) main site
* [OpenGL Documentation](http://www.opengl.org/documentation/)
* [OpenGL wiki](http://www.opengl.org/wiki/Main_Page)
* [OpenGL Programming Guide](http://www.opengl-redbook.com/) (Red Book)

### Great tutorials

* [Swiftless](http://www.swiftless.com/) Gaming Tutorials
* [Lighthouse 3d](http://www.lighthouse3d.com/) OpenGL Tutorials
* [Nehe](http://nehe.gamedev.net/) Various OpenGL Tutorials

### Other libraries (than GLUT)

* [SDL](http://www.libsdl.org/)
* [QT](http://qt.nokia.com/)
* [SFML](http://www.sfml-dev.org/)

## Code

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>

/*  OpenGL with prototypes for glext */
#define GL_GLEXT_PROTOTYPES
#ifdef __APPLE__
#include <GLUT/glut.h>
#else
#include <GL/glut.h>
#endif

/*  Globals */
double dim=2; /* dimension of orthogonal box */
char *windowName = "Hello OpenGL";

/*
 *  Display the scene
 */
void display()
{
  glClear(GL_COLOR_BUFFER_BIT);
  glLoadIdentity();

  /* draw something */
  glBegin(GL_POLYGON);
  glColor3f(1.0,0.0,0.0);
  glVertex2f(0.0,0.5);
  glColor3f(0.0,1.0,0.0);
  glVertex2f(0.5,-0.5);
  glColor3f(0.0,0.0,1.0);
  glVertex2f(-0.5,-0.5);
  glEnd();

  glFlush();
  glutSwapBuffers();
}

/*
 *  GLUT calls this routine when the window is resized
 */
void reshape(int width,int height)
{
  double w2h = (height>0) ? (double)width/height:1;
  glViewport(0,0,width,height);
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  glOrtho(-dim*w2h,+dim*w2h,-dim,+dim,-dim,+dim);
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
