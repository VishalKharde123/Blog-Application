// const express = require('express');
// const cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const navJS = require('../public/js/navbarJS');

function sessionMiddleware(req, res, next) {
    if(!req.cookies.BlogApplication)
    {
            return res.send(`<html>
          <head>
            <title>My Node.js App</title>
          </head>
          <body>
            <h1>Session Expired!</h1>
            <p><a href="/signin">Click here to login</a></p>
          </body>
        </html>`);
    }
    // else
    // {
    //     navJS();
    // }
    next();
}

module.exports = sessionMiddleware;