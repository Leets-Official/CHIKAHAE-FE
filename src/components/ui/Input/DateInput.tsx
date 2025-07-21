import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg';
import './DateInput.css';

type Props = {
  value: string;
  onChange: (formattedDate: string) => void;
  iscolor?: string;
};

const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
  <div className='relative w-full flex justify-between items-center'>
    <input
      type='text'
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly
      placeholder='0000.00.00'
      className='flex-grow px-0 py-0 bg-transparent outline-none border-none'
    />
    <CalendarIcon
      onClick={onClick}
      className='ml-2 cursor-pointer h-[24px] w-[24px] text-fg-medium'
    />
  </div>
));

CustomInput.displayName = 'CustomInput';

const DateInput = ({ value, onChange }: Props) => {
  const handleChange = (date: Date | null) => {
    if (!date) return;

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const formatted = `${year}.${month}.${day}`;
    onChange(formatted);
  };

  return (
    <DatePicker
      selected={value ? new Date(value.replace(/\./g, '-')) : null}
      onChange={handleChange}
      customInput={<CustomInput />}
      dateFormat='yyyy.MM.dd'
      popperPlacement='bottom'
      showPopperArrow={false}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => {
        const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);
        const months = [
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

        return (
          <div className='flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white'>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className='text-gray-600 hover:text-black disabled:text-gray-300 px-2 py-1'
            >
              ‹
            </button>

            <div className='flex items-center gap-2'>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className='rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring focus:ring-blue-200'
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>

              <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
                className='rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring focus:ring-blue-200'
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className='text-gray-600 hover:text-black disabled:text-gray-300 px-2 py-1'
            >
              ›
            </button>
          </div>
        );
      }}
    />
  );
};

export default DateInput;
