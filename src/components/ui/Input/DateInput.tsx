import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg';
import type { MiddlewareReturn } from '@floating-ui/core';
import type { MiddlewareState } from '@floating-ui/dom';
import './DateInput.css';

type Props = {
  value: string;
  onChange: (formattedDate: string) => void;
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
      popperModifiers={[
        {
          name: 'offset',
          options: { offset: [0, 10] },
          fn: function (state: MiddlewareState): MiddlewareReturn | Promise<MiddlewareReturn> {
            throw new Error('Function not implemented.');
          },
        },
      ]}
      showPopperArrow={false}
    />
  );
};

export default DateInput;
