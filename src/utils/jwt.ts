import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: any) => {
  const expiresIn = process.env.JWT_EXPIRES_IN as string;
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string) => {
  console.log(secret);

  try {
    return jwt.verify(token, secret, { algorithms: ["HS256"] });
  } catch (error: any) {
    return null;
  }
  // return jwt.verify(token, secret as string);
};
