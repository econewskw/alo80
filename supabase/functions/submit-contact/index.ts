import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit settings: 5 submissions per hour per IP
const RATE_LIMIT = 5;
const WINDOW_HOURS = 1;

// Simple input validation
function validateInput(data: unknown): { valid: boolean; error?: string; data?: Record<string, string> } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { full_name, email, phone, company_name, message } = data as Record<string, unknown>;

  // Required fields
  if (!full_name || typeof full_name !== "string" || full_name.trim().length === 0) {
    return { valid: false, error: "Full name is required" };
  }
  if (full_name.length > 200) {
    return { valid: false, error: "Full name is too long (max 200 characters)" };
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Invalid email format" };
  }
  if (email.length > 320) {
    return { valid: false, error: "Email is too long (max 320 characters)" };
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  if (message.length > 5000) {
    return { valid: false, error: "Message is too long (max 5000 characters)" };
  }

  // Optional fields validation
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return { valid: false, error: "Invalid phone format" };
  }
  if (phone && (phone as string).length > 50) {
    return { valid: false, error: "Phone is too long (max 50 characters)" };
  }

  if (company_name !== undefined && company_name !== null && typeof company_name !== "string") {
    return { valid: false, error: "Invalid company name format" };
  }
  if (company_name && (company_name as string).length > 300) {
    return { valid: false, error: "Company name is too long (max 300 characters)" };
  }

  return {
    valid: true,
    data: {
      full_name: (full_name as string).trim(),
      email: (email as string).trim().toLowerCase(),
      phone: phone ? (phone as string).trim() : null,
      company_name: company_name ? (company_name as string).trim() : null,
      message: (message as string).trim(),
    } as Record<string, string>,
  };
}

// Hash IP for privacy (we don't need to store actual IPs)
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + "salt_for_rate_limiting");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    const ipHash = await hashIP(clientIP);

    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check rate limit from database
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - WINDOW_HOURS);

    const { count, error: countError } = await supabase
      .from("rate_limit_log")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("action", "contact_submission")
      .gte("created_at", windowStart.toISOString());

    if (countError) {
      console.error("Rate limit check error:", countError);
      // Continue anyway to not block legitimate submissions
    }

    if (count !== null && count >= RATE_LIMIT) {
      return new Response(
        JSON.stringify({ error: "تم تجاوز الحد المسموح به من الرسائل. يرجى المحاولة لاحقاً." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log rate limit entry
    await supabase
      .from("rate_limit_log")
      .insert({ ip_hash: ipHash, action: "contact_submission" });

    // Insert contact submission
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert(validation.data);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "حدث خطأ أثناء حفظ الرسالة" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "حدث خطأ غير متوقع" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
