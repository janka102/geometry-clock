var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'geometry-clock', {create: create, update: update, render: render });

var clockCenter,
    clockHour,
    clockMinute,
    clockSecond,
    digitalClock,
    faviconCounter = 0;

function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('favicon');

    link.id = 'favicon';
    link.rel = 'shortcut icon';
    link.href = src;

    if (oldLink) {
        document.head.removeChild(oldLink);
    }

     document.head.appendChild(link);
}

function canvasToFavicon() {
    var canvas = document.getElementById('resizer'),
        ctx = canvas.getContext('2d'),
        width = 16,
        height = 16;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 8, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = 'rgb(255,255,0)';
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(clockHour.x * (16/600), clockHour.y * (16/600));
    ctx.lineTo(clockMinute.x * (16/600), clockMinute.y * (16/600));
    ctx.closePath();
    ctx.lineJoin = 'round';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    changeFavicon(canvas.toDataURL());
}

function create() {
    game.stage.disableVisibilityChange = false;
    
    clockCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
    clockHour = new Phaser.Point(clockCenter.x, clockCenter.y - 175);
    clockMinute = new Phaser.Point(clockCenter.x, clockCenter.y - 250);
    // clockSecond = new Phaser.Point(clockCenter.x, clockCenter.y - 275);

    // digitalClock = game.add.text(game.world.centerX, 50, '', {
    //     font: "35px Arial",
    //     fill: "#FF0",
    //     align: "center"
    // });

    // digitalClock.anchor.setTo(0.5);
}

function update() {
    if (faviconCounter % 30 === 0) {
        canvasToFavicon(game.canvas.toDataURL());
        faviconCounter = 0;
    }
    faviconCounter++;

    // I subtract 90deg because clocks start at -90deg
    var now = new Date(),
        millisecond = (now.getMilliseconds() * 0.36) - 90,
        second = (now.getSeconds() * 6 + millisecond / 60) - 90,
        minute = (now.getMinutes() * 6 + second / 60) - 90,
        hour = ((((now.getHours() % 12) / 12) * 360) + minute / 12) - 90;

    clockHour.rotate(clockCenter.x, clockCenter.y, hour, true);
    clockMinute.rotate(clockCenter.x, clockCenter.y, minute, true);
    // clockSecond.rotate(clockCenter.x, clockCenter.y, second, true);

    // digitalClock.setText(now.getHours() % 12 + ':' + now.getMinutes() + ':' + now.getSeconds());
}

function render() {
    game.context.fillStyle = '#111111';
    game.context.beginPath();
    game.context.arc(clockCenter.x, clockCenter.y, 290, 0, 2 * Math.PI, false);
    game.context.fill();
    game.context.closePath();

    game.context.strokeStyle = 'rgb(255,255,0)';
    game.context.fillStyle = 'rgb(255,255,0)';
    game.context.beginPath();
    game.context.moveTo(clockCenter.x, clockCenter.y);
    game.context.lineTo(clockHour.x, clockHour.y);
    game.context.lineTo(clockMinute.x, clockMinute.y);
    // game.context.lineTo(clockSecond.x, clockSecond.y);
    game.context.closePath();
    game.context.lineJoin = 'round';
    game.context.lineWidth = 10;
    game.context.stroke();
    game.context.fill();
    game.context.closePath();

    // game.context.strokeStyle = 'rgb(255,0,0)';
    // game.context.fillStyle = '';
    // game.context.beginPath();
    // game.context.moveTo(clockCenter.x, clockCenter.y);
    // game.context.lineTo(clockSecond.x, clockSecond.y);
    // game.context.stroke();
    // game.context.closePath();
}