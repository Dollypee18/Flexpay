import { NextRequest, NextResponse } from "next/server";
import { registeredUsers } from "../login/route";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );
  }

  // Check if email already exists
  const exists = registeredUsers.find((u) => u.email === email);
  if (exists) {
    return NextResponse.json(
      { message: "An account with this email already exists." },
      { status: 409 },
    );
  }

  // Save to in-memory store
  registeredUsers.push({
    id: `user_${Date.now()}`,
    name,
    email,
    password,
    role: "freelancer",
    kycStatus: "pending",
    walletBalance: 0,
  });

  return NextResponse.json(
    { message: "Account created. Please sign in." },
    { status: 201 },
  );
}
