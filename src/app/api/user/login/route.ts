import jwt from "jsonwebtoken";

import { originalDB, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  readDB();
  const body = await request.json();
  const { username, password } = body;
  const user = originalDB.users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return NextResponse.json({
      ok: false,
      message: "Username or Password is incorrect",
    },{status:400})
  }
  
    const payload = jwt.sign(user.username, process.env.JWT_SECRET || "This is a secret", {
      expiresIn: "8h",
    });

  return NextResponse.json({ ok: true, token: payload });
};
