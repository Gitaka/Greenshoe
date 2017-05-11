var index = require('../controllers/index.js');


module.exports = function(app){
	app.get('/test',index.welcome);
    app.post('/register',index.register);
    app.post('/authenticate',index.auth);
    app.get('/user',ensureAuthorized,index.getUser);

    app.get('/customers',ensureAuthorized,index.getCustomers);
    app.get('/debtReport',ensureAuthorized,index.getDebtReport);

    app.post('/searchCustomer',ensureAuthorized,index.searchCustomer);


}


/*
  request headers are intercepted and the authorize headers is extracted,
  If a bearer token exists in this header, that token is assigned to req.token in order to be used throughout the request, and the request can be continued by using next(). If a token does not exist, 
  you will get a 403 (Forbidden) response

*/
ensureAuthorized = function(req,res,next){
	var bearerToken;
	var bearerHeader = req.headers['authorization'];

	if(typeof bearerHeader !== 'undefined'){
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	}else{
 
        res.status(403).send("<h1>Forbidden Access</h1>");
	}
}