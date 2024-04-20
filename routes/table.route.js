const express = require("express");
const router = express.Router();
const { getAllTables, getTable, createTable, updateTable, deleteTable } = require('../controllers/tables.controller.js');

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: List of tables
 *     description: Get list of tables available at the event
 *     tag: 
 *      - Tables
 *     responses:
 *       200:
 *         description: Table list fetched successfully.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 *
 */
router.get('/', getAllTables);
router.get("/:id", getTable);

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Create  tables
 *     description: create a tables available at the event
 *     tag: 
 *      - Tables
 *     responses:
 *       200:
 *         description: Table list fetched successfully.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 *
 */
router.post("/", createTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);


module.exports = router;