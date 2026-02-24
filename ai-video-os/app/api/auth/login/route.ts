import { NextResponse } from "next/server";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginBody;
  const email = (body.email ?? "").trim().toLowerCase();

  await new Promise((r) => setTimeout(r, 350));

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email." },
      { status: 400 },
    );
  }

  // Mock session payload (demo only).
  const payload = Buffer.from(
    JSON.stringify({ email, iat: Date.now() }),
    "utf8",
  ).toString("base64url");

  const res = NextResponse.json({ ok: true, user: { email } });
  res.cookies.set({
    name: "aio_session",
    value: payload,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
