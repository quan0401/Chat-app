const User = require("../models/UserModel");
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

    let user = await User.findOne({ $or: [{ email }, { name }] })
      .select("-__v")
      .orFail();

    if (!comparePassword(password, user?.password ? user.password : ""))
      return res.status(400).send({ EC: 0, message: "Wrong credentials" });

    const userData = JSON.parse(JSON.stringify(user));

    user = await user.populate({
      path: "chatRooms",
      model: "ChatRoom",
      populate: [
        {
          path: "members",
          model: "User",
          select: "-password",
        },
        {
          path: "messages",
          model: "Message",
          populate: {
            path: "owner",
            model: "User",
          },
        },
        {
          path: "lastMessage",
          model: "Message",
          populate: {
            path: "owner",
            model: "User",
          },
        },
      ],
    });

    const { chatRooms } = user;
    delete userData.password;

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

// const getUserAndChatRoomData = async (req, res, next) => {
//   try {
//     const { _id: userId } = req.user;
//     if (!userId) res.status(400).send("Missing userId");

//     const user = await User.findById(userId)
//       .select("-__v ")
//       .populate({
//         path: "chatRooms",
//         populate: {
//           path: "members",
//           model: "User",
//           select: "-__v -password -chatRooms",
//         },
//       })
//       .populate({
//         path: "chatRooms",
//         select: "-__v",
//         populate: [
//           {
//             path: "messages",
//             model: "Message",
//             select: "-__v",
//             populate: {
//               path: "owner",
//               model: "User",
//               select: "-__v -password -chatRooms",
//             },
//           },
//           {
//             path: "lastMessage",
//             model: "Message",
//             select: "-__v",
//             populate: {
//               path: "owner",
//               model: "User",
//               select: "name avatar",
//             },
//           },
//         ],
//       })
//       .orFail();

//     const userData = JSON.parse(JSON.stringify(user));
//     const { chatRooms } = userData;
//     delete userData.password;
//     delete userData.chatRooms;

//     return res.status(200).send({
//       EC: 0,
//       message: "ok",
//       data: {
//         user: userData,
//         chatRooms,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getUserAndChatRoomData = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    if (!userId) res.status(400).send("Missing userId");

    let user = await User.findById(userId).select("-__v -password").orFail();

    const userData = JSON.parse(JSON.stringify(user));

    user = await user.populate({
      path: "chatRooms",
      model: "ChatRoom",
      populate: [
        {
          path: "members",
          model: "User",
          select: "-password",
        },
        {
          path: "messages",
          model: "Message",
          populate: {
            path: "owner",
            model: "User",
          },
        },
        {
          path: "lastMessage",
          model: "Message",
          populate: {
            path: "owner",
            model: "User",
          },
        },
      ],
    });

    const { chatRooms } = user;

    return res.status(200).send({
      EC: 0,
      message: "ok",
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

module.exports = { registerUser, loginUser, userTest, getUserAndChatRoomData };
