boolean DEBUG = true;
// NOTE: this would have been a lot easier had I done this like I would have OpenGL;
// that is, using push/pop matrix and not define things based on UpperLeft as it is now...
/**
 * Global Variables
 */
final int width = 900, height = 690;
int currentObj = -1, currentIngred = 0;
ArrayList currentIngreds, currentIngredsMap;
ArrayList ingreds, ingredStrings;
ArrayList pimageB, pimageR, pimageD, pimageX;
ImageButton ex, arrow, stoveArrow1, stoveArrow2, stoveArrow3;
ImageButton moldArrow1, moldArrow2, moldArrow3, moldArrow4, moldArrow5, moldArrow6;
Stove stove1, stove2, stove3;
SwitchButton stoveSwitch1, stoveSwitch2, stoveSwitch3;
Mold mold1, mold2, mold3, mold4, mold5, mold6;

// Game stats
int gLevel = 0, gScore = 0, gHappy = 0;

// Time
int lastTime = 0;

// Area/Position/Size calculations
final int grid = 30, buffer = 0.5*grid, corner = 15;
final int aScoreStartX = 20*grid, aScoreStartY = grid, aScoreW = 9*grid, aScoreH = 6*grid;
final int aPrepStartX = grid, aPrepStartY = 10.5*grid, aPrepW = 8*grid, aPrepH = 8.5*grid;
final int aStoveStartX = 9*grid+1, aStoveStartY = 10.5*grid, aStoveW = 11*grid, aStoveH = 8.5*grid;
final int aMoldStartX = 20*grid, aMoldStartY = 8*grid, aMoldW = 9*grid, aMoldH = 11*grid;
final int aMsgStartX = grid, aMsgStartY = 20*grid, aMsgW = 28*grid, aMsgH = 2*grid;
final int exX = aPrepStartX+aPrepW-1.5*grid, exY = aPrepStartY+grid;
final int arrowX = aPrepStartX+aPrepW-1.5*grid, arrowY = aPrepStartY+aPrepH-2*grid;
final int stove1X = 11*grid, stove1Y = 13.5*grid; 
final int stove2X = 14.5*grid, stove2Y = 17.25*grid;
final int stove3X = 18*grid, stove3Y = 13.5*grid;
final int stoveSize = 100;
final int stoveS1X = 12.75*grid, stoveS1Y = 11.5*grid;
final int stoveS2X = 11*grid, stoveS2Y = 17.75*grid;
final int stoveS3X = 14.75*grid, stoveS3Y = 11.5*grid;
final int stoveArrow1X = stoveS1X+10, stoveArrow1Y = stoveS1Y+2.8*grid;
final int stoveArrow2X = stoveS2X+7*grid, stoveArrow2Y = stoveS2Y+10;
final int stoveArrow3X = stoveS3X+10, stoveArrow3Y = stoveS3Y+2.8*grid;
final int mold1X = aMoldStartX+1.5*grid, mold1Y = aMoldStartY+2*grid;
final int mold2X = mold1X+3*grid, mold2Y = aMoldStartY+2*grid;
final int mold3X = mold2X+3*grid, mold3Y = aMoldStartY+2*grid;
final int mold4X = aMoldStartX+1.5*grid, mold4Y = mold1Y+4*grid;
final int mold5X = mold4X+3*grid, mold5Y = mold1Y+4*grid;
final int mold6X = mold5X+3*grid, mold6Y = mold1Y+4*grid;
final int moldArrow1X = mold1X, moldArrow1Y = mold1Y+1.75*grid;
final int moldArrow2X = mold2X, moldArrow2Y = mold2Y+1.75*grid;
final int moldArrow3X = mold3X, moldArrow3Y = mold3Y+1.75*grid;
final int moldArrow4X = mold4X, moldArrow4Y = mold4Y+1.75*grid;
final int moldArrow5X = mold5X, moldArrow5Y = mold5Y+1.75*grid;
final int moldArrow6X = mold6X, moldArrow6Y = mold6Y+1.75*grid;
final int moldSize = 60;

final int textsize = 16;
final float DEBUG_LINE = 19.5*grid;

// IDs
final int ID_ING_CHOC_MIN = 0;
final int ID_ING_CHOC_MAX = 5;
final int ID_ING_0   = 0;
final int ID_ING_1   = 1;
final int ID_ING_2   = 2;
final int ID_ING_3   = 3;
final int ID_ING_4   = 4;
final int ID_ING_5   = 5;
final int ID_ING_6   = 6;
final int ID_ING_7   = 7;
final int ID_ING_8   = 8;
final int ID_ING_9   = 9;
final int ID_ING_10  = 10;
final int ID_ING_11  = 11;
final int ID_ING_12  = 12;
final int ID_ING_13  = 13;
final int ID_ING_14  = 14;
final int ID_ING_15  = 15;
final int ID_ING_16  = 16;
final int ID_ING_17  = 17;
final int ID_EX      = 18;
final int ID_ARROW   = 19;
final int ID_ING_X_1 = 20;
final int ID_ING_X_2 = 21;
final int ID_ING_X_3 = 22;
final int ID_ING_X_4 = 23;
final int ID_ING_X_5 = 24;
final int ID_ING_X_6 = 25;
final int ID_STOVE_1 = 30;
final int ID_STOVE_2 = 31;
final int ID_STOVE_3 = 32;
final int ID_STOVE_SWITCH_1 = 33;
final int ID_STOVE_SWITCH_2 = 34;
final int ID_STOVE_SWITCH_3 = 35;
final int ID_STOVE_ARROW_1 = 36;
final int ID_STOVE_ARROW_2 = 37;
final int ID_STOVE_ARROW_3 = 38;
final int ID_MOLD_1 = 40;
final int ID_MOLD_2 = 41;
final int ID_MOLD_3 = 42;
final int ID_MOLD_4 = 43;
final int ID_MOLD_5 = 44;
final int ID_MOLD_6 = 45;
final int ID_MOLD_ARROW_1 = 50;
final int ID_MOLD_ARROW_2 = 51;
final int ID_MOLD_ARROW_3 = 52;
final int ID_MOLD_ARROW_4 = 53;
final int ID_MOLD_ARROW_5 = 54;
final int ID_MOLD_ARROW_6 = 55;

