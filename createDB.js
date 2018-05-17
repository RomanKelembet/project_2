var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mcqueen");
var Car = require("./models/Car.js").Car;
var data = require("./data.js").data;
var async = require("async");
async.series([
    open,
    dropDB,
    createCars
], function(err){
    if(err) throw err;
    console.log("Ok");
    mongoose.connection.close()
});
function open(callback){
    mongoose.connection.on("open",callback)
}
function dropDB(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback)
}
function createCars(callback){
    async.each(data,function(carData,callback){
        var car = new Car(carData);
        car.save(callback)
    }, callback)
}
