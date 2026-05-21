import React from "react";
import PlayerStatsWindow from "@/components/PlayerStats";
import { StudentStats } from "@/types/invite";

type Props = { stats: StudentStats };

export default function DashboardWindow({ stats }: Props) {
  return (
    <PlayerStatsWindow
      stats={stats}
      title="DashBoard.exe"
      titleBarColor="#FFA500"
      outerBg="#ffffff"
      contentBg="#ffffff"
    />
  );
}
