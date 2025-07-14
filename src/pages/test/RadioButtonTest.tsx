import RadioButton from '@/components/ui/Button/RadioButton/RadioButton';
import { useState } from 'react';

const RadioButtonTest = () => {
  const [selected, setSelected] = useState('male');

  return (
    <div className='flex space-x-4'>
      <RadioButton
        id='male'
        name='gender'
        value='male'
        label='텍스트'
        checked={selected === 'male'}
        onChange={setSelected}
      />
      <RadioButton
        id='female'
        name='gender'
        value='female'
        label='텍스트'
        checked={selected === 'female'}
        onChange={setSelected}
      />
      <RadioButton
        id='any'
        name='gender'
        value='any'
        label='텍스트'
        checked={selected === 'any'}
        onChange={setSelected}
      />
    </div>
  );
};

export default RadioButtonTest;
