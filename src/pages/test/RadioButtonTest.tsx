import RadioButton from '@/components/RadioButton';
import { useState } from 'react';

const RadioButtonTest = () => {
  const [selected, setSelected] = useState('male');

  return (
    <div className='space-x-4'>
      <RadioButton
        id='male'
        name='gender'
        value='male'
        label='남성'
        checked={selected === 'male'}
        onChange={setSelected}
      />
      <RadioButton
        id='female'
        name='gender'
        value='female'
        label='여성'
        checked={selected === 'female'}
        onChange={setSelected}
      />
    </div>
  );
};

export default RadioButtonTest;