// Display Strings
final String disScore = "Score";
final String disEvolution = "Evolutionary Chocolatier Level";
final String disHappiness = "Patron Happiness";
final String disPrep = "Prep - Select Ingredients";
final String disStoves = "Stoves - Temper Chocolate";
final String disTemp = "Temp";
final String disMold = "Mold - Select Shape";
final String disCool = "Cool";
final String disCooling = "Cooling";
final String arrowBtn = "Arrow Button";
final String exBtn = "Ex Button";
final String stoveArrowBtn1 = "Stove Arrow Button 1";
final String stoveArrowBtn2 = "Stove Arrow Button 2";
final String stoveArrowBtn3 = "Stove Arrow Button 3";
final String moldArrowBtn1 = "Mold Arrow Button 1";
final String moldArrowBtn2 = "Mold Arrow Button 2";
final String moldArrowBtn3 = "Mold Arrow Button 3";
final String moldArrowBtn4 = "Mold Arrow Button 4";
final String moldArrowBtn5 = "Mold Arrow Button 5";
final String moldArrowBtn6 = "Mold Arrow Button 6";

// Message Strings
String msgString = "";
final String msgNoStoves = "No stoves are available!";
final String msgNoChocolate = "You must add at least one chocolate!";
final String msgOneChocolate = "You can only add one chocolate!";
final String msgNoMolds = "No molds are available!";

// Colors
final color cBackground = #9ee2ff, cBorder = #707070, cLightBorder = #d0d0d0;
final color cBlack = #000000, cDarkGray = #5a5a5a, cGray = #858585, cLightGray = #bababa, cWhite = #ffffff;

// Givens
// mouseX mouseY

/**
 * Preload all image assets
 */
/* 
@pjs preload="data/base1.gif, data/roll1.gif, data/down1.gif, data/ex1.gif,
data/base2.gif, data/roll2.gif, data/down2.gif, data/ex2.gif,
data/base3.gif, data/roll3.gif, data/down3.gif, data/ex3.gif,
data/base4.gif, data/roll4.gif, data/down4.gif, data/ex4.gif,
data/base5.gif, data/roll5.gif, data/down5.gif, data/ex5.gif,
data/base6.gif, data/roll6.gif, data/down6.gif, data/ex6.gif,
data/base7.gif, data/roll7.gif, data/down7.gif, data/ex7.gif,
data/base8.gif, data/roll8.gif, data/down8.gif, data/ex8.gif,
data/base9.gif, data/roll9.gif, data/down9.gif, data/ex9.gif,
data/base10.gif, data/roll10.gif, data/down10.gif, data/ex10.gif,
data/base11.gif, data/roll11.gif, data/down11.gif, data/ex11.gif,
data/base12.gif, data/roll12.gif, data/down12.gif, data/ex12.gif,
data/base13.gif, data/roll13.gif, data/down13.gif, data/ex13.gif,
data/base14.gif, data/roll14.gif, data/down14.gif, data/ex14.gif,
data/base15.gif, data/roll15.gif, data/down15.gif, data/ex15.gif,
data/base16.gif, data/roll16.gif, data/down16.gif, data/ex16.gif,
data/base17.gif, data/roll17.gif, data/down17.gif, data/ex17.gif,
data/base18.gif, data/roll18.gif, data/down18.gif, data/ex18.gif,
data/ex_base.gif, data/ex_roll.gif, data/ex_down.gif, data/ex1.gif,
data/arrow_base.gif, data/arrow_roll.gif, data/arrow_down.gif,
data/switchOn.gif, data/switchOff.gif";
*/

/**
 * Setup the processing canvas
 */
