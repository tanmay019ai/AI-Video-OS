import { NextResponse } from "next/server";

export async function POST() {
  await new Promise((r) => setTimeout(r, 150));

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "aio_session",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
