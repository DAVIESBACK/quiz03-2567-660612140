import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Chanachai Chamnanmor",
    studentId: "660612140",
  });
};