void setup() {
    // Drawing area
    size(width, height);

    // Define and create image button arrays for ingredients
    currentIngreds = new ArrayList();
    currentIngredsMap = new ArrayList();
    ingreds = new ArrayList();
    ingredStrings = new ArrayList();
    pimageB = new ArrayList();
    pimageR = new ArrayList();
    pimageD = new ArrayList();
    pimageX = new ArrayList();

    // ingredient string names:
    // 1-6:   milk, prem. milk, dark, prem. dark, white, prem. white,
    // 7-12:  almonds, caramel, cherry, coconut, cream, fudge,
    // 13-18: marshmallow, mint, orange, peanut butter, peanuts, raspberry
    ingredStrings.add("Milk");
    ingredStrings.add("Prem. Milk");
    ingredStrings.add("Dark");
    ingredStrings.add("Prem. Dark");
    ingredStrings.add("White");
    ingredStrings.add("Prem. White");
    ingredStrings.add("Almonds");
    ingredStrings.add("Caramel");
    ingredStrings.add("Cherry");
    ingredStrings.add("Coconut");
    ingredStrings.add("Cream");
    ingredStrings.add("Fudge");
    ingredStrings.add("Marshmallow");
    ingredStrings.add("Mint");
    ingredStrings.add("Orange");
    ingredStrings.add("Peanut Butter");
    ingredStrings.add("Peanuts");
    ingredStrings.add("Raspberry");

    // base
    pimageB.add(loadImage("data/base1.gif"))
    pimageB.add(loadImage("data/base2.gif"));
    pimageB.add(loadImage("data/base3.gif"));
    pimageB.add(loadImage("data/base4.gif"));
    pimageB.add(loadImage("data/base5.gif"));
    pimageB.add(loadImage("data/base6.gif"));
    pimageB.add(loadImage("data/base7.gif"));
    pimageB.add(loadImage("data/base8.gif"));
    pimageB.add(loadImage("data/base9.gif"));
    pimageB.add(loadImage("data/base10.gif"));
    pimageB.add(loadImage("data/base11.gif"));
    pimageB.add(loadImage("data/base12.gif"));
    pimageB.add(loadImage("data/base13.gif"));
    pimageB.add(loadImage("data/base14.gif"));
    pimageB.add(loadImage("data/base15.gif"));
    pimageB.add(loadImage("data/base16.gif"));
    pimageB.add(loadImage("data/base17.gif"));
    pimageB.add(loadImage("data/base18.gif"));

    // rollovers
    pimageR.add(loadImage("data/roll1.gif"));
    pimageR.add(loadImage("data/roll2.gif"));
    pimageR.add(loadImage("data/roll3.gif"));
    pimageR.add(loadImage("data/roll4.gif"));
    pimageR.add(loadImage("data/roll5.gif"));
    pimageR.add(loadImage("data/roll6.gif"));
    pimageR.add(loadImage("data/roll7.gif"));
    pimageR.add(loadImage("data/roll8.gif"));
    pimageR.add(loadImage("data/roll9.gif"));
    pimageR.add(loadImage("data/roll10.gif"));
    pimageR.add(loadImage("data/roll11.gif"));
    pimageR.add(loadImage("data/roll12.gif"));
    pimageR.add(loadImage("data/roll13.gif"));
    pimageR.add(loadImage("data/roll14.gif"));
    pimageR.add(loadImage("data/roll15.gif"));
    pimageR.add(loadImage("data/roll16.gif"));
    pimageR.add(loadImage("data/roll17.gif"));
    pimageR.add(loadImage("data/roll18.gif"));

    // down
    pimageD.add(loadImage("data/down1.gif"));
    pimageD.add(loadImage("data/down2.gif"));
    pimageD.add(loadImage("data/down3.gif"));
    pimageD.add(loadImage("data/down4.gif"));
    pimageD.add(loadImage("data/down5.gif"));
    pimageD.add(loadImage("data/down6.gif"));
    pimageD.add(loadImage("data/down7.gif"));
    pimageD.add(loadImage("data/down8.gif"));
    pimageD.add(loadImage("data/down9.gif"));
    pimageD.add(loadImage("data/down10.gif"));
    pimageD.add(loadImage("data/down11.gif"));
    pimageD.add(loadImage("data/down12.gif"));
    pimageD.add(loadImage("data/down13.gif"));
    pimageD.add(loadImage("data/down14.gif"));
    pimageD.add(loadImage("data/down15.gif"));
    pimageD.add(loadImage("data/down16.gif"));
    pimageD.add(loadImage("data/down17.gif"));
    pimageD.add(loadImage("data/down18.gif"));

    // ex
    pimageX.add(loadImage("data/ex1.gif"));
    pimageX.add(loadImage("data/ex2.gif"));
    pimageX.add(loadImage("data/ex3.gif"));
    pimageX.add(loadImage("data/ex4.gif"));
    pimageX.add(loadImage("data/ex5.gif"));
    pimageX.add(loadImage("data/ex6.gif"));
    pimageX.add(loadImage("data/ex7.gif"));
    pimageX.add(loadImage("data/ex8.gif"));
    pimageX.add(loadImage("data/ex9.gif"));
    pimageX.add(loadImage("data/ex10.gif"));
    pimageX.add(loadImage("data/ex11.gif"));
    pimageX.add(loadImage("data/ex12.gif"));
    pimageX.add(loadImage("data/ex13.gif"));
    pimageX.add(loadImage("data/ex14.gif"));
    pimageX.add(loadImage("data/ex15.gif"));
    pimageX.add(loadImage("data/ex16.gif"));
    pimageX.add(loadImage("data/ex17.gif"));
    pimageX.add(loadImage("data/ex18.gif"));

    // ingredients -> horizontals, verticals
    currentIngred = ID_ING_X_1;
    int k = 0; // 18 total ingredients
    for (int i = 0; i < 3; i++) {
	for (int j = 0; j < 6; j++) {
	    String n = (String) ingredStrings.get(k);
	    PImage imgB = (PImage) pimageB.get(k);
	    PImage imgR = (PImage) pimageR.get(k);
	    PImage imgD = (PImage) pimageD.get(k);
	    int x = grid+j*3*grid;
	    int y = grid+i*3*grid;
	    int w = imgB.width;
	    int h = imgB.height;
	    ImageButton ingr = new ImageButton(n, k, x, y, w, h, imgB, imgR, imgD);
	    ingreds.add(ingr);
	    k++;
	}
    }

    // Other Images
    // Prep X button
    PImage imgB = loadImage("data/ex_base.gif");
    PImage imgR = loadImage("data/ex_roll.gif");
    PImage imgD = loadImage("data/ex_down.gif");
    ex = new ImageButton(exBtn, ID_EX, exX, exY, imgB.width, imgB.height, imgB, imgR, imgD);
    // Prep Arrow button
    imgB = loadImage("data/arrow_base.gif");
    imgR = loadImage("data/arrow_roll.gif");
    imgD = loadImage("data/arrow_down.gif");
    arrow = new ImageButton(arrowBtn, ID_ARROW, arrowX, arrowY, imgB.width, imgB.height, imgB, imgR, imgD);
    // Stove Arrow buttons
    int w = imgB.width*0.5;
    int h = imgB.height*0.5;
    stoveArrow1 = new ImageButton(stoveArrowBtn1, ID_STOVE_ARROW_1, stoveArrow1X, stoveArrow1Y, w, h, imgB, imgR, imgD);
    stoveArrow2 = new ImageButton(stoveArrowBtn2, ID_STOVE_ARROW_2, stoveArrow2X, stoveArrow2Y, w, h, imgB, imgR, imgD);
    stoveArrow3 = new ImageButton(stoveArrowBtn3, ID_STOVE_ARROW_3, stoveArrow3X, stoveArrow3Y, w, h, imgB, imgR, imgD);
    // Mold Arrows Buttons
    moldArrow1 = new ImageButton(moldArrowBtn1, ID_MOLD_ARROW_1, moldArrow1X, moldArrow1Y, w, h, imgB, imgR, imgD);
    moldArrow2 = new ImageButton(moldArrowBtn2, ID_MOLD_ARROW_2, moldArrow2X, moldArrow2Y, w, h, imgB, imgR, imgD);
    moldArrow3 = new ImageButton(moldArrowBtn3, ID_MOLD_ARROW_3, moldArrow3X, moldArrow3Y, w, h, imgB, imgR, imgD);
    moldArrow4 = new ImageButton(moldArrowBtn4, ID_MOLD_ARROW_4, moldArrow4X, moldArrow4Y, w, h, imgB, imgR, imgD);
    moldArrow5 = new ImageButton(moldArrowBtn5, ID_MOLD_ARROW_5, moldArrow5X, moldArrow5Y, w, h, imgB, imgR, imgD);
    moldArrow6 = new ImageButton(moldArrowBtn6, ID_MOLD_ARROW_6, moldArrow6X, moldArrow6Y, w, h, imgB, imgR, imgD);
    // Stove Switch Buttons
    imgB = loadImage("data/switchOn.gif");
    imgD = loadImage("data/switchOff.gif");
    stoveSwitch1 = new SwitchButton(ID_STOVE_SWITCH_1, stoveS1X, stoveS1Y, imgB.width, imgB.height, imgB, imgD);
    stoveSwitch2 = new SwitchButton(ID_STOVE_SWITCH_2, stoveS2X, stoveS2Y, imgB.width, imgB.height, imgB, imgD);
    stoveSwitch3 = new SwitchButton(ID_STOVE_SWITCH_3, stoveS3X, stoveS3Y, imgB.width, imgB.height, imgB, imgD);
    
    // Other objects
    stove1 = new Stove(ID_STOVE_1, stove1X, stove1Y, stoveSize);
    stove2 = new Stove(ID_STOVE_2, stove2X, stove2Y, stoveSize);
    stove3 = new Stove(ID_STOVE_3, stove3X, stove3Y, stoveSize);
    mold1 = new Mold(ID_MOLD_1, mold1X, mold1Y, moldSize);
    mold2 = new Mold(ID_MOLD_2, mold2X, mold2Y, moldSize);
    mold3 = new Mold(ID_MOLD_3, mold3X, mold3Y, moldSize);
    mold4 = new Mold(ID_MOLD_4, mold4X, mold4Y, moldSize);
    mold5 = new Mold(ID_MOLD_5, mold5X, mold5Y, moldSize);
    mold6 = new Mold(ID_MOLD_6, mold6X, mold6Y, moldSize);

    // Final setup
    smooth();
    noStroke();
    textSize(textsize);
}

