export type TimerProps = {
  showSeconds?: boolean; // 초 출력 여부 (기본: true)
  duration?: number; // 원하는 시간 입력 (기본: 15초)
  onComplete?: () => void;
  onTimeout?: () => void;
  size?: 'default' | 'wide';
  mode?: 'quiz' | 'animation';
};
