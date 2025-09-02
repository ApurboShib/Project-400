import { NextResponse } from "next/server"
import { verifyToken, getUserById } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET(request) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Example: fetch basic info fields from users table
    const result = await query(
      `SELECT room_number, building, email, phone, geeta_attendance, prayer_attendance, due_amount, due_month FROM users WHERE id = $1`,
      [decoded.userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ basicInfo: result.rows[0] })
  } catch (error) {
    console.error("Basic info fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
