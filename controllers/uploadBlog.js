const multer = require('multer');

const path = require('path');
const fs = require('fs');
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = `./uploads/blogs/${req.cookies.BlogApplication.name}`;
        
        // Check if directory exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
    
        cb(null, uploadPath);
    },
    
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
*/
const storage = multer.memoryStorage();
const upload = multer({ storage });
// const upload = multer( { storage: storage} );

module.exports = upload;