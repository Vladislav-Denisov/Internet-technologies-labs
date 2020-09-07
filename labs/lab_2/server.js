const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongojs = require('mongojs');
const database = mongojs('NewDB');

const app = express();
app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({extended: false});
var path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(request, response){
    database.collection('bike-locations').find(function (error, loc) {
        database.collection('bike-catalog').find(function (err, data) {
            response.render('index', {
                bikes: data,
                locations: loc
            });
        });
    });

});

app.get('/activation/:id', urlencodedParser, function (req, res) {
    database.collection('bike-locations').find(function (err, loc) {
            res.render('activation', {
                locations: loc,
                parameter: '-'
            });
    });
});

app.post('/activation/:id', urlencodedParser, function (req, res) {
        db.collection('bike').findOne({_id: ObjectID(req.params.id) }, function (err, doc) {
            if (doc === null) {
                database.collection('bike-locations').find(function (err, loc) {
                    res.render('activation', {
                        locations: loc,
                        parameter: "error",
                        info: "заказ не найден в системе."
                    });
                });
                return;
            }
            active = req.body;
            if (active.active == 'Активировать') {
                if (doc.status != 'Non-activated') {
                    database.collection('bike-locations').find(function (err, loc) {
                        res.render('activation', {
                            locations: loc,
                            parameter: "error",
                            info: "заказ уже активирован или завершен."
                        });
                    });
                } else {
                    db.collection('bike').updateOne({_id: doc._id}, {$set: {status: 'Activated'}});
                    start_time = new Date().getTime();
                    db.collection('bike').updateOne({_id: doc._id}, {$set: {start_time: start_time}});
                    database.collection('bike-locations').find(function (err, loc) {
                        res.render('activation', {
                            locations: loc,
                            parameter: "active"
                        });
                    });
                }
            } else {
                if (doc.status != 'Completed') {
                    db.collection('bike').updateOne({_id: doc._id}, {$set: {status: 'Completed'}});
                    start_time = doc.start_time;
                    end_time = new Date().getTime();
                    if (start_time == '-')
                        start_time = end_time;
                    db.collection('bike').updateOne({_id: doc._id}, {$set: {end_time: end_time, start_time: start_time}});
                    var total_time = Math.ceil(Math.abs(end_time - start_time) / (1000));

                    database.collection('bike-locations').find(function (err, loc) {
                        res.render('activation', {
                            locations: loc,
                            parameter: "complete",
                            total: total_time
                        });
                    });
                } else {

                    database.collection('bike-locations').find(function (err, loc) {
                        res.render('activation', {
                            locations: loc,
                            parameter: "error",
                            info: "заказ уже завершен."
                        });
                    });
                }
            }
        });
});


app.post('/order', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    database.collection('bike-catalog').findOne( { bike_cost: req.body.price, bike_name: req.body.nbike}, function(err, doc) {
        database.collection('bike-locations').findOne( { location: req.body.select}, function(error, mycheck)
        {
            if (doc) {
                if (mycheck) {
                    var bike = {
                        select: req.body.select,
                        name: req.body.uname,
                        datetime: req.body.datetime,
                        mobile: req.body.mobile,
                        bike: req.body.nbike,
                        price: req.body.price,
                        start_time: '-',
                        end_time: '-',
                        status: "Non-activated"
                    }
                    db.collection('bike').insertOne(bike, function (err, result) {
                        if (err) return res.sendStatus(500);
                    });
                    var ref = "activation/" + bike._id;
                    res.send('Для активации перейдите по <a href=' + ref + '>ссылке</a> и нажмите "Активировать".' );
                } else {
                    res.send('Сервером были получены некорректные параметры.' );
                }
            } else {
                res.send('Сервером были получены некорректные параметры.' );
            }
        });
    });
});

MongoClient.connect('mongodb://localhost:27017/NewDB', { useUnifiedTopology: true }, function (err, database) {
    if (err) return console.log(err);
    db = database.db('NewDB');
    app.listen(3333, function () {
    	console.log('Сервер запущен на порту 3333. База данных на порту 27017.');
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    console.log("Сервер остановлен");
    process.exit();
});
