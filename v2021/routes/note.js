var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('../models/Note');
// const jwtMiddleware  = require('express-jwt-middleware');
// const jwtCheck = jwtMiddleware(process.env.JWT_SECRET_KEY);
const {getAllNotes , getUpdate , addNote , deleteNote , updateNote , getAddNote , getLastThreeNotes} = require('../controller/noteController');
router.get('/in'  ,getLastThreeNotes);
router.get('/all-notes' , getAllNotes);
router.get('/add' , getAddNote);
router.post("/add" , addNote);
router.get("/view/:id" , getUpdate);
router.post("/view/:id/edit" , updateNote);
router.post("/remove/:id" , deleteNote);

module.exports = router;
