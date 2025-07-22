// DateInut.tsx 상수
export const YEARS = () => {
  const CURRENT_YEAR = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - 50 + i);
};
export const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];
