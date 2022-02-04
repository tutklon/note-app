const noteCtrl = {};
const bodyParser = require('body-parser');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const moment = require('moment');
moment.updateLocale("tr", null);
/* GET REQUEST */
noteCtrl.getLastThreeNotes = async (req, res) => {
    await Note.find({user: req.user.authUser.userId }).sort({ createdAt: -1 }).limit(4).lean()
    .then((notes) => {
        const user = {
            _id: req.user.authUser.userId,
            username: req.user.authUser.username
        };
        res.render("index" , {notes , user});
    })
    .catch((err) => console.log(err));
};
noteCtrl.getAllNotes = async (req , res) => {
    await Note.find({ user: req.user.authUser.userId }).sort({createdAt: -1}).lean().then((notes) => {
        const user = {
            _id: req.user.authUser.userId,
            username: req.user.authUser.username
        };
        res.render("all-notes" , {notes , user})
    }).catch((err) => console.error(err));
};
noteCtrl.getAddNote = async (req, res) => {
    await res.render("add");
};
/* POST REQUEST */
noteCtrl.addNote = async (req , res) => {
    const {title , content} = req.body;
    if(!title) {
        return res.render("add" , {message: "Title cannot be blank."});
    }
    else {
        const note = new Note({
            title: title,
            content: content,
            date: moment().format("MMMM D dddd YYYY, h:mm:ss"),
            user: req.user.authUser.userId
        });
        note.save((err , note) => {
            if(err)
                console.error(err);
            else
                res.redirect("/in");
        });
    }
};

/* UPDATE REQUEST */
noteCtrl.getUpdate = async (req ,res ,next) => {
    await Note.findById(req.params.id).lean().then((note) =>  res.render("update" , {note})).catch((err) => console.error(err));
};

noteCtrl.updateNote = async (req , res) => {
    const {title , content} = req.body;
    if(!title) {
        return res.redirect('/update');
    }
    const note = await Note.findByIdAndUpdate(req.params.id , { title , content} , (err , note) => {
        if (err) {
            console.log(err);
        } else {
            note.save();
            res.redirect(`/in`);
        }
    }); 
};

/* DELETE REQUEST */
noteCtrl.deleteNote = async (req ,res, next) => {
    await Note.findByIdAndRemove(req.params.id , (err , note) => {
        if(err)
            console.log(err);
        else
            res.redirect("/in");
    });
};
module.exports = noteCtrl;
