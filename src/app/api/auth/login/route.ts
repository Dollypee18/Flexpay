import { NextRequest, NextResponse } from "next/server";

const MOCK_USERS = [
  {
    id: "user_1",
    name: "Ada Okafor",
    email: "ada@example.com",
    password: "password123",
    role: "freelancer" as const,
    kycStatus: "approved" as const,
    walletBalance: 4250.0,
  },
  {
    id: "user_admin",
    name: "Admin User",
    email: "admin@flexpay.io",
    password: "admin123",
    role: "admin" as const,
    kycStatus: "approved" as const,
    walletBalance: 0,
  },
];

// In-memory store for registered users
export const registeredUsers: {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "freelancer";
  kycStatus: "pending";
  walletBalance: number;
}[] = [];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  // Check mock users first, then registered users
  const allUsers = [...MOCK_USERS, ...registeredUsers];
  const user = allUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const token = Buffer.from(
    JSON.stringify({ id: user.id, role: user.role }),
  ).toString("base64");

  const { password: _, ...safeUser } = user;

  return NextResponse.json({ token, user: safeUser });
}
