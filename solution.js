/*
Владимир Гринченко, vsgrinchenko@gmail.com

Используемый алгоритм - вариация алгоритма Вейлера-Азертона.
Исходными данными могут быть только регулярные многоугольники.
Порядок задания вершин должен быть таким, что при движении вдоль контуров внутренняя часть многоугольника должна распологаться справа.

Недостатки:
- Данные хранятся в массивах. Наверное было бы разумна создать соответствующие обекты.
  Но к этой светлой мысле я пришел только в конце, когда немного похнакомился с JS. Переделывать уже нет времени.
- Аккуратно не рассмотрены "плохие" случаи расположения вершин/сторон.
*/

function intersects(examples1, examples2) {

/* формирование и зашумление массивов вершин первого и второго многоугольника */
var fig1 = [];
for (var i=0; i<examples1.length; i++) {
   fig1.push([examples1[i].x+(1.e-6)*Math.random(),examples1[i].y+(1.e-6)*Math.random()]); /*костыль №1*/
}

var fig2 = [];
for (var i=0; i<examples2.length; i++) {
   fig2.push([examples2[i].x+(1.e-6)*Math.random(),examples2[i].y+(1.e-6)*Math.random()]); /*костыль №1*/
}


/* точки пересения сторон первого многоугольника */
var intersectPoints=[];
var points1=[];
for (var i=0; i<fig1.length-1; i++) {
   xi1=fig1[i][0];
   yi1=fig1[i][1];
   points1.push([xi1,yi1])
   xi2=fig1[i+1][0];
   yi2=fig1[i+1][1];
   for (var j=0; j<fig2.length-1; j++) {
      xj1=fig2[j][0];
      yj1=fig2[j][1];
      xj2=fig2[j+1][0];
      yj2=fig2[j+1][1];
      x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
      y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
      /* проверка принадлежности точки пересечения прямых стороне второго многоугольника */
      if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
        intersectPoints.push([x0,y0]);
        /* добавление флага входная-выходная */
        if ((x0-xi1)*(yj2-yj1)-(y0-yi1)*(xj2-xj1)<0) {
          intersectPoints[intersectPoints.length-1][2]="in";
        } else {
          intersectPoints[intersectPoints.length-1][2]="out";
        }
      }
   }
   xj1=fig2[fig2.length-1][0];
   yj1=fig2[fig2.length-1][1];
   xj2=fig2[0][0];
   yj2=fig2[0][1];
   x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
   y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
   /* проверка принадлежности точки пересечения прямых стороне второго многоугольника */
   if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
     intersectPoints.push([x0,y0]);
     /* добавление флага входная-выходная */
     if ((x0-xi1)*(yj2-yj1)-(y0-yi1)*(xj2-xj1)<0) {
       intersectPoints[intersectPoints.length-1][2]="in";
     } else {
       intersectPoints[intersectPoints.length-1][2]="out";
     }
   }
   [].push.apply(points1,intersectPoints.sort(function(a,b){return Math.pow(a[0]-xi1,2)+Math.pow(a[1]-yi1,2)-Math.pow(b[0]-xi1,2)-Math.pow(b[1]-yi1,2);}));
   intersectPoints=[];
}
/* обработка последней стороны первого многоугольника */
xi1=fig1[fig1.length-1][0];
yi1=fig1[fig1.length-1][1];
points1.push([xi1,yi1])
xi2=fig1[0][0];
yi2=fig1[0][1];
for (var j=0; j<fig2.length-1; j++) {
   xj1=fig2[j][0];
   yj1=fig2[j][1];
   xj2=fig2[j+1][0];
   yj2=fig2[j+1][1];
   x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
   y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
   /* проверка принадлежности точки пересечения прямых стороне второго многоугольника */
   if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
     intersectPoints.push([x0,y0]);
     /* добавление флага входная-выходная */
     if ((x0-xi1)*(yj2-yj1)-(y0-yi1)*(xj2-xj1)<0) {
       intersectPoints[intersectPoints.length-1][2]="in";
     } else {
       intersectPoints[intersectPoints.length-1][2]="out";
     }
   }
}
xj1=fig2[fig2.length-1][0];
yj1=fig2[fig2.length-1][1];
xj2=fig2[0][0];
yj2=fig2[0][1];
x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
/* проверка принадлежности точки пересечения прямых стороне второго многоугольника */
if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
  intersectPoints.push([x0,y0]);
  /* добавление флага входная-выходная */
  if ((x0-xi1)*(yj2-yj1)-(y0-yi1)*(xj2-xj1)<0) {
     intersectPoints[intersectPoints.length-1][2]="in";
  } else {
    intersectPoints[intersectPoints.length-1][2]="out";
  }
}
/* сортировка точек пересечения обрабатываемой стороны по удаленности от текущей вершины, и  добавление этих точек в общий массив */
[].push.apply(points1,intersectPoints.sort(function(a,b){return Math.pow(a[0]-xi1,2)+Math.pow(a[1]-yi1,2)-Math.pow(b[0]-xi1,2)-Math.pow(b[1]-yi1,2);}));
intersectPoints=[];


