const express = require("express");
const router = express.Router();
const { getAllTables, getTable, createTable, updateTable, deleteTable } = require('../controllers/tables.controller.js');


router.get('/', getAllTables);


router.get("/:id", getTable);


router.post("/", createTable);


router.put("/:id", updateTable);


router.delete("/:id", deleteTable);


module.exports = router;


