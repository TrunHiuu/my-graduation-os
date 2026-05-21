import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSlug } from "@/lib/slug";

function normalizePhone(phone: string) {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.startsWith("84") && digitsOnly.length >= 11) {
    return `0${digitsOnly.slice(2)}`;
  }

  return digitsOnly;
}

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");
  const id = request.nextUrl.searchParams.get("id");
  const slug = request.nextUrl.searchParams.get("slug");

  if (!phone && !id && !slug) {
    return NextResponse.json(
      { error: "Phone, ID, or slug is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, phone, name, nickname, avatar_url, attendance_status_id, created_at, updated_at");

    if (usersError) {
      throw usersError;
    }

    const normalizedSlug = slug ? createSlug(slug) : null;
    const normalizedPhone = phone ? normalizePhone(phone) : null;

    const user = (users || []).find((entry) => {
      if (id) {
        return entry.id === id;
      }

      if (normalizedSlug) {
        return createSlug(entry.name) === normalizedSlug;
      }

      return normalizedPhone ? normalizePhone(entry.phone) === normalizedPhone : false;
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { data: attendanceStatus } = await supabase
      .from("attendance_statuses")
      .select("id, code, label")
      .eq("id", user.attendance_status_id)
      .maybeSingle();

    return NextResponse.json({
      user: {
        ...user,
        attendance_status: attendanceStatus ?? null,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null) as
      | { userId?: string; statusCode?: string }
      | null;

    const userId = body?.userId;
    const statusCode = body?.statusCode;

    if (!userId || !statusCode) {
      return NextResponse.json(
        { error: "userId and statusCode are required" },
        { status: 400 }
      );
    }

    if (!["waiting", "confirmed", "declined"].includes(statusCode)) {
      return NextResponse.json(
        { error: "Invalid statusCode" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: statusRow, error: statusError } = await supabase
      .from("attendance_statuses")
      .select("id, code, label")
      .eq("code", statusCode)
      .maybeSingle();

    if (statusError) {
      throw statusError;
    }

    if (!statusRow) {
      return NextResponse.json(
        { error: "Attendance status not found" },
        { status: 404 }
      );
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({
        attendance_status_id: statusRow.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("id, phone, name, nickname, avatar_url, attendance_status_id, created_at, updated_at")
      .maybeSingle();

    if (updateError) {
      throw updateError;
    }

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        ...updatedUser,
        attendance_status: statusRow,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
