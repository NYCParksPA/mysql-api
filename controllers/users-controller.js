const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userStatement = require('../models/user-models');

const ctr = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userStatement.getUsers(req, res, next);
            // console.log(">>", users);

            res.json(users);
        } catch (err) {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = ctr;