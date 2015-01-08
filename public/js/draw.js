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
    Canvas.context.fillStyle = getRandomColor();
    Canvas.context.fill();
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