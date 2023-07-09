const User = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

const registerUser = async (req, res, next) => {
  try {
    const { name, password, email: userEmail } = req.body;
    if (!name || !password)
      return res.status(400).send({
        EC: 1,
        message: "All fields are required",
      });
    const email = userEmail || "";
    const userExisted = await User.findOne({ $or: [{ name }, { email }] });
    if (userExisted)
      return res.status(400).send({
        EC: 1,
        message: "Name or Email is taken",
      });

    const user = new User({
      name: name,
      email,
      password: hashPassword(password),
    });
    await user.save();
    return res.status(201).send({
      EC: 0,
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email || "";
    if ((!name && !email) || !password) res.status(400).send("Missing fields");

    User.findOne({ $or: [{ email }, { name }] })
      .select("-__v ")
      .then((user) => {
        if (!comparePassword(password, user.password))
          return res.status(400).send({ EC: 0, message: "Wrong credentials" });

        const userData = JSON.parse(JSON.stringify(user));
        delete userData.password;

        return res.status(200).send({
          EC: 0,
          message: "Logined",
          data: {
            user: userData,
          },
        });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
