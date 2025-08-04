// ex. 03:00:PM -> 15:00
export const formatTo24Hour = (hour: number, minute: number, period: 'AM' | 'PM') => {
  let hour24 = hour % 12;
  if (period === 'PM') hour24 += 12;

  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};
