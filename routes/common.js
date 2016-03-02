exports.notfound = function (req, res) {
    res.status(404).format({
        html: function () {
            res.render('404');
        },
        json: function () {
            res.send({ message: 'Resource not found.'});
        },
        xml: function () {
            res.write('<error>\n');
            res.write('    <message>Resource not found.</message>\n');
            res.write('</error>\n');
        },
        text: function () {
            res.send('Resource not found.\n');
        }
    });
};

exports.error = function (err, req, res, next) {
    var msg;
    console.error(err.stack);

    switch (err.type) {
        case 'database':
            msg = 'Server Unavailable';
            res.statusCode = 503;
            break;
        default:
            msg = 'Internal Server Error';
            res.statusCode = 500;
            break;
    }

    // handle CSRF token errors
    if (err.code == 'EBADCSRFTOKEN') {
        msg = 'form tampered with';
        res.statusCode = 403;
    }

    res.format({
        html: function () {
            res.render('5xx', { msg:msg, status: res.statusCode });
        },

        json: function () {
            res.send({ error: msg });
        },

        text: function () {
            res.send(msg + '\n');
        }
    });
};

