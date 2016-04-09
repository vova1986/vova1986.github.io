// пример многоугольников
var examples = {
  first: [
    { x: 50,  y: 50  },
    { x: 250, y: 50  },
    { x: 250, y: 100 },
    { x: 125, y: 100 },
    { x: 125, y: 125 },
    { x: 300, y: 125 },
    { x: 300, y: 150 },
    { x: 75,  y: 150 },
    { x: 75,  y: 200 },
    { x: 150, y: 200 },
    { x: 150, y: 250 },
    { x: 50,  y: 250 },
  ],
  second: [
    { x: 100, y: 25  },
    { x: 175, y: 25  },
    { x: 175, y: 300 },
    { x: 100, y: 300 },
  ]
};

function drawPath(data, container, color) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var str = 'M' + data[0].x + ',' + data[0].y+' ';
  str += data.slice(1).map(function (point) {
    return 'L' + point.x + ',' + point.y;
  }).join(' ');
  str += 'L' + data[0].x + ',' + data[0].y+' ';
  path.setAttribute('d', str);
  path.style.fill = color;
  container.appendChild(path);
}

drawPath(examples.first, document.querySelector('svg.base'), 'navy');
drawPath(examples.second, document.querySelector('svg.base'), 'yellow');

intersects(examples.first, examples.second).forEach(function (p) {
  drawPath(p, document.querySelector('svg.intersections'), 'red');
})
