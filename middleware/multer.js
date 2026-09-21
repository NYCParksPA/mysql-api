const multer = require('multer');
const fs = require('node:fs');
const path = require('node:path');
const nanoid = require('nanoid');

const express = require('express');
const app = express();

const baseDirectory = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('>>>> devMode:', app.locals);
        console.log('>>>> locals:', req.app.locals);
        console.log('>>>> module:', req.body);

        try {
            const { directory } = req.body;
            const dirPath = path.join(baseDirectory, directory || '');

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            cb(null, dirPath);
        } catch (err) {
            console.error('Destination: Error creating directory:', err);
            cb(err);
        }
    },
    filename: function (req, file, cb) {
        console.log("filename:", req.body.id);
        console.log('%cmulter.filename.1', file);

        const uniqueSuffix = nanoid.nanoid();
        const fileExtension = path.extname(file.originalname);

        console.log('multer.filename.2', uniqueSuffix, file.originalname, fileExtension);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


const handleUpload = (req,res,next) => {
    const uploader = multer({ storage: storage }).fields([{ name: 'files', maxCount: 1 }]);

    uploader(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: 'Multer error occurred during file upload', details: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.error('Unknown error:', err);
            return res.status(500).json({ error: 'Unknown error occurred during file upload', details: err.message });
        }
    
        const { id,name } = req.params;
        const { files } = req.files;

        next();
        // return res.json({ message: 'File uploaded successfully', timestamp: new Date().toISOString(), files, id, name });
    });
}

module.exports = { handleUpload };