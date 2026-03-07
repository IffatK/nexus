const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1000;

export async function handleChat(req, corsHeaders) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured on the server." },
      { status: 500, headers: corsHeaders }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: corsHeaders }
    );
  }

  const { system, messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      { error: "messages array is required." },
      { status: 400, headers: corsHeaders }
    );
  }

  const sanitisedMessages = messages.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content ?? ""),
  }));

  try {
    const anthropicRes = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        ...(system ? { system } : {}),
        messages: sanitisedMessages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      return Response.json(
        { error: data?.error?.message ?? "Anthropic API error", details: data },
        { status: anthropicRes.status, headers: corsHeaders }
      );
    }

    return Response.json(data, { headers: corsHeaders });

  } catch (error) {
    console.error("[handleChat] Failed to reach Anthropic API:", error);
    return Response.json(
      { error: "Failed to reach Anthropic API." },
      { status: 502, headers: corsHeaders }
    );
  }
}