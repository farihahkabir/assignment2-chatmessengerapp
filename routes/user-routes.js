module.exports = function(app){
    var user = require('./../controllers/user-controllers.js');
    
    app.get('/', user.new);
    
    app.post('/user/create', user.create);
    
    //to check if user is created
    app.get('/user/list', user.list);
    app.get('/user/:userID', user.userID);
}