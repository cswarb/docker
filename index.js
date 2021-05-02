var express = require('express');
var mongoose = require('mongoose');
var app = express();
var User = require('./app/model');

//mongoose.createConnection?
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        authSource: 'admin'
    },
    server: {
        socketOptions: {
            socketTimeoutMS: 0,
            connectionTimeout: 0
        }
    },
    user: 'admin',
    pass: 'password'
}).then((connection) => {
    console.log('mongoose connection success');

    app.get('/', function (req, res) {
        res.send(JSON.stringify(connection));
    });

    app.get('/user/:name', function (req, res) {
        User.find({ name: req.params.name }).then((re) => {
            res.status(200).json(JSON.stringify(re));
        }).catch((err) => {
            res.status(500).send(JSON.stringify(err));
        });
    });

    app.post('/user', function (req, res) {
        const record = new User({ _id: new mongoose.Types.ObjectId(), name: 'James' })

        record.save().then((re) => {
            res.status(200).json(JSON.stringify(re));
        }).catch((err) => {
            res.status(500).send(JSON.stringify(err));
        });
    });

    var server = app.listen(3000, () => {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
}).catch(error => {
    console.log('MONGOOSE CONNECT ERROR: ', error);
});