/* точки пересения сторон второго многоугольника */
var intersectPoints=[];
var points2=[];
for (var i=0; i<fig2.length-1; i++) {
   xi1=fig2[i][0];
   yi1=fig2[i][1];
   points2.push([xi1,yi1])
   xi2=fig2[i+1][0];
   yi2=fig2[i+1][1];
   for (var j=0; j<fig1.length-1; j++) {
      xj1=fig1[j][0];
      yj1=fig1[j][1];
      xj2=fig1[j+1][0];
      yj2=fig1[j+1][1];
      x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
      y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
      if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
        intersectPoints.push([x0,y0]);
      }
   }
   xj1=fig1[fig1.length-1][0];
   yj1=fig1[fig1.length-1][1];
   xj2=fig1[0][0];
   yj2=fig1[0][1];
   x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
   y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
   if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
     intersectPoints.push([x0,y0]);
   }
   [].push.apply(points2,intersectPoints.sort(function(a,b){return Math.pow(a[0]-xi1,2)+Math.pow(a[1]-yi1,2)-Math.pow(b[0]-xi1,2)-Math.pow(b[1]-yi1,2);}));
   intersectPoints=[];
}
/* обработка последней стороны второго многоугольника */
xi1=fig2[fig2.length-1][0];
yi1=fig2[fig2.length-1][1];
points2.push([xi1,yi1])
xi2=fig2[0][0];
yi2=fig2[0][1];
for (var j=0; j<fig1.length-1; j++) {
   xj1=fig1[j][0];
   yj1=fig1[j][1];
   xj2=fig1[j+1][0];
   yj2=fig1[j+1][1];
   x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
   y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
   if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
     intersectPoints.push([x0,y0]);
   }
}
xj1=fig1[fig1.length-1][0];
yj1=fig1[fig1.length-1][1];
xj2=fig1[0][0];
yj2=fig1[0][1];
x0=((yi2-yi1)/(xi2-xi1)*xi1-(yj2-yj1)/(xj2-xj1)*xj1+yj1-yi1)/((yi2-yi1)/(xi2-xi1)-(yj2-yj1)/(xj2-xj1));
y0=(yj2-yj1)/(xj2-xj1)*(x0-xj1)+yj1;
if ((x0-xi1)*(x0-xi2)<0 && (x0-xj1)*(x0-xj2)<0) {
  intersectPoints.push([x0,y0]);
}
/* сортировка точек пересечения обрабатываемой стороны по удаленности от текущей вершины, и  добавление этих точек в общий массив */
[].push.apply(points2,intersectPoints.sort(function(a,b){return Math.pow(a[0]-xi1,2)+Math.pow(a[1]-yi1,2)-Math.pow(b[0]-xi1,2)-Math.pow(b[1]-yi1,2);}));
intersectPoints=[];


/* округление координат точек и добавление их номеров */
for (var i=0; i<points1.length; i++) {
   if (points1[i][2]=="in" || points1[i][2]=="out") {
     points1[i]=[points1[i][0].toFixed(2),points1[i][1].toFixed(2),points1[i][2],i]; /*костыль №1*/
   } else {
     points1[i]=[points1[i][0].toFixed(2),points1[i][1].toFixed(2),"top",i];         /*костыль №1*/
   }
}
for (var i=0; i<points2.length; i++) {
     points2[i]=[points2[i][0].toFixed(2),points2[i][1].toFixed(2),"dot",i];         /*костыль №1*/
}


/* установка связей между точками пересечений */
for (var i=0; i<points1.length; i++) {
  points1[i][4]=false;
  for (var j=0; j<points2.length; j++) {
    if ((points1[i][0]==points2[j][0]) && (points1[i][1]==points2[j][1])) {
      points1[i][4]=j;
      break;
    }
  }
}

for (var i=0; i<points2.length; i++) {
  points2[i][4]=false;
  for (var j=0; j<points1.length; j++) {
    if ((points2[i][0]==points1[j][0]) && (points2[i][1]==points1[j][1])) {
      points2[i][4]=j;
      break;
    }
  }
}


