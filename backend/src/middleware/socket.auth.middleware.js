import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      ?.find((row) => row.startWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token Provided"));
    }

    const decode = jwt.verify(token, ENV.JWT_SECRET);
    if (!decode) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }
    socket.user = user;
    socket.userId = user._id.toString();
    next();
  } catch (error) {}
};
