import jwt from "jsonwebtoken";

// CREATE TOKEN
export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

// VERIFY TOKEN
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
