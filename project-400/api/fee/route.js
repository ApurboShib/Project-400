import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
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

    const { searchParams } = new URL(request.url)
    const userId = decoded.role === "admin" ? searchParams.get("userId") : decoded.userId

    const result = await query(
      `SELECT fr.*, u.full_name, u.student_id 
       FROM fee_records fr 
       JOIN users u ON fr.user_id = u.id 
       WHERE fr.user_id = $1 
       ORDER BY fr.year DESC, fr.month DESC`,
      [userId || decoded.userId],
    )

    return NextResponse.json({ fees: result.rows })
  } catch (error) {
    console.error("Fees fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { user_id, month, year, base_fee, deduction_amount, leave_days } = await request.json()

    const final_amount = base_fee - (deduction_amount || 0)

    const result = await query(
      `INSERT INTO fee_records (user_id, month, year, base_fee, deduction_amount, final_amount, leave_days)
       VALUES (৳1, ৳2, ৳3, ৳4, ৳5, ৳6, ৳7)
       RETURNING *`,
      [user_id, month, year, base_fee, deduction_amount || 0, final_amount, leave_days || 0],
    )

    return NextResponse.json({ fee: result.rows[0] })
  } catch (error) {
    console.error("Fee creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
