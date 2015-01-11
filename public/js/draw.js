//
//  CANVAS
//

var updateTextIn = 0;
var updateTextFps;

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
    Canvas.context.fillStyle = '#f1f1f1';
    Canvas.context.fill();
    drawMap();

    updateTextIn--;
    if(updateTextIn < 1){
        updateTextIn = Game._fps / 4;
        updateTextFps = Game.fps;
        updateTextFps = Math.round(updateTextFps*10)/10;
    }

    Canvas.context.font = "40px Arial";
    Canvas.context.fillText('FPS: ' + updateTextFps, 20, 50);
    Canvas.context.fillText('X: ' + player.x, 20, 100);
    Canvas.context.fillText('Y: ' + player.y, 20, 150);
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

function drawMap(){

    var height = Canvas.getHeight();
    var width = Canvas.getWidth();
    var left = 0;
    var top = 0;
    var tiles = 20;
    var tile = 0;

    if(height > width){
        height = width;
        top = (Canvas.getHeight() - height) / 2;
        left = (Canvas.getWidth() - width) / 2;
        tile = width / tiles;
    }
    else{
        width = height;
        top = (Canvas.getHeight() - height) / 2;
        left = (Canvas.getWidth() - width) / 2;
        tile = height / tiles;
    }

    for(var x = 0; x < tiles; x++){
        for(var y = 0; y < tiles; y++){

            Canvas.context.beginPath();
            Canvas.context.rect(left + (tile*x), top + (tile*y), tile, tile);

            Canvas.context.fillStyle = "#2d2d2d";

            for(var _player in coordinates){

                if(_player == auth.username){

                }
                else if(x == coordinates[_player].x && y == coordinates[_player].y){
                    Canvas.context.fillStyle = "#99CC00";
                }
            }

            if(x == player.x && y == player.y)
                Canvas.context.fillStyle = "#00CED1";
            
            Canvas.context.fill();

        }
    }

}