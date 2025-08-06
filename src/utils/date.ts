import dayjs from 'dayjs';

//만 14세 이상 판단 함수
export const isOver14 = (birthDate: string): boolean => {
  const today = dayjs();
  const birth = dayjs(birthDate, 'YYYY.MM.DD');
  const fourteenYearsLater = birth.add(14, 'year');
  // 생일 + 14년 >= today : false(만 14세 미만)
  // 생일 + 14년 < today: true(만 14세 이상)
  return !fourteenYearsLater.isAfter(today);
};

export const isFutureDate = (dateString: string): boolean => {
  const today = new Date();
  const inputDate = new Date(dateString);

  // 날짜가 유효하지 않으면 미래 아님 처리
  if (isNaN(inputDate.getTime())) return false;

  return inputDate > today;
};
