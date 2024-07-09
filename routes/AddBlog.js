const express = require('express')

const router = express.Router();

const upload = require('../controllers/uploadBlog');

const BlogModel = require('../models/BlogModel');

const sessionMiddleware = require('../controllers/sessionManage');

router.get('/', sessionMiddleware, (req, res)=>{
    res.render('blogPage');
});

router.post('/add', upload.single('blogImg'),async (req, res, next) => {
    // console.log(req.file.path);
    //console.log(req.body);
    //console.log(req.cookies.BlogApplication.name);
    //console.log(req.file);
    //console.log(req.file.buffer);
    // var str = req.file.destination;
    // str = str.replace('./uploads','');

    data = {
        bufferImg: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype
    }
    src = `data:${data.contentType};base64,${data.bufferImg.toString('base64')}`;

    await BlogModel.create({
         title: req.body.title,
         desc: req.body.desc,
         imgBuffer: src,
         createdBy: req.cookies.BlogApplication.name,
         timeStamp: new Date()
     }
     );
    //console.log(src);
    return res.redirect('/');
});

module.exports = router;