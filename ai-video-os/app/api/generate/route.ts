import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    prompt?: string;
    style?: string;
  };

  const prompt = (body.prompt ?? "").trim();

  await new Promise((r) => setTimeout(r, 450));

  if (!prompt) {
    return NextResponse.json(
      { ok: false, error: "Missing prompt" },
      { status: 400 },
    );
  }

  if (/\bfail\b|\berror\b/i.test(prompt)) {
    return NextResponse.json(
      { ok: false, error: "Simulated generation failure" },
      { status: 500 },
    );
  }

  // Lightweight variability for perceived realism.
  if (Math.random() < 0.08) {
    return NextResponse.json(
      { ok: false, error: "Temporary capacity issue" },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, accepted: true, style: body.style ?? null });
}
