var express = require('express');
var mongoose = require('mongoose');
var app = express();
var User = require('./model');

//Docker sets up the service name as configured in docker-compose as the hostname

// use when starting application locally
let mongoUrlLocal = "mongodb://localhost:27017/users";
// use when starting application as docker container
let mongoUrlDocker = "mongodb://mongo-db:27017/users";


// mongoose.createConnection?
mongoose.connect(mongoUrlDocker, {
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
        res.send('hi');
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