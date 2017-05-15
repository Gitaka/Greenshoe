var dateTime = require('node-datetime');
    shortId = require('shortid');
    pg = require('pg');
    jwt = require('jsonwebtoken');
    bcrypt = require('bcrypt-nodejs');

 
    //connection string to connect to the postgresql database
var connectionString = 'postgres://dev001:EV5gy2pQPDhC4H&fg3$5qzWL*9P4=D2K8ta9x&Qr2@51.140.33.76:6773/testdb';
//var connectionString = 'postgres://postgres:gitakamuchai@localhost:5432/greenshoe';
var client = new pg.Client(connectionString);
    client.connect();

exports.auth = function(req,res){
   var username = req.body.username;
       password = req.body.password;

       //check and verify user credentials

    var queryString = "SELECT * FROM tbl_users WHERE username='"+username+"'";
    var query = client.query(queryString);

        query.on("row",function(row,result){
        	result.addRow(row);
        });

        query.on("end",function(result){
          //if result is empty then user was not found
           if(result.rowCount > 0){
               for(var i in result.rows){
                      var hashedPass = result.rows[i].user_password;

                      //verify if password provided is correct
                      var verify = bcrypt.compareSync(password,hashedPass);

                      //if verify evaluates to true,go ahead and authenticate the user
                      if(verify){
                         //generate and sign the token using a secret and user details
                          var token = jwt.sign(result.rows[i],process.env.JWT_SECRET);
                          res.send({
                            'error':false,
                            'message':'login Successfull',
                            'data':result.rows,
                            'token':token,
                           
                          });
                      }else{
                          res.send({
                            'error':true,
                            'message':'Incorrect Password',                         
                        });
                      }

               } 
           }else{
              res.send({
                'error':true,
                'message':'User Not Found',
                'data':result.rows,
                'more':result.rowCount,
               
              }); 
           }        
       });

}

exports.register = function(req,res){
  //register a user, and insert their data
	var name = req.body.name;
	    password = req.body.password;
      created_at = dateTime.create().format('Y-m-d H:M:S');
      user_role = "roleB";

      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(password,salt);

    
     var queryString = "INSERT INTO tbl_users (user_role,username,user_password,created_at) VALUES('"+user_role+"','"+name+"','"+hash+"','"+created_at+"')";
         query = client.query(queryString);
         query.on("row",function(row,result){
            result.addRow(row);
          });

          query.on("end",function(result){
              res.send({
                'error':false,
                'message':'Registration Successfull',
               
              });
          });

};

exports.getUser = function(req,res){
  //returning user details, the extracting then from the token. 
	var token = req.token;
        info = jwt.verify(token,process.env.JWT_SECRET);
	    data = {
		    'name':info.username,
		    'role':info.user_role, 
		}; 



	res.json({
		'error':false,
		'message':'User Details',
		'data':data,
		
	});
}
exports.getCustomers = function(req,res){
  
     var query = client.query('SELECT * FROM tbl_profiles');
          query.on("row",function(row,result){
          	result.addRow(row);
          });

          query.on("end",function(result){
              res.send({
              	'error':false,
              	'message':'returning all customers',
              	'data':result.rows,
              });
          });
};


exports.getDebtReport = function(req,res){
     var query = client.query('SELECT * FROM tbl_due_listing');
          query.on("row",function(row,result){
          	result.addRow(row);
          });

          query.on("end",function(result){
              res.send({
                'data':result.rows,
              });
          });

};

exports.searchCustomer = function(req,res){
	var param = req.body.param;
	   
	    query = client.query("SELECT * FROM tbl_profiles WHERE national_id ='"+param+"' OR mobile_number='"+param+"'");
	    query.on("row",function(row,result){
          	result.addRow(row);
          });

          query.on("end",function(result){
          	if(result.rowCount > 0){
          	    res.send({
	              	'error':false,
	              	'message':'returning a Customer',
	              	'data':result.rows,
                });          		
          	}else{
          	    res.send({
	              	'error':true,
	              	'message':'Customer not found',
	              	'data':result.rowCount,
                });          		
          	}


          }); 
	
};

randomIntInc = (low,high)=>{
     return Math.floor(Math.random() * (high - low + 1) + low);
};