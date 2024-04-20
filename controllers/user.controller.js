const UserModel  = require("../models/user.model");
const jwt = require('jsonwebtoken')


 const createUser = async (req, res) => {
  const { email, name, password, role, table } = req.body;

  const oldUser = await UserModel.findOne({ email });
  if (oldUser)
    return res.status(403).json({ error: "The email is already in use!" });

  const user = await UserModel.create({ email, password, name, role, table });

  res.json({ success: true, user });
};

 const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found!" });

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return res.status(403).json({ error: "Email/Password doesn't match!" });
  }

  //   user is there and password is cool
  const token = jwt.sign({ id: user._id.toString() }, "secret");

  res.json({
    success: true,
    token,
    profile: { name: user.name, role: user.role, email: user.email },
  });
};

const getAllUsers = async (req, res) => {
    const user = await UserModel.find({});
    if(!user) return res.status(404).json({message: 'No user is registered yet'})
    res.status(200).json({user})
}

const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await UserModel.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const privateResponse = async (req, res) => {
  res.json({ message: "Cool man you are in the private property!" });
};

 const adminResponse = async (req, res) => {
  res.json({ message: "Welcome boss I know you are our admin!" });
};

 const sendProfile = (req, res) => {
  res.json({
    profile: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};


module.exports = {
    sendProfile,
    adminResponse,
    privateResponse,
    signin,
    createUser,
    getAllUsers,
    getUser,
}