/* вывод координат точек и связей на экран */
/*
document.write("<br />");
for (var i=0; i<points1.length; i++) {
   document.write(i + " - " + points1[i] + "<br />");
}
document.write("<br />");
for (var i=0; i<points2.length; i++) {
   document.write(i + " - " + points2[i] + "<br />");
}
*/


/* формирование массива "входных" точек пересечения */
var points1in = [];
for (var i=0; i<points1.length; i++) {
   if (points1[i][2]=="in") {
     points1in.push(points1[i]);
   }
}


/* построение пересечений */
var currPoint = [];
var currCurve = [];
var pointsRelult = [];

while (points1in.length>0) {
   currPoint=points1in[0];
   pointsFlag=true;  /* true - для points1, false - для points2 */

   do {
     currCurve.push(currPoint);

     /* удаление точки currPoint из points1in, если она является входной */
     if (pointsFlag==true && currPoint[2]=="in") {
       for (var i=0; i<points1in.length; i++) {
         if (Math.abs(currPoint[3]-points1in[i][3])<0.1) {
           points1in.splice(i, 1);
           break;
         }
       }
     }
     if (pointsFlag==false && currPoint[4]!=false) {
       for (var i=0; i<points1in.length; i++) {
         if (Math.abs(currPoint[4]-points1in[i][3])<0.1) {
           points1in.splice(i, 1);
           break;
         }
       }
     }

     /* шаг от текущей точки currPoint к следующей */
     if (pointsFlag==true && currPoint[4]==false) {
       if (currPoint[3] != points1.length-1) {
         currPoint=points1[currPoint[3]+1];
       } else {
       currPoint=points1[0];
       }
     continue;
     }

     if (pointsFlag==false && currPoint[4]==false) {
       if (currPoint[3] != points2.length-1) {
         currPoint=points2[currPoint[3]+1];
       } else {
       currPoint=points2[0];
       }
     continue;
     }

     if (pointsFlag==true && currPoint[4]!=false) {
       x0=currPoint[0];
       y0=currPoint[1];
       if (currPoint[3] != points1.length-1) {
         nextPoint1=points1[currPoint[3]+1];
       } else {
       nextPoint1=points1[0];
       }
       x1=nextPoint1[0];
       y1=nextPoint1[1];
       if (currPoint[4] != points2.length-1) {
         nextPoint2=points2[currPoint[4]+1];
       } else {
       nextPoint2=points2[0];
       }
       x2=nextPoint2[0];
       y2=nextPoint2[1];
       if ((x1-x0)*(y2-y0)-(y1-y0)*(x2-x0)<0) {
         currPoint=nextPoint1;
       } else {
         currPoint=nextPoint2;
         pointsFlag=!pointsFlag;
       }
     continue;
     }

     if (pointsFlag==false && currPoint[4]!=false) {
       x0=currPoint[0];
       y0=currPoint[1];
       if (currPoint[3] != points2.length-1) {
         nextPoint2=points2[currPoint[3]+1];
       } else {
       nextPoint2=points2[0];
       }
       x2=nextPoint2[0];
       y2=nextPoint2[1];
       if (currPoint[4] != points1.length-1) {
         nextPoint1=points1[currPoint[4]+1];
       } else {
       nextPoint1=points1[0];
       }
       x1=nextPoint1[0];
       y1=nextPoint1[1];
       if ((x1-x0)*(y2-y0)-(y1-y0)*(x2-x0)<0) {
         currPoint=nextPoint1;
         pointsFlag=!pointsFlag;
       } else {
         currPoint=nextPoint2;
       }
     continue;
     }
   } while (Math.abs(currPoint[0]-currCurve[0][0])+Math.abs(currPoint[1]-currCurve[0][1])>1e-6);  /*костыль №2*/

   /* добавление полученной фигуры-пересечения в хранилище */   
   pointsRelult.push(currCurve);
   currCurve=[];

}

/* вывод на экран координат фигур-пересечений */
document.write("<br />");
document.write("Число фигур-пересечений: " + pointsRelult.length + "<br />");
for (var i=0; i<pointsRelult.length; i++) {
   document.write("<br />");
   for (var j=0; j<pointsRelult[i].length; j++) {
      document.write(pointsRelult[i][j][0] + "   " + pointsRelult[i][j][1] + "<br />");
   }
}


/* подготовка результатов к построению */
var temp1 = [];
var temp2 = [];
for (var i=0; i<pointsRelult.length; i++) {
   for (var j=0; j<pointsRelult[i].length; j++) {
      temp2.push({x:pointsRelult[i][j][0],y:pointsRelult[i][j][1]});
   }
   temp1.push(temp2);
   temp2=[];
}
return temp1;

}
