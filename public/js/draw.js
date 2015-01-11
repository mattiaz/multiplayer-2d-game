//
//  CANVAS
//

var updateTextIn = 0;
var updateTextFps;
var sprite = new Image();
sprite.src = '/public/sprites/sprite.png';

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

    if(map.background != null)
        drawMap();

    updateTextIn--;
    if(updateTextIn < 1){
        updateTextIn = Game._fps / 4;
        updateTextFps = Game.fps;
        updateTextFps = Math.round(updateTextFps*10)/10;
    }
};

//
//  HELPER FUNCTIONS
//

function randomString(items){
    return items[Math.floor(Math.random()*items.length)];
}

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

            var x_board = Math.floor(player.x / tiles);
            var y_board = Math.floor(player.y / tiles);

            var _x = x + (tiles*x_board);
            var _y = y + (tiles*y_board);

            Canvas.context.beginPath();
            Canvas.context.rect(left + (tile*x) - 1, top + (tile*y) - 1, tile + 1 , tile + 1);

            var _tile = getTile(_x, _y);
            var color = getTileColor(_tile);

            Canvas.context.fillStyle = color;

            for(var _player in coordinates){

                if(_player == auth.username){

                }
                else if(_x == coordinates[_player].x && _y == coordinates[_player].y){
                    Canvas.context.fillStyle = "#f1f1f1";
                }

            }

            if(_x == player.x && _y == player.y)
                Canvas.context.fillStyle = "#f1f1f1";
            
            Canvas.context.fill();

        }
    }

    for(var x = 0; x < tiles; x++){
        for(var y = 0; y < tiles; y++){

            var x_board = Math.floor(player.x / tiles);
            var y_board = Math.floor(player.y / tiles);

            var _x = x + (tiles*x_board);
            var _y = y + (tiles*y_board);

            for(var _player in coordinates){
                if(_x == coordinates[_player].x && _y == coordinates[_player].y && _player != auth.username){
                    Canvas.context.textAlign = 'center';
                    Canvas.context.font = "25px Arial";
                    var length = Canvas.context.measureText(_player).width;
                    Canvas.context.beginPath();
                    Canvas.context.fillStyle = "rgba(0,0,0,0.2)";
                    Canvas.context.rect(left + (tile*x) + (tile/2) - (length/2) - 5, top + (tile*y) - 41, length + 10, 25);
                    Canvas.context.fill();

                    Canvas.context.fillStyle = "rgba(255,255,255,0.4)";
                    Canvas.context.fillText(_player, left + (tile*x) + (tile/2), top + (tile*y) - 20);
                }
                else if(_x == player.x && _y == player.y && _player != auth.username){
                    Canvas.context.textAlign = 'center';
                    Canvas.context.font = "25px Arial";
                    var length = Canvas.context.measureText('You').width;
                    Canvas.context.beginPath();
                    Canvas.context.fillStyle = "rgba(0,0,0,0.2)";
                    Canvas.context.rect(left + (tile*x) + (tile/2) - (length/2) - 5, top + (tile*y) - 41, length + 10, 25);
                    Canvas.context.fill();

                    Canvas.context.fillStyle = "rgba(255,255,255,0.4)";
                    Canvas.context.fillText('You', left + (tile*x) + (tile/2), top + (tile*y) - 20);
                }
            }
        }
    }

    Canvas.context.font = "25px Arial";
    Canvas.context.textAlign = 'left';
    var length = Canvas.context.measureText('FPS: 60.00').width;

    Canvas.context.beginPath();
    Canvas.context.fillStyle = "rgba(0,0,0,0.2)";
    Canvas.context.rect(left, top, length, 75);
    Canvas.context.fill();

    Canvas.context.fillStyle = "rgba(255,255,255,0.8)";
    Canvas.context.fillText('FPS: ' + updateTextFps, left + 5, top + 22);
    Canvas.context.fillText('X: ' + player.x, left + 5, 45);
    Canvas.context.fillText('Y: ' + player.y, left + 5, 70);

}

function getTile(x, y){

    var pos = (100*y) + x;

    return map.background.replace(/(\r\n|\n|\r)/gm,"").charAt(pos);

}
function getTileColor(tile){
    if(tile == 'g')
        return '#526F35';
    if(tile == 'w')
        return '#CEDFEF';
    if(tile == 's')
        return '#2d2d2d';
    if(tile == 'r')
        return '#ea3c3c';
    if(tile == 'b')
        return '#603E11';
    if(tile == 'f')
        return '#6495ED';
    if(tile == 't')
        return '#003200';
    if(tile == 'y')
        return '#c2b280';
    if(tile == 'd')
        return '#005000';
    if(tile == 'p')
        return '#8B8682';
    if(tile == 'o')
        return '#302013';

    return '#f1f1f1';

}