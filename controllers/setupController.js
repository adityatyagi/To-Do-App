var Todos = require('../models/todoModels')

module.exports = function(app) {

    app.get('/api/setupTodos', function(req, res) {

        // seed database
        var starterTodos = [{
                username: 'test',
                todo: 'Buy Milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Buy Gift',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Buy Keyboard',
                isDone: false,
                hasAttachment: false
            }
        ];

        // .create is a method that takes the array
        Todos.create(starterTodos, function(err, results) {
            res.send(results);
        });
    });
}