/**
 * Main draw loop
 */
void draw() {
    // Areas 
    drawBorder();
    drawScoreArea();
    drawPrepArea();
    drawStoveArea();
    drawMoldArea();
    drawMsgArea();
    
    // Objects
    drawIngredients();
    drawCurrentIngredients();
    drawPrepObjects();
    drawStoveObjects();
    drawMoldObjects();

    // User messages
    drawMsgString();

    // debug
    drawDebug();
}

void drawBorder() {
    fill(cBackground);
    stroke(cBorder);
    rect(0,0,width-1,height-1);
    noStroke();
    noFill();
}

void drawScoreArea() {
    fill(cWhite);
    rect(aScoreStartX,aScoreStartY,aScoreW,aScoreH,corner);
    stroke(cLightBorder);
    line(aScoreStartX,aScoreStartY+2*grid,aScoreStartX+aScoreW,aScoreStartY+2*grid);
    line(aScoreStartX,aScoreStartY+4*grid,aScoreStartX+aScoreW,aScoreStartY+4*grid);
    noStroke();
    int currH = aScoreStartY + grid;
    write(disEvolution, aScoreStartX+buffer, currH);
    currH += 0.9*grid;
    write(gLevel, aScoreStartX+2*grid, currH);
    currH += 0.9*grid;
    write(disScore, aScoreStartX+buffer, currH);
    currH += 0.9*grid;
    write(gScore, aScoreStartX+2*grid, currH);
    currH += 0.9*grid;
    write(disHappiness, aScoreStartX+buffer, currH);
    currH += 0.9*grid;
    write(gHappy, aScoreStartX+2*grid, currH);
}

void drawPrepArea() {
    fill(cWhite);
    rect(aPrepStartX,aPrepStartY,aPrepW,aPrepH,corner,0,0,corner);
    stroke(cLightBorder);
    line(aPrepStartX,aPrepStartY+buffer+5,aPrepStartX+aStoveW,aPrepStartY+buffer+5);
    stroke(cBorder);
    line(aPrepStartX+aPrepW,aPrepStartY,aPrepStartX+aPrepW,aPrepStartY+aPrepH);
    noStroke();
    write(disPrep, aPrepStartX+buffer, aPrepStartY+buffer);
}

