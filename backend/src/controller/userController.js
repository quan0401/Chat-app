const ChatRoom = require("../models/ChatRoomModel");
const User = require("../models/UserModel");
const messages = require("../seeder/message");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateAuthToken } = require("../utils/jwt");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    const { name, password, email: userEmail } = req.body;
    if (!name || !password)
      return res.status(400).send({
        EC: 1,
        message: "All fields are required",
      });
    const email = userEmail || null;
    const query = [{ name }];
    if (email !== null) query.push({ email });

    const userExisted = await User.findOne({ $or: query });

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
    // const cookieParams = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // };
    // res.cookie("access_token", generateAuthToken(user), cookieParams);
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
    const { name, password, doNotLogout } = req.body;
    const email = req.body.email || "";
    if ((!name && !email) || !password) res.status(400).send("Missing fields");

    const user = await User.findOne({ $or: [{ email }, { name }] })
      .select("-__v ")
      // -------this not work
      // .populate({
      //   path: "chatRooms",
      //   populate: {
      //     path: "members",
      //     model: "User",
      //   },
      //   populate: {
      //     path: "messages",
      //     model: "Message",
      //     populate: {
      //       path: "owner",
      //       model: "User",
      //     },
      //     options: { limit: 5 },
      //   },
      // })
      // -------this works
      .populate({
        path: "chatRooms",
        populate: {
          path: "members",
          model: "User",
          select: "-__v -password -chatRooms",
        },
      })
      .populate({
        path: "chatRooms",
        select: "-__v",
        populate: [
          {
            path: "messages",
            model: "Message",
            select: "-__v",
            populate: {
              path: "owner",
              model: "User",
              select: "-__v -password -chatRooms",
            },
          },
          {
            path: "lastMessage",
            model: "Message",
            select: "-__v",
            populate: {
              path: "owner",
              model: "User",
              select: "name avatar",
            },
          },
        ],
      })
      // -------This works
      // .populate({
      //   path: "chatRooms",
      //   populate: [
      //     {
      //       path: "members",
      //       model: "User",
      //     },
      //     {
      //       path: "messages",
      //       model: "Message",
      //       populate: {
      //         path: "owner",
      //         model: "User",
      //       },
      //       options: { limit: 5 },
      //     },
      //   ],
      // })
      // .populate({
      //   path: "chatRooms",
      //   populate: [
      //     {
      //       path: "lastMessage",
      //       model: "Message",
      //     },
      //     {
      //       path: "members",
      //       model: "User",
      //       options: {
      //         limit: 5,
      //       },
      //     },
      //   ],
      // })
      .orFail();

    if (!comparePassword(password, user?.password ? user.password : ""))
      return res.status(400).send({ EC: 0, message: "Wrong credentials" });

    const userData = JSON.parse(JSON.stringify(user));
    const { chatRooms } = userData;
    delete userData.password;
    delete userData.chatRooms;

    const cookieParams = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    if (doNotLogout) {
      userData.doNotLogout = true;
      cookieParams["maxAge"] = 60 * 60 * 1000;
    } else userData.doNotLogout = false;

    res.cookie("access_token", generateAuthToken(userData), cookieParams);

    return res.status(200).send({
      EC: 0,
      message: "Logined",
      data: {
        user: userData,
        chatRooms,
      },
    });
  } catch (error) {
    next(error);
  }
};
const userTest = (req, res, next) => {
  try {
    console.log(req.user);
    return res.status(200).send(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, userTest };
