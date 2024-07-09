const express = require('express');

const UserModel = require('../models/UserModel');

const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('signin');
});

router.post('/sign_in_submit',async (req, res)=>{
    //console.log(req.body);
    const foundRecord = await UserModel.findOne({'email': req.body.email});

    if(!foundRecord)
    {
        return res.send('User not exists');
    }
    else
    {
        var result = await bcrypt.compare(req.body.password, foundRecord.password);
        if(result)
        {
            const loginStatus = {
                name: foundRecord.fullname
            };
            res.cookie('BlogApplication', loginStatus, {maxAge: 60 * 10 * 1000});
            return res.redirect('/');
        }
        else
        {
            return res.send('Invalid password');
        }
    }

    //return res.send('OK');
});

module.exports = router;