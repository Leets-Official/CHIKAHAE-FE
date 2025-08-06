import type { BrushingCardConfig } from '@/types/brushing';

export const getNextAnimationMission = (missions: BrushingCardConfig[]): string | null => {
  const animationMissions = ['MORNING_ANIMATION', 'LUNCH_ANIMATION', 'EVENING_ANIMATION'];
  const completedCount = animationMissions.filter((code) =>
    missions.find((m) => m.id === code && m.isCompleted),
  ).length;

  return completedCount >= 3 ? null : animationMissions[completedCount];
};