void drawPrepObjects() {
    ex.update();
    ex.display();
    arrow.update();
    arrow.display();
}

void drawStoveArea() {
    fill(cWhite);
    rect(aStoveStartX,aStoveStartY,aStoveW,aStoveH);
    stroke(cLightBorder);
    line(aStoveStartX,aStoveStartY+buffer+5,aStoveStartX+aStoveW,aStoveStartY+buffer+5);
    line(aStoveStartX,aStoveStartY+aStoveH,(aStoveStartX+(aStoveW*0.5)),(aStoveStartY+(aStoveH*0.5)));
    line((aStoveStartX+(aStoveW*0.5)),(aStoveStartY+(aStoveH*0.5)),aStoveStartX+aStoveW,aStoveStartY+aStoveH);
    line((aStoveStartX+(aStoveW*0.5)),(aStoveStartY+(aStoveH*0.5)),(aStoveStartX+(aStoveW*0.5)),aStoveStartY+buffer+5);
    stroke(cBorder);
    line(aStoveStartX+aStoveW-2,aStoveStartY,aStoveStartX+aStoveW-2,aStoveStartY+aStoveH);
    noStroke();
    write(disStoves, aStoveStartX+buffer, aStoveStartY+buffer);
    write(disTemp,stoveSwitch1.x+5,stoveSwitch1.y+1.8*grid);
    write(stove1._temp,stoveSwitch1.x+buffer,stoveSwitch1.y+2.5*grid);
    write(disTemp,stoveSwitch2.x+5.5*grid,stoveSwitch2.y+5);
    write(stove2._temp,stoveSwitch2.x+6*grid,stoveSwitch2.y+0.7*grid+5);
    write(disTemp,stoveSwitch3.x+5,stoveSwitch3.y+1.8*grid);
    write(stove3._temp,stoveSwitch3.x+buffer,stoveSwitch3.y+2.5*grid);
}

void drawStoveObjects() {
    stove1.update();
    stove1.display();
    stove2.update();
    stove2.display();
    stove3.update();
    stove3.display();
    stoveSwitch1.update();
    stoveSwitch1.display();
    stoveSwitch2.update();
    stoveSwitch2.display();
    stoveSwitch3.update();
    stoveSwitch3.display();
    stoveArrow1.update();
    stoveArrow1.display();
    stoveArrow2.update();
    stoveArrow2.display();
    stoveArrow3.update();
    stoveArrow3.display();
}

void drawMoldArea() {
    fill(cWhite);
    rect(aMoldStartX,aMoldStartY,aMoldW,aMoldH,corner,corner,corner,0);
    stroke(cLightBorder);
    line(aMoldStartX,aMoldStartY+buffer+5,aMoldStartX+aMoldW,aMoldStartY+buffer+5);
    noStroke();
    write(disMold, aMoldStartX+buffer, aMoldStartY+buffer);
    
    mold1.printCool();
    mold2.printCool();
    mold3.printCool();
    mold4.printCool();
    mold5.printCool();
    mold6.printCool();
}

void drawMoldObjects() {
    mold1.update();
    mold1.display();
    mold2.update();
    mold2.display();
    mold3.update();
    mold3.display();
    mold4.update();
    mold4.display();
    mold5.update();
    mold5.display();
    mold6.update();
    mold6.display();
    moldArrow1.update();
    moldArrow1.display();
    moldArrow2.update();
    moldArrow2.display();
    moldArrow3.update();
    moldArrow3.display();
    moldArrow4.update();
    moldArrow4.display();
    moldArrow5.update();
    moldArrow5.display();
    moldArrow6.update();
    moldArrow6.display();
}

void drawMsgArea() {
    fill(cWhite);
    rect(aMsgStartX,aMsgStartY,aMsgW,aMsgH,corner);
    noFill();
}

void drawMsgString() {
    final int currentTime = millis();
    final int waitTime = 2000;
    if (currentTime < lastTime+waitTime) {
	write(msgString, aMsgStartX+grid, aMsgStartY+grid);
    } else if (currentTime >= lastTime+waitTime && currentTime < lastTime+waitTime+300) {
	writeC(cDarkGray, msgString, aMsgStartX+grid, aMsgStartY+grid);
    } else if (currentTime >= lastTime+waitTime+300 && currentTime < lastTime+waitTime+600) {
	writeC(cGray, msgString, aMsgStartX+grid, aMsgStartY+grid);
    } else if (currentTime >= lastTime+waitTime+600 && currentTime < lastTime+waitTime+900) {
	writeC(cLightGray, msgString, aMsgStartX+grid, aMsgStartY+grid);
    } else {
	lastTime = currentTime;
	msgString = "";
    }
}

void drawIngredients() {
    for (int i = 0; i < ingreds.size(); i++) {
	final ImageButton ing = (ImageButton) ingreds.get(i);
	ing.update();
	ing.display();
    }
}

void drawCurrentIngredients() {
    int j = 0;
    int cur = ID_ING_X_1;
    for (int i = 0; i < currentIngreds.size(); i++) {
	final int k = (int) currentIngreds.get(i);
	final String n = (String) ingredStrings.get(k);
	final PImage imgB = (PImage) pimageB.get(k);
	final PImage imgX = (PImage) pimageX.get(k);
	int x = 1.5*grid;
	int y = 11.5*grid+2.5*i*grid;
	// 2 columns, 3 rows
	if (j >= 3) {
	    x = 4*grid;
	    y = 11.5*grid+2.5*(i-3)*grid;
	}
	j++;
	final int w = imgB.width*0.7;
	final int h = imgB.height*0.7;
	final ImageButton ing = new ImageButton(n, cur, x, y, w, h, imgB, imgX, imgX);
	ing.update();
	ing.display();
	cur++;
	if (cur > ID_ING_X_6) {
	    cur = ID_ING_X_1;
	}
    }
}

