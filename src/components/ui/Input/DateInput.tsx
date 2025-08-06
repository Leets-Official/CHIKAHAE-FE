import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg';
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import './DateInput.css';
import { YEARS, MONTHS } from '@/constants/dateOptions';
import clsx from 'clsx';

interface DateInputProps {
  value: string;
  onClick?: () => void;
  onChange: (formattedDate: string) => void;
  iconColor?: string;
  state?: 'enabled' | 'select' | 'disabled';
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const selectClass =
  'rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring focus:ring-blue-200';

const CustomInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onClick, iconColor, onFocus, onBlur }, ref) => (
    <div className='relative w-full flex justify-between items-center'>
      <input
        type='text'
        value={value}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        readOnly
        placeholder='0000.00.00'
        className='flex-grow bg-transparent outline-none border-none cursor-pointer body-14-r'
      />
      <CalendarIcon
        onClick={onClick}
        className={clsx('cursor-pointer -translate-y-[2px]', iconColor)}
      />
    </div>
  ),
);

CustomInput.displayName = 'CustomInput';

const DateInput = ({
  value,
  onChange,
  onClick,
  onFocus,
  onBlur,
  state = 'enabled',
}: DateInputProps) => {
  const handleChange = (date: Date | null) => {
    if (!date) return;
    const formatted = dayjs(date).format('YYYY-MM-DD');
    onChange(formatted);
  };

  const iconColorClass = clsx({
    'text-[#9CA6AF]': state === 'enabled' || state === 'disabled',
    'text-[#3DAFD9]': state === 'select',
  });

  return (
    <DatePicker
      selected={value ? new Date(value.replace(/\./g, '-')) : null}
      onChange={handleChange}
      dateFormat='yyyy-MM-dd'
      locale={ko}
      popperPlacement='bottom'
      showPopperArrow={false}
      customInput={
        <CustomInput
          {...{
            value,
            onClick,
            onFocus,
            onBlur,
            onChange,
            iconColor: iconColorClass,
          }}
        />
      }
      portalId='react-datepicker-portal'
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
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
              className={selectClass}
            >
              {YEARS().map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(Number(value))}
              className={selectClass}
            >
              {MONTHS.map((month, index) => (
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
      )}
    />
  );
};

export default DateInput;
