// src/apis/quizAPI.ts
import api from '@/api/api';

// 퀴즈 응답 타입 정의
export type QuizItem = {
  quizId: number;
  type: 'OX' | 'MCQ';
  question: string;
  options: string[];
};

export type QuizResponse = {
  success: boolean;
  data: QuizItem[];
  error?: {
    code: number;
    message: string;
    exceptionMessage?: string;
  };
};

// 퀴즈 정답 결과 타입
export type QuizAnswerResult = {
  quizId: number;
  isCorrect: boolean;
  selectedAnswer: string;
  answer: string;
  answerDescription: string;
};

// 퀴즈 정답 제출 요청 타입
export type CheckAnswerRequest = {
  quizId: number;
  selectedAnswer: string;
};

// 퀴즈 정답 제출 응답 타입
export type CheckAnswerResponse = {
  success: boolean;
  data: QuizAnswerResult;
  error: {
    code: number;
    message: string;
    exceptionMessage: string;
  };
};

// 퀴즈 결과 및 보상 조회 응답 타입
export type QuizResultResponse = {
  success: boolean;
  data: {
    correctCount: number;
    coinReward: number;
    checkQuizResponse: QuizAnswerResult[];
  };
  error: {
    code: number;
    message: string;
    exceptionMessage?: string;
  };
};

// 오늘의 퀴즈 목록
export const fetchTodayQuiz = async (): Promise<QuizResponse> => {
  const response = await api.get<QuizResponse>('/api/quiz/today');
  return response.data;
};

// 퀴즈 정답 제출
export const checkAnswer = async (body: CheckAnswerRequest): Promise<CheckAnswerResponse> => {
  const response = await api.post<CheckAnswerResponse>('/api/quiz/check', body);
  return response.data;
};

// 퀴즈 결과 및 보상 조회
export const fetchQuizResult = async (): Promise<QuizResultResponse> => {
  const response = await api.get<QuizResultResponse>('/api/quiz/result');
  return response.data;
};
