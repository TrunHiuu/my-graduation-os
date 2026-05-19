import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function GET() {
  try {
    const supabase = getSupabase();

    // Check users table
    const { data: usersData, error: usersError, count: usersCount } = await supabase
      .from("users")
      .select("*", { count: "exact" });

    // Check invites table (cũ)
    let invitesCount = 0;
    let invitesErrorMessage: string | undefined;
    let invitesData = null;
    try {
      const result = await supabase
        .from("invites")
        .select("*", { count: "exact" });
      invitesData = result.data;
      invitesErrorMessage = result.error?.message;
      invitesCount = result.count || 0;
    } catch (error: unknown) {
      invitesErrorMessage = getErrorMessage(error);
    }

    // Check invitations table (mới)
    const { data: invitationsData, error: invitationsError, count: invitationsCount } = await supabase
      .from("invitations")
      .select("*", { count: "exact" });

    return NextResponse.json({
      users: {
        count: usersCount || 0,
        error: usersError?.message,
        sample: usersData?.slice(0, 2),
      },
      invites: {
        count: invitesCount || 0,
        error: invitesErrorMessage,
        sample: invitesData?.slice(0, 2),
      },
      invitations: {
        count: invitationsCount || 0,
        error: invitationsError?.message,
        sample: invitationsData?.slice(0, 2),
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) });
  }
}
