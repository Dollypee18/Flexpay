import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 },
    );
  }

  // Mock: pretend we saved the user
  return NextResponse.json(
    { message: "Account created. Please sign in." },
    { status: 201 },
  );
}
