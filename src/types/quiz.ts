export type Quiz = {
  quizId: number;
  type: 'OX' | 'MCQ';
  question: string;
  options: readonly string[]; // 선택지
  answerIndex: number; // 정답 인덱스
  answerDescription: string; // 해설 또는 설명
};

// 서버 응답용 퀴즈 결과 타입
export type QuizResultItem = {
  quizId: number;
  isCorrect: boolean;
  selectedAnswer: string; // 사용자가 선택한 텍스트
  answer: string; // 실제 정답 텍스트
  answerDescription: string;
};

// 최종 퀴즈 결과 응답 타입
export type QuizResult = {
  correctCount: number;
  coinReward: number;
  checkQuizResponse: QuizResultItem[];
};
