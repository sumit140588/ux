var mongo = require('./mongo.js');

this.login = function(userIdOrEmailOPhone, password, callback) {
    console.log("Login Authentication UserId" + userIdOrEmailOPhone + "  password " + password);
    //mongo.insertSampleDoc();
    mongo.listAll(function(docs) {
        console.log("AccountLogs");
        var docObject=null;
        docs.forEach(function(doc) {
            console.log(userIdOrEmailOPhone + " s " + doc.a);
            if (doc.a == userIdOrEmailOPhone) {
                console.log("success");
                docObject = doc;
            } else {
                console.log("Failure");
                
            }
        }

        );
        if(null===docObject){

        	callback("Invalid Login", null);
        }else{
        	callback(null,docObject);
        }
    });



}