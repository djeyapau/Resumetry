var jquery = require("jquery");
var express = require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var app = express();
var mongojs = require('mongojs');
var db = mongojs('resume', ['resume']);
var db1 = mongojs('logging', ['logging']);
var bodyParser = require('body-parser');


/* var smtpTransport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: "dhajey",
        pass: "**********"
    }
})); */

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/resume', function (req, res) {
	console.log("Server - get - find all")

	db.resume.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/resume', function (req, res) {
	console.log(req.body)
	console.log("server - post")
	db.resume.insert(req.body, function (err, doc) {
		res.json(doc);
		//db.resume.insert( {
		//"name" : "M",
		//"email" : "A",
		//"phone" : "R",
		//"address" : "D",
		//"company" : "U"
		//},function(err,doc){
		//res.json(doc);
	});
});

app.delete ('/resume/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.resume.remove({
		_id: mongojs.ObjectId(id)
	}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/resume/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	console.log("server - get - findone")

	db.resume.findOne({
		_id: mongojs.ObjectId(id)
	}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/resume/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.resume.findAndModify({
		query: {
			_id: mongojs.ObjectId(id)
		},
		update: {
			$set: {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				gender: req.body.gender,
				birthday: req.body.birthday
			}
		},
		new: true
	}, function (err, doc) {
		res.json(doc);
	});
});

/* app.get('/register',function(req,res){
	res.sendFile(__dirname + '/public/create/register.html');
    var mailOptions={
		from: "dhajey@gmail.com",
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
		 console.log(response.response.toString());
         console.log("Message sent: " + response.message);
         res.end("sent");
         }
});
}); */

app.get('/logging', function (req, res) {
	console.log("Server - get - find all - logging")

	db1.logging.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/logging', function (req, res) {
	console.log(req.body)
	console.log("server - post - logging")
	db1.logging.insert(req.body, function (err, doc) {
		res.json(doc);	
		});
});

app.delete('/logging', function (req, res) {
	console.log(req.body)
	console.log("server - delete - db")
	db1.logging.remove(req.body, function (err, doc) {
		res.json(doc);
		
	});
});

app.listen(3000);
console.log("Server running on port 3000");