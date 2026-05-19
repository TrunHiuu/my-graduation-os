import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");

  if (!phone) {
    return NextResponse.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }

  try {
    // Normalize phone: remove spaces, dashes, parentheses, keep only digits and +
    const normalizedPhone = phone.replace(/[\s\-()]/g, "");
    
    if (!/^\+?\d{6,}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    console.log("Searching for phone:", normalizedPhone);
    
    // Step 1: Fetch user by phone from 'users' table
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", normalizedPhone)
      .limit(1);

    console.log("User result:", { users, error: userError });

    if (userError) {
      console.error("Supabase error:", userError);
      throw userError;
    }
    
    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    // Step 2: Fetch invitation for this user (get latest)
    const { data: invitations, error: invitationError } = await supabase
      .from("invitations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    console.log("Invitation result:", { invitations, error: invitationError });

    if (invitationError) {
      console.error("Supabase invitation error:", invitationError);
      throw invitationError;
    }
    
    if (!invitations || invitations.length === 0) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

    const invitation = invitations[0];

    // Step 3: Fetch memories for this invitation
    const { data: memories } = await supabase
      .from("memories")
      .select("*")
      .eq("invitation_id", invitation.id);

    return NextResponse.json({
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        major: user.major,
        avatar_url: user.avatar_url,
      },
      invitation,
      memories: memories || [],
    });
  } catch (error) {
    console.error("Error in by-phone route:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

