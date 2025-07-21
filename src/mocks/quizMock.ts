export const quizMockData = {
  quizDate: '2025-07-09',
  quizList: [
    {
      quizId: 5,
      type: 'OX',
      question: '치아가 아플 때까지만 병원에 가도 늦지 않다.',
      options: ['O', 'X'],
      answerIndex: 1, //FIXME: api 연결 시 response 값 반영 필요
      answerDescription: '하루 최소 2번, 특히 자기 전에는 꼭 양치해야 충치 예방에 효과적입니다.',
    },
    {
      quizId: 6,
      type: 'OX',
      question: '칫솔은 최소 3개월마다 바꾸는 것이 좋다.',
      options: ['O', 'X'],
      answerIndex: 1,
      answerDescription: '하루 최소 2번, 특히 자기 전에는 꼭 양치해야 충치 예방에 효과적입니다.',
    },
    {
      quizId: 1003,
      type: 'MCQ',
      question: '칫솔 교체 주기로 가장 적절한 것은?',
      options: ['1개월', '3개월', '1년'],
      answerIndex: 1,
      answerDescription: '하루 최소 2번, 특히 자기 전에는 꼭 양치해야 충치 예방에 효과적입니다.',
    },
  ],
} as const;
