import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// NOTE: using the exact bucket name you created (may contain spaces)
const BUCKET_NAME = "Mission 4 submitions for TrunHiuu Graduation Game";

function sanitizeStorageName(name: string) {
  const trimmed = name.trim().replace(/\s+/g, "-");
  const lastDotIndex = trimmed.lastIndexOf(".");
  const baseName = lastDotIndex > 0 ? trimmed.slice(0, lastDotIndex) : trimmed;
  const extension = lastDotIndex > 0 ? trimmed.slice(lastDotIndex).toLowerCase() : "";

  const safeBaseName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || "upload";

  return `${safeBaseName}${extension}`;
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const userId = String(form.get("userId") || "");

    if (!file || !userId) {
      return NextResponse.json({ error: "file and userId required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // enforce ordering: mission 3 must be completed first
    const { data: prevScore, error: prevErr } = await supabase
      .from("scores")
      .select("completed")
      .eq("user_id", userId)
      .eq("mission_id", 3)
      .maybeSingle();

    if (prevErr) throw prevErr;
    if (!prevScore || !prevScore.completed) {
      return NextResponse.json({ error: "Previous mission not completed" }, { status: 403 });
    }

    const originalName = (file as File).name || "upload.jpg";
    const safeName = sanitizeStorageName(originalName);
    const filename = `${userId}/${Date.now()}-${safeName}`;

    // read file into buffer (Node.js runtime)
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadErr } = await supabase.storage.from(BUCKET_NAME).upload(filename, buffer, {
      contentType: (file as File).type || "application/octet-stream",
      upsert: false,
    });

    if (uploadErr) {
      throw uploadErr;
    }

    // get public url (bucket is public per your setup)
    const { data: publicData } = await supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);
    const publicUrl = publicData.publicUrl;

    // upsert into mission4_submissions (unique on user_id)
    const { error: dbErr } = await supabase
      .from("mission4_submissions")
      .upsert({ user_id: userId, image_url: publicUrl }, { onConflict: "user_id" });

    if (dbErr) {
      throw dbErr;
    }

    // mark mission 4 as completed with score=1
    try {
      const submittedAt = new Date().toISOString();
      const { error: scoreErr } = await supabase
        .from("scores")
        .upsert(
          {
            user_id: userId,
            mission_id: 4,
            score: 1,
            completed: true,
            completed_at: submittedAt,
          },
          { onConflict: "user_id,mission_id" },
        );

      if (scoreErr) {
        throw scoreErr;
      }
    } catch (e) {
      console.error("Failed to upsert score for mission 4:", e);
    }

    return NextResponse.json({ imageUrl: publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: row, error } = await supabase
      .from("mission4_submissions")
      .select("image_url, submitted_at, created_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!row) {
      return NextResponse.json({ imageUrl: null });
    }
    return NextResponse.json({ imageUrl: row.image_url, submittedAt: row.submitted_at ?? row.created_at ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
