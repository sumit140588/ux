var account = require('./account.js');
module.exports = function (app, path) {
    app.post('/login', function (req, res) {
        console.log("Got a Post request for /login " + path.join(__dirname + '/pages/login.html') + " kll     " + req.body.email);
        console.dir(req.body);
        //res.sendFile(path.join(__dirname + '/pages/home.html'));

        account.login(req.body.email, req.body.password, function (err, value) {
            if (err === null) {
                console.log("Error Object is null");
                sess = req.session;
                //In this we are assigning email to sess.email variable.
                //email comes from HTML page.
                sess.email = req.body.email;

                //res.sendFile(path.join(__dirname + '/pages/home.html'));
                res.redirect('home.html');
            } else {
                console.log("Value Object is not null");
                // res.render('login', { title: 'Login', message: 'Hello there!', page:'Login' });
                res.redirect('login.html');
            }
        });


    })
    app.post('/register', function (req, res) {
        console.log("Got a Post request for /Register " + req.body.email);
        //res.sendFile(path.join(__dirname + '/pages/login.html'));
        account.register(req.body, function (err, value) {
            if (err === null) {
                console.log("Error Object is null");
                sess = req.session;
                //In this we are assigning email to sess.email variable.
                //email comes from HTML page.
                sess.email = req.body.email;

                //res.sendFile(path.join(__dirname + '/pages/home.html'));
                res.redirect('home.html');
            } else {
                console.log("Value Object is  null");
                // res.render('login', { title: 'Login', message: 'Hello there!', page:'Login' });
                //res.redirect('register.html');
                var errors = [];
                errors.push("My First Error");
                errors.push("My First Error");
                console.log("errors " + errors);
                res.render('register', {
                    title: 'Register',
                    message: 'Hello there!',
                    errors: errors
                })
            }
        });
    })
    app.post('/logout', function (req, res) {
        console.log("Got a Post request for /logout " + req.body.email);
        //res.sendFile(path.join(__dirname + '/pages/login.html'));
        account.register(req.body, function (err, value) {
            sess = req.session.destroy();

            res.redirect('home.html');

        });
    })
    app.post('/register', function (req, res) {
        console.log("Got a GET request for /login " + path.join(__dirname + '/pages/register.html'));
        //res.sendFile(path.join(__dirname + '/pages/register.html'));
        // res.render('register', { title: 'Register', message: 'Hello there!' })

    })

}