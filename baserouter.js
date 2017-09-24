module.exports = function (app, path) {
    app.get('/', function (req, res) {
        console.log("Got a GET request for the homepage");
        res.render('home', {
            title: 'Hey',
            message: 'Hello there!'
        })
        // console.log(mongo.insertSampleDoc()); 
        //   console.log( mongo.sum(1,2)); 
        //res.sendFile(path.join(__dirname + '/pages/home.html'));
    })
    app.get('/setup', function (req, res) {

        console.log("Got a GET request for the homepage");
        res.render('index', {
            title: 'Hey',
            message: 'Hello there!'
        })
        //console.log(mongo.insertSampleDoc()); 
        // console.log( mongo.sum(1,2)); 
        //res.sendFile(path.join(__dirname + '/pages/home.html'));
    })
    app.get('/home.html', function (req, res) {
        console.log("Got a GET request for the homepage");
        // res.sendFile(path.join(__dirname + '/pages/home.html'));
        res.render('home', {
            title: 'MediaStore',
            message: 'Hello there!!',
            user: req.session.email
        })
    })



    // This responds a POST request for the homepage
    app.post('/', function (req, res) {
        console.log("Got a POST request for the homepage");
        res.send('Hello POST');
    })

    // This responds a GET request for the /list_user page.
    app.get('/list_user', function (req, res) {
        console.log("Got a GET request for /list_user");
        res.send('Page Listing');
    })

    app.get('/login.html', function (req, res) {
        sess = req.session;
        if (sess.email) {
            res.redirect('home.html');
        }
        console.log("Got a GET request for /login " + path.join(__dirname + '/pages/login.html'));

        //res.sendFile(path.join(__dirname + '/pages/login.html'));
        res.render('login', {
            title: 'Login',
            message: 'Hello there!',
            page: 'Login'
        })


    })
    app.get('/register.html', function (req, res) {
        console.log("Got a GET request for /login " + path.join(__dirname + '/pages/register.html'));
        //res.sendFile(path.join(__dirname + '/pages/register.html'));
        res.render('register', {
            title: 'Register',
            message: 'Hello there!'
        })

    })
    app.get('/single-product.html', function (req, res) {
        console.log("Got a GET request for /login " + path.join(__dirname + '/pages/register.html'));
        res.sendFile(path.join(__dirname + '/pages/single-product.html'));

    })
    app.get('/product.html', function (req, res) {
        console.log("Got a GET request for /login " + path.join(__dirname + '/pages/register.html'));
        // res.sendFile(path.join(__dirname + '/pages/product.html'));
        res.render('product', {
            title: 'Register',
            message: 'Hello there!'
        })

    })
    app.get('/cart.html', function (req, res) {
        console.log("Got a GET request for /login " + path.join(__dirname + '/pages/register.html'));
        res.sendFile(path.join(__dirname + '/pages/cart.html'));

    })
    // This responds a GET request for abcd, abxcd, ab123cd, and so on
    app.get('/ab*cd', function (req, res) {
        console.log("Got a GET request for /ab*cd");
        res.send('Page Pattern Match');
    })

}