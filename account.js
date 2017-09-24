var mongo = require('./mongo.js');

this.login = function(userIdOrEmailOPhone, password, callback) {
    console.log("Login Authentication UserId" + userIdOrEmailOPhone + "  password " + password);
    //mongo.insertSampleDoc();
    mongo.listAll(function(docs) {
        console.log("AccountLogs");
        var docObject = null;
        if (null == docs) {
            callback("Unable to Connect DB right now", null);
        } else {
            docs.forEach(function(doc) {
                console.log(userIdOrEmailOPhone + " s " + doc.a);
                if (doc.email == userIdOrEmailOPhone) {
                    console.log("success");
                    docObject = doc;
                    // this.exit=true;
                } else {
                    // console.log("Failure");

                }

            });
            if (null === docObject) {

                callback("Invalid Login", null);
            } else {
                callback(null, docObject);
            }
        }
    });
};

this.register = function(body, callback) {
    console.log("Account.Register " + body);
    var query={email: body.email};

    mongo.find("documents", query, function(error, result) {
        if (result) {
            callback("User Already registered. ", null);
        } else {
            console.log("In Else part now will insert doc");
            data = {firstName:body.firstName,lastName:body.lastName,email:body.email,telephone:body.telephone,password:body.password,address:[{
                company:body.company,
                address1:body.address-1,
                address2:body.address-2,
                city:body.city,
                zipCode:body.postcode,
                country:body.country,
                region:body.region                
            }]
                
            };
           mongo.insertSingleDoc("documents",data,function(error,result){
                console.log("Account.Js Register Callaback");
                callback(null, "User Registered");
            });
        }

    });


};