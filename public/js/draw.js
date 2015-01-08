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