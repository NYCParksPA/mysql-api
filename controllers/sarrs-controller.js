const { Request, Response } = require('express');
const express = require('express');
const app = express();

const createError   = require('http-errors');
// const { trim } = require('lodash');
// const formidable = require('formidable');

const nanoid = require('nanoid');
// const { contractLookup, getAllRecords, _getAllContracts } = require('../models/Sarrs');

// const sarrsModel = require('../models/Sarrs');
// const xx = require('../controllers/fileServices-controller');
// const { create } = require('archiver');
// const { createNewCBG } = require('./cbg-main');

// const fileModules = require('../config/module_directories.json');
// // const { timeStamp } = require('console');
// const baseDirectory = fileModules['base_directory'];
// const sarrsFileModule = fileModules['sarrs'];


sarrsCtrl = {
    getAttachment: async (req, res, next) => {
        try {
            return res.json({ message: 'Attachment retrieved successfully', timestamp: new Date().toISOString() });
        } catch (err) {
            next(err);
        }
    },
    postAttachment: async (req, res, next) => {
        try {
            console.log(req.headers)
            console.log('body:',req.body);
            console.log('files:',req.files);

            if (!req.files) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { id } = req.params;
            const { name } = req.body;

            console.log("postAttachment:", { id, name, file: req.files });

            return res.json({ message: 'Attachment uploaded successfully', file: req.file, timestamp: new Date().toISOString() });
        } catch (err) {
            console.log("ERR:", err);
            next(err);
        }
    },
    putAttachment: async (req, res, next) => {
        try {
            return res.json({ message: 'Attachment updated successfully', timestamp: new Date().toISOString() });
        } catch (err) {
            next(err);
        }
    },

    deleteAttachment: async (req, res, next) => {
        try {
            return res.json({ message: 'Attachment deleted successfully', timestamp: new Date().toISOString() });
        } catch (err) {
            next(err);
        }
    },

    saveRecord: async (req, res, next) => {
        console.log("saveRecord[body]", req.body);
        return next();
        // res.json({ message:'Record saved successfully', timestamp:new Date().toISOString(), id: Math.trunc(Math.random() * 100) });
    },
    
    updateAttachmentRecord: async (req, res, next) => {
        console.log("updateAttachmentRecord:", req.body);
        res.json({ message:'Attachment record updated successfully', timestamp:new Date().toISOString(), id: Math.trunc(Math.random() * 100) });
    }
};

module.exports = { sarrsCtrl };