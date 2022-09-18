/**
 * The endpoint of the express app
 * @module routes/app
 */
export {};
('use strict');

const express = require('express');
const AWS = require('aws-sdk');
const { logger } = require('../logger/winston');
const router = express.Router();

console.log(logger);

const access = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

router.get('/health', (req, res) => {
  logger.info('This is a test!');
  res.send({ status: 'working' });
});

module.exports = router;
