/**
 * Edge Function: notify admin when a new row is inserted into public.users.
 * Deploy: supabase functions deploy notify-admin
 *
 * Secrets (Dashboard → Edge Functions → Secrets):
 *   RESEND_API_KEY   — API key from https://resend.com
 *   ADMIN_NOTIFY_EMAIL — inbox that receives alerts (defaults below)
 *   RESEND_FROM      — optional, e.g. "Registry <onboarding@resend.dev>"
 *
 * Database Webhook (Dashboard → Integrations → Database Webhooks):
 *   Table: public.users, Event: INSERT
 *   HTTP Request URL: https://<project-ref>.supabase.co/functions/v1/notify-admin
 *   Add header: Authorization: Bearer <anon or service role JWT per your security model>
 */

const RESEND_URL = "https://api.resend.com/emails";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const adminEmail = Deno.env.get("ADMIN_NOTIFY_EMAIL") ?? "admin@example.com";
  const from = Deno.env.get("RESEND_FROM") ?? "Registry <onboarding@resend.dev>";

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const record =
    (payload.record as Record<string, unknown> | undefined) ??
    ((payload.payload as Record<string, unknown> | undefined)?.record as Record<string, unknown> | undefined) ??
    (payload as Record<string, unknown>);

  const username = String(record?.username ?? record?.user_name ?? "unknown");
  const email = String(record?.email ?? "unknown");

  if (!resendKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Missing RESEND_API_KEY",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const html = `
    <p>A new user is pending approval in the registry.</p>
    <p><strong>Username:</strong> ${escapeHtml(username)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  `;

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [adminEmail],
      subject: "New user pending approval",
      html,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    return new Response(JSON.stringify({ ok: false, resend: text }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, resend: text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
