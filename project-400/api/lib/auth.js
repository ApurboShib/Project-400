import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export function generateToken(userId, role) {
  // Use a secure secret in production!
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });
}