void drawDebug() {
    if (DEBUG) {
	write("DEBUG:",grid,DEBUG_LINE);
	write(currentObj,4*grid,DEBUG_LINE);
	write(currentIngred,6*grid,DEBUG_LINE);
    }
}

/********************************
 * User Interaction
 ********************************/
void mouseReleased() {
    checkStoveSwitch(stoveSwitch1, stove1);
    checkStoveSwitch(stoveSwitch2, stove2);
    checkStoveSwitch(stoveSwitch3, stove3);
}

void keyPressed() {
    // A switch statement may look a bit nicer
    if (key == '1') {
	currentObj = ID_ING_0;
    } else if (key == '2') {
	currentObj = ID_ING_1;
    } else if (key == '3') {
	currentObj = ID_ING_2;
    } else if (key == '4') {
	currentObj = ID_ING_3;
    } else if (key == '5') {
	currentObj = ID_ING_4;
    } else if (key == '6') {
	currentObj = ID_ING_5;
    }
    // even though I don't use QWERTY, grumble grumble...
    else if (key == 'q') {
    	currentObj = ID_ING_6;
    } else if (key == 'w') {
	currentObj = ID_ING_7;
    } else if (key == 'e') {
    	currentObj = ID_ING_8;
    } else if (key == 'r') {
    	currentObj = ID_ING_9;
    } else if (key == 't') {
    	currentObj = ID_ING_10;
    } else if (key == 'y') {
    	currentObj = ID_ING_11;
    } else if (key == 'a') {
    	currentObj = ID_ING_12;
    } else if (key == 's') {
    	currentObj = ID_ING_13;
    } else if (key == 'd') {
    	currentObj = ID_ING_14;
    } else if (key == 'f') {
    	currentObj = ID_ING_15;
    } else if (key == 'g') {
    	currentObj = ID_ING_16;
    } else if (key == 'h') {
    	currentObj = ID_ING_17;
    }
    addIngredientClick();
}

/********************************
 * Application business logic
 ********************************/
void addIngredientClick() {
    if (inRange(currentObj,ID_ING_0,ID_ING_17)) {
	// check that item not in ArrayList, O(n)
	boolean canAdd = true;
	boolean hasChoc = hasChocolate();
	for (int i = 0; i < currentIngreds.size(); i++) {
	    // Can't add same ingredient twice
	    if (currentIngreds.get(i) == currentObj) {
		canAdd = false;
	    }
	    // only add one type of chocolate
	    if (inRange(currentObj,ID_ING_CHOC_MIN,ID_ING_CHOC_MAX) && hasChoc) {
		canAdd = false;
		msgString = msgOneChocolate;
	    }
	}
	// if we don't have any duplicates with no more than 6
	if (canAdd && currentIngreds.size() < 6) {
	    currentIngreds.add(currentObj);
	    currentIngredsMap.add(currentIngred);
	    currentIngred++;
	}
    }
}

void exClick() {
    if (currentObj == ID_EX) {
	clearIngredients();
    }
}

void arrowClick() {
    if (currentObj == ID_ARROW) {
	if (hasChocolate()) {
	    // TODO: check against evolution level
	    final int chocType = getChocolate();
	    // TODO: refactor this
	    if (stove1.isEmpty()) {
		stove1.isFull = true;
		stove1._type = chocType;
		clearIngredients();
	    } else {
		if (stove2.isEmpty()) {
		    stove2.isFull = true;
		    stove2._type = chocType;
		    clearIngredients();
		} else {
		    if (stove3.isEmpty()) {
			stove3.isFull = true;
			stove3._type = chocType;
			clearIngredients();
		    }
		    else {
			msgString = msgNoStoves;
		    }
		}
	    }
	} else {
	    msgString = msgNoChocolate;
	}
    }
}

void currentIngredientClick() {
    if (inRange(currentObj,ID_ING_X_1,ID_ING_X_6)) {
	// TODO: fix bug if hold down button, it deletes all after
	int toRemove = -1;
	boolean doRemove = false;
	for (int i = 0; i < currentIngredsMap.size(); i++) {
	    // if the current object is the one in the map, remove (i) from the list
	    if (currentObj == currentIngredsMap.get(i)) {
		doRemove = true;
		toRemove = i;
		break;
	    }
	}
	if (doRemove) {
	    currentIngreds.remove(toRemove);
	}
	// determine new size and rebuild map
	int curSize = currentIngreds.size();
	currentIngred = ID_ING_X_1;
	currentIngredsMap.clear();
	for (int i = 0; i < curSize; i++) {
	    currentIngredsMap.add(currentIngred);
	    currentIngred++;
	}
    }
}

