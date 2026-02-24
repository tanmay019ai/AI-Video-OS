import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("aio_session")?.value;
  if (!session) return NextResponse.json({ ok: true, user: null });

  try {
    const json = Buffer.from(session, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as { email?: string };
    const email = (parsed.email ?? "").trim().toLowerCase();

    if (!email) return NextResponse.json({ ok: true, user: null });

    return NextResponse.json({ ok: true, user: { email } });
  } catch {
    return NextResponse.json({ ok: true, user: null });
  }
}
