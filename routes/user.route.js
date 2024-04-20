const {
    adminResponse,
    createUser,
    privateResponse,
    sendProfile,
    signin,
    getAllUsers,
    getUser,
} = require("../controllers/user.controller");
const { newUserValidator } = require("../middleware/validator");
const UserModel = require("../models/user.model");
const { Router } = require("express");
const jwt = require('jsonwebtoken')

const router = Router();


const isAuth = async (req, res, next) => {
    try {
        const authorizationToken = req.headers.authorization;
        const token = authorizationToken?.split("Bearer ")[1];
        if (!token) return res.status(403).json({ error: "unauthorized access!" });

        const payload = jwt.verify(token, "secret");

        const user = await UserModel.findById(payload.id);
        if (!user) return res.status(403).json({ error: "unauthorized access!" });

        req.user = user;

        next();
    } catch (error) {
        if (error) {
            res.status(403).json({ error: "unauthorized access!" });
        } else {
            res.status(500).json({ error: "Something went wrong!" });
        }
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user.role === "admin") next();
    else res.status(403).json({ error: "Protected only for admin!" });
};

const isOwner = async (req, res, next) => {
    if (req.user.role === "owner") next();
    else res.status(403).json({ error: "Protected only for admin!" });
};

const isAdminAndUser = async (req, res, next) => {
    if (req.user.role === "owner" | req.user.role === "admin") next();
    else res.status(403).json({ error: "Protected only for admin!" });
};
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: users can sign up with their roles
 *     description: register a unique user
 *     tag: 
 *      - Register
 *     responses:
 *       201:
 *         description: Register user.
 *       500:
 *         description: Some server error
 *
 */
router.post("/signup", newUserValidator, createUser);



/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: users can sign in
 *     description: users can access the app functionalities
 *     tag: 
 *      - Register
 *     responses:
 *       201:
 *         description: Register user.
 *       500:
 *         description: Some server error
 *
 */
router.post("/signin", newUserValidator, signin);



/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: get user profile
 *     description: get the profile of a specific user
 *     tag: 
 *      - Register
 *     responses:
 *       201:
 *         description: Register user.
 *       500:
 *         description: Some server error
 *
 */
router.get("/profile", isAuth, sendProfile);
router.get("/private", isAuth, privateResponse);
router.get("/admin", isAuth, isAdmin, adminResponse);
/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: get all registered users
 *     description: get all users
 *     tag: 
 *      - User
 *     responses:
 *       201:
 *         description: Register user.
 *       500:
 *         description: Some server error
 *
 */
router.get("/",  getAllUsers);
router.get("/:id",  getUser);

module.exports = router;