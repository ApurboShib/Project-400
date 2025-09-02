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

    const result = await query(
      `INSERT INTO users (email, password_hash, name, gender, phone) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, name, gender, phone`,
      [email, hashedPassword, name, gender, phone],
    )

    const newUser = result.rows[0]
    // No role, so just use id for token
    const token = generateToken(newUser.id, "student")

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
