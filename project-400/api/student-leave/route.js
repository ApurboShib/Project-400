import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    let queryText, params;

    if (decoded.role === "admin" || decoded.role === "manager") {
      queryText = `
        SELECT lr.*, u.full_name, u.student_id, u.room_number,
               approver.full_name as approved_by_name
        FROM leave_requests lr
        JOIN users u ON lr.user_id = u.id
        LEFT JOIN users approver ON lr.approved_by = approver.id
        ORDER BY lr.created_at DESC
      `;
      params = [];
    } else {
      queryText = `
        SELECT lr.*, approver.full_name as approved_by_name
        FROM leave_requests lr
        LEFT JOIN users approver ON lr.approved_by = approver.id
        WHERE lr.user_id = $1
        ORDER BY lr.created_at DESC
      `;
      params = [decoded.userId];
    }

    const result = await query(queryText, params);
    return NextResponse.json({ leaveRequests: result.rows });
  } catch (error) {
    console.error("Leave requests fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { start_date, end_date, reason } = await request.json();

    if (!start_date || !end_date) {
      return NextResponse.json({ error: "Start date and end date are required" }, { status: 400 });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const result = await query(
      `INSERT INTO leave_requests (user_id, start_date, end_date, reason, total_days)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [decoded.userId, start_date, end_date, reason, totalDays],
    );

    return NextResponse.json({ leaveRequest: result.rows[0] });
  } catch (error) {
    console.error("Leave request creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