void stoveArrowClick() {
    if (inRange(currentObj,ID_STOVE_ARROW_1,ID_STOVE_ARROW_3)) {
	boolean hasChoc = false;
	boolean isReady = false;
	if (currentObj == ID_STOVE_ARROW_1) {
	    hasChoc = stove1.isFull;
	    isReady = stove1.isReady;
	} else if (currentObj == ID_STOVE_ARROW_2) {
	    hasChoc = stove2.isFull;
	    isReady = stove2.isReady;
	} else if (currentObj == ID_STOVE_ARROW_3) {
	    hasChoc = stove3.isFull;
	    isReady = stove3.isReady;
	}

	if (hasChoc && isReady) {
	    // TODO: Refactor this
	    if (mold1.isEmpty()) {
		mold1.isFull = true;
		mold1._time = millis();
		clearStove();
	    } else {
		if (mold2.isEmpty()) {
		    mold2.isFull = true;
		    mold2._time = millis();
		    clearStove();
		} else {
		    if (mold3.isEmpty()) {
			mold3.isFull = true;
			mold3._time = millis();
			clearStove();
		    } else {
			if (mold4.isEmpty()) {
			    mold4.isFull = true;
			    mold4._time = millis();
			    clearStove();
			} else {
			    if (mold5.isEmpty()) {
				mold5.isFull = true;
				mold5._time = millis();
				clearStove();
			    } else {
				if (mold6.isEmpty()) {
				    mold6.isFull = true;
				    mold6._time = millis();
				    clearStove();
				} else {
				    // All molds are full
				    msgString = msgNoMolds;
				}
			    }
			}
		    }
		}
	    } // end full molds
	}
    }
}

void moldArrowClick() {
    if (inRange(currentObj,ID_MOLD_ARROW_1,ID_MOLD_ARROW_6)) {
	boolean hasChoc = false;
	boolean isReady = false;
	if (currentObj == ID_MOLD_ARROW_1) {
	    hasChoc = mold1.isFull;
	    isReady = mold1.isCool;
	    if (hasChoc && isReady) {
		sellChocolate();
		mold1.empty();
	    }
	} else if (currentObj == ID_MOLD_ARROW_2) {
	    hasChoc = mold2.isFull;
	    isReady = mold2.isCool;
	    if (hasChoc && isReady) {
		sellChocolate();
		mold2.empty();
	    }
	} else if (currentObj == ID_MOLD_ARROW_3) {
	    hasChoc = mold3.isFull;
	    isReady = mold3.isCool;
	    if (hasChoc && isReady) {
		sellChocolate();
		mold3.empty();
	    }
	} else if (currentObj == ID_MOLD_ARROW_4) {
	    hasChoc = mold4.isFull;
	    isReady = mold4.isCool;
	    if (hasChoc && isReady) {
		sellChocolate();
		mold4.empty();
	    }
	} else if (currentObj == ID_MOLD_ARROW_5) {
	    hasChoc = mold5.isFull;
	    isReady = mold5.isCool;
	    if (hasChoc && isReady) {
		sellChocolate();
		mold5.empty();
	    }
	} else if (currentObj == ID_MOLD_ARROW_6) {
	    hasChoc = mold6.isFull;
	    isReady = mold6.isCool;
	    if (hasChoc && isReady) {
		sellChocolate();
		mold6.empty();
	    }
	}
    }
}

void clearIngredients() {
    currentIngreds.clear();
    currentIngredsMap.clear();
    currentIngred = ID_ING_X_1;
}

void clearStove() {
    if (currentObj == ID_STOVE_ARROW_1) {
	stove1.empty();
    } else if (currentObj == ID_STOVE_ARROW_2) {
	stove2.empty();
    } else if (currentObj == ID_STOVE_ARROW_3) {
	stove3.empty();
    }
}

boolean hasChocolate() {
    for (int i = 0; i < currentIngreds.size(); i++) {
	if (inRange(currentIngreds.get(i),ID_ING_CHOC_MIN,ID_ING_CHOC_MAX)) {
	    return true;
	}
    }
    return false;
}

int getChocolate() {
    for (int i = 0; i < currentIngreds.size(); i++) {
	if (inRange(currentIngreds.get(i),ID_ING_CHOC_MIN,ID_ING_CHOC_MAX)) {
	    return currentIngreds.get(i);
	}
    }
    return -1;
}

void checkStoveSwitch(SwitchButton sw, Stove s) {
    if (sw.isOver) {
	sw.doSwitch();
	if (sw.state) {
	    s.isOn = true;
	} else {
	    s.isOn = false;
	}
    }
}

void sellChocolate() {
    gLevel++;
    gScore += 100;
    gHappy += 10;
}

/********************************
 * Classes and Objects
 ********************************/
class SwitchButton extends Button {
    boolean state;
    PImage base;
    PImage alter;
    PImage currentimage;

    SwitchButton(int idd,int ix,int iy,int iw,int ih, PImage ibase, PImage ialter) {
	state = false;
	_id = idd;
	x = ix;
	y = iy;
	w = iw;
	h = ih;
	base = ibase;
	alter = ialter;
	currentimage = base;
    }

    void update() {
	over();
	pressed();
	if (isPressed) {
	    if (state)
		currentimage = alter;
	    else
		currentimage = base;
	} else {
	    if (state)
		currentimage = base;
	    else
		currentimage = alter;
	}
    }

    void over() {
	if( overRect(x, y, w, h) ) {
	    isOver = true;
	} else {
	    isOver = false;
	}
    }

    void doSwitch() {
	if (state) {
	    currentimage = base;
	} else {
	    currentimage = alter;
	}
	state = !state;
    }

    void display() {
	image(currentimage, x, y, w, h);
    }
}

/**
 * ImageButton is used for anything that has an image and needs to act as a button, e.g. Ingredients
 */
class ImageButton extends Button {
    String name;
    PImage base;
    PImage roll;
    PImage down;
    PImage currentimage;

    ImageButton(String n,int idd,int ix, int iy, int iw, int ih, PImage ibase, PImage iroll, PImage idown) {
	_id = idd;
	name = n;
	x = ix;
	y = iy;
	w = iw;
	h = ih;
	base = ibase;
	roll = iroll;
	down = idown;
	currentimage = base;
    }

