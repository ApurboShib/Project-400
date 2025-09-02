import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { query } from "./db.js";

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

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
  } catch (err) {
    return null;
  }
}

export async function getUserByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

export async function getUserById(id) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
