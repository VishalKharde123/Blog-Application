const express = require('express');

const router = express.Router();

const UserModel = require('../models/UserModel');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const path = require('path');

const upload = require('../controllers/multerUploading');

router.get('/', (req, res)=>{
    res.render('signup');
});

router.post('/submit_sign_up', upload.single('profilePicture'), async (req, res)=>{
    //console.log(req.body);
    var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
    //console.log("Hash = " + hashedPassword)
    //const hashFor1234 = "$2b$10$7djFSpKPAgmKvSXmOPaCfOf1AB121siH1M4.kxFU2U/OJJ4ORhcji";
    // bcrypt.compare(req.body.password, hashFor1234, (err, result)=>{
        // })
    //     console.log(result);
    await UserModel.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword
    });
    res.render("tempRedirect");
});

module.exports = router;