import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

type MissionQuizOption = "A" | "B" | "C" | "D";

type MissionQuizAssignmentRow = {
  mission_id: number;
  user_option: MissionQuizOption | null;
  quiz: {
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: MissionQuizOption;
  } | null;
};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: assignments, error: assignmentsError } = await supabase
      .from("quiz_assignments")
      .select("mission_id, user_option, quiz:quizzes ( question, option_a, option_b, option_c, option_d, correct_option )")
      .eq("user_id", userId)
      .in("mission_id", [1, 2])
      .order("mission_id", { ascending: true })
      .returns<MissionQuizAssignmentRow[]>();

    // fetch scores for missions 1..4 to let client compute locks
    const { data: scores, error: scoresError } = await supabase
      .from("scores")
      .select("mission_id, score, completed, completed_at")
      .eq("user_id", userId)
      .in("mission_id", [1, 2, 3, 4]);

    if (scoresError) {
      throw scoresError;
    }

    if (assignmentsError) {
      throw assignmentsError;
    }

    return NextResponse.json({
      missions: (assignments || []).filter((assignment) => Boolean(assignment.quiz)),
      scores: scores || [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null) as
      | { userId?: string; missionId?: number; optionIndex?: number }
      | null;

    const userId = body?.userId;
    const missionId = body?.missionId;
    const optionIndex = body?.optionIndex;

    if (!userId || typeof missionId !== "number" || typeof optionIndex !== "number") {
      return NextResponse.json(
        { error: "userId, missionId, and optionIndex are required" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex > 3) {
      return NextResponse.json(
        { error: "Invalid optionIndex" },
        { status: 400 },
      );
    }

    const optionMap: MissionQuizOption[] = ["A", "B", "C", "D"];
    const userOption = optionMap[optionIndex];

    const supabase = getSupabaseAdmin();

    // enforce ordering: only allow submitting mission N when mission N-1 is completed
    if (missionId > 1) {
      const { data: prevScore, error: prevErr } = await supabase
        .from("scores")
        .select("completed")
        .eq("user_id", userId)
        .eq("mission_id", missionId - 1)
        .maybeSingle();

      if (prevErr) throw prevErr;
      if (!prevScore || !prevScore.completed) {
        return NextResponse.json({ error: "Previous mission not completed" }, { status: 403 });
      }
    }

    const { data: updatedAssignment, error: updateError } = await supabase
      .from("quiz_assignments")
      .update({ user_option: userOption })
      .eq("user_id", userId)
      .eq("mission_id", missionId)
      .select("mission_id, user_option, quiz:quizzes(correct_option)")
      .maybeSingle();

    if (updateError) {
      throw updateError;
    }

    if (!updatedAssignment) {
      return NextResponse.json(
        { error: "Quiz assignment not found" },
        { status: 404 },
      );
    }

    // determine correctness and upsert into scores
    const correctOpt = (updatedAssignment as any)?.quiz?.correct_option as MissionQuizOption | undefined;
    const computedScore = correctOpt && correctOpt === userOption ? 1 : 0;
    const completedAt = new Date().toISOString();

    const { error: scoreErr } = await supabase
      .from("scores")
      .upsert(
        {
          user_id: userId,
          mission_id: missionId,
          score: computedScore,
          completed: true,
          completed_at: completedAt,
        },
        { onConflict: "user_id,mission_id" },
      );

    if (scoreErr) {
      throw scoreErr;
    }

    return NextResponse.json({ mission: updatedAssignment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}