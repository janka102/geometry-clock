var express = require('express'),
    logger = require('morgan'),
    app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.listen(3000);