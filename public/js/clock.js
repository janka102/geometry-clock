var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'geometry-clock', {create: create, update: update, render: render });

var clockCenter,
    clockHour,
    clockMinute,
    clockSecond,
    digitalClock;

function create() {
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