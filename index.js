const express = require('express');

const app = express();

const path = require('path');
const PORT = 3000;

//Set path for static files.
app.use(express.static('uploads'));

app.set('view engine', 'ejs');

const upload = require('./controllers/multerUploading');

//Mongoose Connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vishalkharde:Vishal123@cluster0.a0gaffb.mongodb.net/', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000
    }).then(() => {
    console.log('MongoDB Connected')
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


// Middleware to serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

const BlogModel = require('./models/BlogModel');

//Import body-parser middleware
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

//Import and use cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Middleware for session management
const sessionMiddleware = require('./controllers/sessionManage');
// app.use(sessionMiddleware());

//Import Routers
const SignUpRouter = require('./routes/SignUp');
const SignInRouter = require('./routes/SignIn');
const AddBlogRouter = require('./routes/AddBlog');



//Use Routers
app.use('/signup', SignUpRouter);
app.use('/signin', SignInRouter);
app.use('/addBlog', AddBlogRouter);

app.get('/', sessionMiddleware, async (req, res) => {
    const allBlogs = await BlogModel.find({});
    //console.log(allBlogs);
    res.render('home', { allBlogs });
});

app.get('/testing', (req, res) => {
    res.render('fileUpload');
});

app.post('/testing_submitted', upload.single('profilePicture'), (req, res, next) => {
    console.log(req.file);
    res.send('OK');
});


app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
})