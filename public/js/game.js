Game.tick = function () {
    Game.ticks++;
    Game.playtime = (Date.now() - Game.joined) - 1000*60*60;
};

Game.draw = function () {
    Game.draws++;
    Canvas.redraw();
    Canvas.clear();
    Canvas.paint();
    Game.fpsCounter();
};
Game.fpsCounter = function() {

  if(!Game.lastCalledTime) {
     Game.lastCalledTime = Date.now();
     Game.fps = 0;
     return;
  }
  delta = (new Date().getTime() - Game.lastCalledTime)/1000;
  Game.lastCalledTime = Date.now();
  Game.fps = 1/delta;
} ;

//
//  Gameloop by nokarma.org
//  @ http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
//

Game.run = (function() {
    var loops = 0, skipTicks = 1000 / Game._fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime(),
        lastGameTick;

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            Game.tick();
            nextGameTick += skipTicks;
            loops++;
        }

        if (loops) Game.draw();

    };
})();

Game.setup = function() {

    if (!this.setupDone) {
        //Get width and height
        Canvas.window.width = window.innerWidth;
        Canvas.window.height = window.innerHeight;

        //Create canvas elemanet
        Canvas.canvas = document.createElement("canvas");
        Canvas.canvas.id = "game";
        Canvas.canvas.width = Canvas.window.width;
        Canvas.canvas.height = Canvas.window.height;
        Canvas.canvas.innerHTML = "Error, your browser does not support canvas elements.";

        //Add element to body
        document.body.appendChild(Canvas.canvas);
        Canvas.context = Canvas.canvas.getContext('2d');

        this.setupDone = true;
        console.log("game setup done!");

    }
    else{
        console.log("game setup already done!");
    };
};

Game.start = function() {

    if(!this.setupDone){
        console.log("no game setup!");
        return;
    };

    if(this.running){
        console.log("game is already running!");
        return;
    };

    (function() {
        var onEachFrame;

        if (window.requestAnimationFrame) {
            onEachFrame = function(cb) {
            var _cb = function() { cb(); requestAnimationFrame(_cb); }
            _cb();
        };
        } else if (window.mozRequestAnimationFrame) {
            onEachFrame = function(cb) {
            var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
            _cb();
        };
        } else {
            onEachFrame = function(cb) {
            setInterval(cb, 1000 / Game._fps);
            }
        }
        
        window.onEachFrame = onEachFrame;

    })();

    window.onEachFrame(Game.run);

    Game.running = true;

};