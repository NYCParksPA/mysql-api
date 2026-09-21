const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const multer = require('multer');
const { sarrsCtrl } = require('../controllers/sarrs-controller');
// const jwt         = require('../middleware/jwtgenerator');
// const wlogger     = require('../middleware/winston_log_v2.js');
// const { help } = require('../middleware/winston_log');

const { handleUpload } = require('../middleware/multer')

router.route('/').all((req, res, next) => {
    console.log('SARRS route');
    next();
});

router.post("/attachment/:id?", handleUpload, sarrsCtrl.postAttachment);

router.post('/saveRecord', 
    handleUpload,
    sarrsCtrl.saveRecord,
    sarrsCtrl.updateAttachmentRecord
);

module.exports = router;