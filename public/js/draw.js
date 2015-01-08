//
//  CANVAS
//

Canvas.redraw = function () {

    Canvas.window.width = window.innerWidth;
    Canvas.window.height = window.innerHeight;

    Canvas.canvas.width = Canvas.window.width;
    Canvas.canvas.height = Canvas.window.height;

};
Canvas.getWidth = function () {
    return Canvas.window.width;
};
Canvas.getHeight = function () {
    return Canvas.window.height;
};
Canvas.clear = function () {
    Canvas.context.clearRect( 0, 0, Canvas.window.width, Canvas.window.height );
};
Canvas.paint = function () {
    Canvas.context.beginPath();
    Canvas.context.rect(0, 0, Canvas.getWidth(), Canvas.getHeight());
    Canvas.context.fillStyle = '#2d2d2d';
    Canvas.context.fill();

    Canvas.context.fillStyle = "#f1f1f1";
    Canvas.context.font = "40px Arial";
    Canvas.context.fillText('Playtime: ' + new Date(Game.playtime).hhmmss(), 20, 50);
};

//
//  HELPER FUNCTIONS
//

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function inverse(hex) {
if (hex.length != 7 || hex.indexOf('#') != 0) {
return null;
}
var r = (255 - parseInt(hex.substring(1, 3), 16)).toString(16);
var g = (255 - parseInt(hex.substring(3, 5), 16)).toString(16);
var b = (255 - parseInt(hex.substring(5, 7), 16)).toString(16);
var inverse = "#" + pad(r) + pad(g) + pad(b);

return inverse
}

function pad(num) {
if (num.length < 2) {
return "0" + num;
} else {
return num;
}
}