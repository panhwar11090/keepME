const express = require('express');
const auth = require('../middleware/auth');
const noteRouter = express.Router();
const {getNotes,deleteNote,updateNote,createNote} = require('../controllers/noteController')

noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,createNote);

noteRouter.put("/:id",auth,updateNote);

noteRouter.delete("/:id",auth, deleteNote);

module.exports = noteRouter;