    void update() {
	over();
	pressed();
	if (isPressed){
	    // set currentimage and currentObj
	    currentimage = down;
	    currentObj = _id;
	    // perform click functionality
	    // NOTE: it would be nice if processing accepted a function as a parameter, 
	    // then we could just assign that and perform that function
	    addIngredientClick();
	    exClick();
	    arrowClick();
	    currentIngredientClick();
	    stoveArrowClick();
	    moldArrowClick();
	} 
	// hover
	else if(isOver) {
	    currentimage = roll;
	} else {
	    currentimage = base;
	}
    }

    void over() {
	if( overRect(x, y, w, h) ) {
	    isOver = true;
	} else {
	    isOver = false;
	}
    }

    void display() {
	image(currentimage, x, y, w, h);
    }
}

class Button {
    int _id;
    int x, y;
    int w, h;
    boolean isOver = false;
    boolean isPressed = false;   

    void pressed() {
	if(isOver && mousePressed) {
	    isPressed = true;
	} else {
	    isPressed = false;
	}    
    }

    boolean overRect(int x, int y, int width, int height) {
	if (inRange(mouseX,x,x+width) &&
	    inRange(mouseY,y,y+height)) {
	    return true;
	} else {
	    return false;
	}
    }
}

class Stove {
    int _id;
    int x, y;
    int size;
    int _type = -1;
    int _temp = 75;
    int _time = 0;
    boolean isHot = false;
    boolean isTooHot = false;
    boolean isTempered = false;
    boolean isOn = false;
    boolean isFull = false;
    boolean isReady = false;
    final int tempHot1 = 95;
    final int tempHot2 = 99;
    final int tempTemp1 = 88;
    final int tempTemp2 = 90;
    final color cOuter = #222222;
    final color cOnEmpty = #a92525;
    final color cOnFull = #764107;
    final color cOffEmpty = #747474;
    final color cOffFull = #705417;

    Stove(int idd, int ix, int iy, int s) {
	_id = idd;
	x = ix;
	y = iy;
	size = s;
    }

    void update() {
	final int currentTime = millis();
	final int waitTime = 500;
	// increasing temperature
	if (isOn && isFull) {
	    if (currentTime > _time+waitTime) {
		_temp++;
		_time = currentTime;
	    }
	}
	// decreasing temperature
	if (isOff() && isFull && _temp > 75) {
	    if (currentTime > _time+waitTime) {
		_temp--;
		_time = currentTime;
	    }
	}
	// achieved high!
	if (inRange(_temp,tempHot1,tempHot2)) {
	    isHot = true;
	    isReady = true;
	}
	// too hot! (lose points)
	if (_temp > tempHot2) {
	    isTooHot = true;
	}
	// in tempered range!
	if (isHot && inRange(_temp,tempTemp1,tempTemp2)) {
	    isTempered = true;
	}
	// let it get too cool! (lose points)
	if (isHot && _temp < tempTemp1) {
	    isTempered = false;
	    isHot = false;
	}
    }

    void display() {
	pushMatrix();
	translate(x,y);
	fill(cOuter);
	ellipse(0,0,size,size);
	// on, no chococolate
	if (isOn && isEmpty()) {
	    fill(cOnEmpty);
	} 
	// on with chococolate
	else if (isOn && isFull) {
	    fill(cOnFull);
	} 
	// off, no chococolate
	else if (isOff() && isEmpty()) {
	    fill(cOffEmpty);
	} 
	// off with chococolate
	else if (isOff() && isFull) {
	    fill(cOffFull);
	}
	ellipse(0,0,0.95*size,0.95*size);
	popMatrix();
    }

    boolean isOff() {
	return !isOn;
    }
    boolean isEmpty() {
	return !isFull;
    }

    void empty() {
	isFull = false;
	isTempered = false;
	isHot = false;
	isTooHot = false;
	isReady = false;
	_type = -1;
	_temp = 75;
    }
}

class Mold {
    int _id;
    int x, y;
    int size;
    int _type = -1;
    int _time = 0;
    boolean isFull = false;
    boolean isCool = false;
    boolean wasTempered = false;
    final color cOuter = #222222;
    final color cEmpty = #747474;
    final color cFull = #705417;

    Mold(int idd, int ix, int iy, int s) {
	_id = idd;
	x = ix;
	y = iy;
	size = s;
    }

    void update() {
	final int currentTime = millis();
	final int waitTime = 5000;

	// decreasing temperature
	if (isFull && currentTime > _time+waitTime) {
	    isCool = true;
	    _time = currentTime;
	}
    }

    void display() {
	pushMatrix();
	translate(x,y);
	fill(cOuter);
	ellipse(0,0,size,size);
	// chococolate
	if (isFull) {
	    fill(cFull);
	} 
	// no chococolate
	else {
	    fill(cEmpty);
	}
	ellipse(0,0,0.95*size,0.95*size);
	popMatrix();
    }

    boolean isEmpty() {
	return !isFull;
    }

    void empty() {
	isCool = false;
	isFull = false;
	isReady = false;
	wasTempered = false;
	_type = -1;
    }

    void printCool() {
	if(isFull && isCool) {
	    write(disCool,x-1.25*buffer,y+1.5*grid);
	} else if (isFull && !isCool) {
	    write(disCooling,x-1.25*buffer,y+1.5*grid);
	}
    }
}

/********************************
 * Utility methods
 ********************************/
boolean inRange(int val, int minVal, int maxVal) {
    return (val >= minVal && val <= maxVal);
}

void write(String t, int x, int y) {
    fill(cBlack);
    text(t,x,y);
    noFill();
}

void writeC(Color c, String t, int x, int y) {
    fill(c);
    text(t,x,y);
    noFill();
}
