const express = require("express");
const router = express.Router();
const { getAllTables, getTable, createTable, updateTable, deleteTable } = require('../controllers/tables.controller.js');

/**
 * @swagger
 * /api/tables:
 *   get:
 *      summary: List of tables
 *      description: Get list of tables available at the event
 *      tag: 
 *      - Tables
 *      responses:
 *          200:
 *              description: Table list fetched successfully.
 *          400:
 *              description: Bad request
 *          500:
 *              description: Some server error
 *
 */
router.get('/', getAllTables);

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *      summary: Get Table By ID
 *      description: Get details of a Table
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *               type: string
 *      tag: 
 *      - Tables
 *      responses:
 *          200:
 *              description: Table list fetched successfully.
 *          400:
 *              description: Bad request
 *          500:
 *              description: Some server error
 *
 */
router.get("/:id", getTable);


/**
 * @swagger
 * /api/tables:
 *   post:
 *      summary: Create Table
 *      description: create a table at the event
 *      parameters:
 *          - in: body
 *            name: createTable
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  alias:
 *                      type: string
 *                  capacity:
 *                      type: number
 *                  status: 
 *                      type: boolean
 *                  
 *              description: table ID
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

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *      summary: Edit table details
 *      description: Update details of a table
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *               type: string
 *      tag: 
 *      - Tables
 *      responses:
 *          200:
 *              description: Table list fetched successfully.
 *          400:
 *              description: Bad request
 *          500:
 *              description: Some server error
 *
 */
router.put("/:id", updateTable);


/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *      summary:Delete a table
 *      description: Delete a table by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *               type: string
 *      tag: 
 *      - Tables
 *      responses:
 *          200:
 *              description: Table list fetched successfully.
 *          400:
 *              description: Bad request
 *          500:
 *              description: Some server error
 *
 */
router.delete("/:id", deleteTable);


module.exports = router;


