export type Quiz = {
  quizId: number;
  type: 'OX' | 'MCQ';
  question: string;
  options: readonly string[]; // 선택지
  answerIndex: number; // 정답 인덱스
  answerDescription: string; // 해설 또는 설명
};
