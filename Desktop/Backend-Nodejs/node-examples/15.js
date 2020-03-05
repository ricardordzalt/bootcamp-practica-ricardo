const http = require('http');
const express = require('express');
const routes = require('/routes');

const APP = express();

const SERVER = htpp.createServer(APP);

const users = [];

routes(APP, users);

SERVER.liten(4000);