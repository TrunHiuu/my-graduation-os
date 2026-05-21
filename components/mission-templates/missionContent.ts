import type { User } from "@/types/invite";

export type MissionKind = "quiz" | "wish" | "upload";

export type MissionQuizOption = "A" | "B" | "C" | "D";

export type MissionQuizAssignment = {
  mission_id: number;
  // DB now stores plain TEXT with default '' for unsubmitted; treat empty string as not submitted
  user_option: MissionQuizOption | string | null;
  quiz: {
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: MissionQuizOption;
  };
};

export type MissionTemplateMeta =
  | {
      kind: "quiz";
      missionId: number;
      missionBadge: string;
      missionTitle: string;
      question: string;
      options: string[];
      selectedOptionIndex: number | null;
      correctOptionIndex: number;
      userOption: MissionQuizOption | null;
      isSubmitted: boolean;
      isLoaded: boolean;
    }
  | {
      kind: "wish";
      missionBadge: string;
      missionTitle: string;
    }
  | {
      kind: "upload";
      missionBadge: string;
      missionTitle: string;
    };

function buildQuizTemplate(
  missionBadge: string,
  missionTitle: string,
  fallbackText: string,
  assignment: MissionQuizAssignment | undefined,
  displayName: string,
): Extract<MissionTemplateMeta, { kind: "quiz" }> {
  if (!assignment) {
    return {
      kind: "quiz",
      missionId: 0,
      missionBadge,
      missionTitle,
      question: `${fallbackText} assigned to ${displayName} will load here.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      selectedOptionIndex: null,
      correctOptionIndex: -1,
      userOption: null,
      isSubmitted: false,
      isLoaded: false,
    };
  }

  // treat empty string ('') as no selection
  const selectedOptionIndex = assignment.user_option && assignment.user_option !== ""
    ? ["A", "B", "C", "D"].indexOf(String(assignment.user_option))
    : null;
  const correctOptionIndex = ["A", "B", "C", "D"].indexOf(assignment.quiz.correct_option);

  return {
    kind: "quiz",
    missionId: assignment.mission_id,
    missionBadge,
    missionTitle,
    question: assignment.quiz.question,
    options: [
      assignment.quiz.option_a,
      assignment.quiz.option_b,
      assignment.quiz.option_c,
      assignment.quiz.option_d,
    ],
    selectedOptionIndex: (selectedOptionIndex !== null && selectedOptionIndex >= 0) ? selectedOptionIndex : null,
    correctOptionIndex: correctOptionIndex >= 0 ? correctOptionIndex : -1,
    userOption: (assignment.user_option && assignment.user_option !== "" && ["A", "B", "C", "D"].includes(String(assignment.user_option)))
      ? (assignment.user_option as MissionQuizOption)
      : null,
    // consider submitted only when user_option is non-empty (not null and not '')
    isSubmitted: assignment.user_option !== null && assignment.user_option !== "",
    isLoaded: true,
  };
}

export function buildMissionTemplates(
  user: User,
  quizAssignments: MissionQuizAssignment[] = [],
): MissionTemplateMeta[] {
  const displayName = user.nickname || user.name;
  const quizByMissionId = new Map(quizAssignments.map((assignment) => [assignment.mission_id, assignment]));

  return [
    buildQuizTemplate("Mission 1", "Quiz Challenge", "Quiz Challenge", quizByMissionId.get(1), displayName),
    buildQuizTemplate("Mission 2", "Quiz Challenge", "Quiz Challenge", quizByMissionId.get(2), displayName),
    {
      kind: "wish",
      missionBadge: "Mission 3",
      missionTitle: "Wish Crafting Odyssey",
    },
    {
      kind: "upload",
      missionBadge: "Mission 4",
      missionTitle: "Photographic Finale",
    },
  ];
}