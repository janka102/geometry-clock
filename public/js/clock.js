function GeometryHand(clockCenter, percentFromCenter) {
    this.clockCenter = clockCenter;
    this.percentFromCenter = percentFromCenter;
    this.x;
    this.y;
}

GeometryHand.prototype.update = function(degree) {
    var radian = degree * (2 * Math.PI / 360),
        distance = this.clockCenter.x * this.percentFromCenter;

    this.x = this.clockCenter.x + distance * Math.cos(radian);
    this.y = this.clockCenter.x + distance * Math.sin(radian);
};

function GeometryClock(canvas, properties) {
    if (!canvas instanceof HTMLElement) {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }

    if (typeof properties !== 'object') {
        properties = {
            size: 600,
            backgroundColor: '#181818',
            fillColor: '#ffff00',
            delay: 100,
            afterDraw: function() {}
        }
    }

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.properties = properties;
    this.center = {
        x: this.properties.size / 2,
        y: this.properties.size / 2
    };

    this.hourHand = new GeometryHand(this.center, 0.5);
    this.minuteHand = new GeometryHand(this.center, 0.8);
    this.secondHand = new GeometryHand(this.center, 0.9);

    this.setSize();
}

GeometryClock.prototype.setSize = function(size) {
    if (typeof size === 'number') {
        this.properties.size = size;
    }

    this.center.x = this.properties.size / 2;
    this.center.y = this.properties.size / 2;

    this.canvas.width = this.properties.size;
    this.canvas.height = this.properties.size;
};

GeometryClock.prototype.update = function() {
    // I subtract 90deg because clocks start at -90deg
    var time = new Date(),
        millisecond = (time.getMilliseconds() * 0.36) - 90,
        second = (time.getSeconds() * 6 + millisecond / 60) - 90,
        minute = (time.getMinutes() * 6 + second / 60) - 90,
        hour = ((((time.getHours() % 12) / 12) * 360) + minute / 12) - 90;
    
    this.secondHand.update(second);
    this.minuteHand.update(minute);
    this.hourHand.update(hour);
};

GeometryClock.prototype.draw = function() {
    // Clear the canvas each time
    this.ctx.clearRect(0, 0, this.properties.size, this.properties.size);

    // Draw the background circle
    this.ctx.fillStyle = this.properties.backgroundColor;
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, this.properties.size / 2, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();

    // Draw triangle with minute and second
    this.ctx.strokeStyle = this.properties.fillColor;
    this.ctx.fillStyle = this.properties.fillColor;
    this.ctx.beginPath();
    this.ctx.moveTo(this.center.x, this.center.y);
    this.ctx.lineTo(this.minuteHand.x, this.minuteHand.y);
    this.ctx.lineTo(this.hourHand.x, this.hourHand.y);
    // this.ctx.lineTo(this.secondHand.x, this.secondHand.y);
    this.ctx.closePath();
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = 10 * (this.properties.size < 100 ? this.properties.size * 3 : this.properties.size) / 600;
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
};

GeometryClock.prototype.start = function() {
    this.update();
    this.draw();

    this.properties.afterDraw.call(this);

    setTimeout(this.start.bind(this), this.properties.delay);
};

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

var clock = new GeometryClock(document.getElementById('clock'));
clock.start();

var faviconProps = {
    size: 16,
    backgroundColor: '#333333',
    fillColor: '#ffff00',
    delay: 1000 * 30,
    afterDraw: function() {
        changeFavicon(this.canvas.toDataURL());
    }
};

var faviconCanvas = new GeometryClock(document.getElementById('faviconCanvas'), faviconProps);
faviconCanvas.start();