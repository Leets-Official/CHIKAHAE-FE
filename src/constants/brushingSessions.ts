export interface BrushingCardConfig {
  id: string;
  title: string;
  description: string;
  route?: string;
  buttonText: string;
}

export const brushingCards: BrushingCardConfig[] = [
  {
    id: 'morning',
    title: '아침 양치하기',
    description: '하루를 상쾌하게',
    buttonText: '양치하러 가기',
  },
  {
    id: 'lunch',
    title: '점심 양치하기',
    description: '점심먹고 땡 !',
    buttonText: '양치하러 가기',
  },
  {
    id: 'dinner',
    title: '저녁 양치하기',
    description: '하루를 마무리',
    buttonText: '양치하러 가기',
  },
  {
    id: 'quiz',
    title: '오늘의 퀴즈',
    description: '도전해볼까요 !?',
    route: '/quiz/start',
    buttonText: '퀴즈 도전 하기',
  },
];
