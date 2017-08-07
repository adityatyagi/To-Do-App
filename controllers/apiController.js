var Todos = require('../models/todoModels');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // handles all the % and other signs in the URL

    // Find By Username
    app.get('/api/todos/:uname', function(req, res) {
        Todos.find({ username: req.params.uname }, function(err, todos) {
            if (err) throw err;

            res.send(todos);
        });
    });

    // FInd by id
    app.get('/api/todo/:id', function(req, res) {
        Todos.findById({ _id: req.params.id }, function(err, todo) {
            if (err) throw err;
            res.send(todo);
        });
    });

    // Add / Update a todo of a particular username 
    app.post('/api/todo', function(req, res) {
        // UPDATE
        // this will look the http-request body, assume it is json, convert it into a object and then look for the property id
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function(err, todo) {
                if (err) throw err;
                res.send(todo);
            });
        }

        // Create new todo, by creating new model object and saving to mongo
        else {
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            // asving to mongoDB
            newTodo.save(function(err) {
                if (err) throw err;
                res.send('New Todo Creation: Success');
            });
        }
    });

    // Delete
    app.delete('/api/todo', function(req, res) {
        Todos.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send('Deletion Success');
        });
    });
}