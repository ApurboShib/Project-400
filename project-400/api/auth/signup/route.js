import { NextResponse } from "next/server"
import { hashPassword, generateToken } from "../../lib/auth"
import { query } from "../../lib/db"

export async function POST(request) {
  try {
    const { email, password, name, gender, phone } = await request.json()

    if (!email || !password || !name || !gender) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    // Insert with full_name and role
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, gender, phone, role) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, email, full_name, gender, phone, role`,
      [email, hashedPassword, name, gender, phone, "student"],
    )

    const newUser = result.rows[0]
    const token = generateToken(newUser.id, newUser.role)

    const response = NextResponse.json({
      message: "Registration successful",
      user: newUser,
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
