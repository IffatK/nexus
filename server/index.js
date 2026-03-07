import { handleChat } from "./routes/chat.js";

const PORT = process.env.PORT ?? 4000;
const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": CLIENT_URL,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

Bun.serve({
  port: PORT,

  async fetch(req) {
    const url = new URL(req.url);

    // Handle CORS preflight for all routes
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // ── Routes ──────────────────────────────────────────
    if (url.pathname === "/api/chat" && req.method === "POST") {
      return handleChat(req, CORS_HEADERS);
    }

    if (url.pathname === "/api/health" && req.method === "GET") {
      return Response.json(
        { status: "ok", timestamp: new Date().toISOString() },
        { headers: CORS_HEADERS }
      );
    }

    return Response.json(
      { error: "Route not found" },
      { status: 404, headers: CORS_HEADERS }
    );
  },

  error(err) {
    console.error("[Server Error]", err.message);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  },
});

console.log(`✅ Nexus Events server running on http://localhost:${PORT}`);

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn("⚠️  ANTHROPIC_API_KEY is not set — AI Assistant will not work");
}