var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://garaaj:onlyreadaccess@garaaj-shard-00-00-54jvk.mongodb.net:27017,garaaj-shard-00-01-54jvk.mongodb.net:27017,garaaj-shard-00-02-54jvk.mongodb.net:27017/myapp?ssl=true&replicaSet=garaaj-shard-0&authSource=admin';
//var url = 'mongodb://localhost:27017';
// Use connect method to connect to the server
//module.exports = function() { 
//this.sum = function(a,b) { return a+b };
//  this.multiply = function(a,b) { return a*b };

//};

this.connection = function() {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        // db.close();
        // insertDocuments(db, function() {
        //  db.close();
        //});
        //findDocuments(db, function() {
        //  db.close();
        //});

    });
    return db;
}
this.sum = function(a, b) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("For Finding Connected successfully to server");
        findDocuments(db, a, function() {
            db.close();
        });
    });
    return a + b
};

this.insertSampleDoc = function() {
    console.log("URL " + url);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("For Sample Insert Connected successfully to server");
        insertDocuments(db, function() {
            db.close();
        });
    });
}
insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

findDocuments = function(db, id, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records for " + id);
        console.log(docs)
        callback(docs);
    });
};
updateDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
}
listDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records for ");
        console.log(docs)
        callback(docs);
    });
}
this.listAll = function(callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("For Sample Insert Connected successfully to server");
        //listDocument(db, function(docs) {
           // console.log(docs[0].a);
         //   db.close();
       // }
       listDocument(db,callback);
       //);
    });
}