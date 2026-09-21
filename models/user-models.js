const async = require('async');
const conn = require('../config/dbconnection');
const mysql = require('mysql');
const debug = require('debug')('app:models:user-models');
const express = require('express');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const query = 'SELECT * FROM test.users;';
            return conn.query(query);
        } catch (err) {
            debug(err);
            return next(err);
        }
    }
}